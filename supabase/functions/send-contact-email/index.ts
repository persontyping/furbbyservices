// Supabase Edge Function: send-contact-email
// Sends the contact form submission via Amazon SES using the raw SES v2 REST API
// (SigV4 signed request) so no AWS SDK dependency is required in the Deno runtime.
import { createClient } from 'jsr:@supabase/supabase-js@2'

interface ContactPayload {
  contactId: string
  name: string
  email: string
  subject: string
  message: string
}

const AWS_REGION = Deno.env.get('AWS_REGION') ?? 'us-east-1'
const AWS_ACCESS_KEY_ID = Deno.env.get('AWS_ACCESS_KEY_ID')!
const AWS_SECRET_ACCESS_KEY = Deno.env.get('AWS_SECRET_ACCESS_KEY')!
const SES_FROM_EMAIL = Deno.env.get('SES_FROM_EMAIL')!
const SES_TO_EMAIL = Deno.env.get('SES_TO_EMAIL')!

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

function corsHeaders(origin: string | null) {
  return {
    'Access-Control-Allow-Origin': origin ?? '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }
}

async function hmac(key: ArrayBuffer | Uint8Array, data: string): Promise<ArrayBuffer> {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  return crypto.subtle.sign('HMAC', cryptoKey, new TextEncoder().encode(data))
}

async function sha256Hex(data: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(data))
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function toHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

// Signs and sends a request to the SES v2 SendEmail API using AWS Signature Version 4.
async function sendViaSes(payload: ContactPayload) {
  const host = `email.${AWS_REGION}.amazonaws.com`
  const endpoint = `https://${host}/v2/email/outbound-emails`
  const service = 'ses'

  const now = new Date()
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '')
  const dateStamp = amzDate.slice(0, 8)

  const body = JSON.stringify({
    FromEmailAddress: SES_FROM_EMAIL,
    Destination: { ToAddresses: [SES_TO_EMAIL] },
    ReplyToAddresses: [payload.email],
    Content: {
      Simple: {
        Subject: { Data: `[Contact form] ${payload.subject}` },
        Body: {
          Text: {
            Data: `From: ${payload.name} <${payload.email}>\n\n${payload.message}`,
          },
        },
      },
    },
  })

  const payloadHash = await sha256Hex(body)
  const canonicalHeaders =
    `content-type:application/json\n` +
    `host:${host}\n` +
    `x-amz-date:${amzDate}\n`
  const signedHeaders = 'content-type;host;x-amz-date'

  const canonicalRequest = [
    'POST',
    '/v2/email/outbound-emails',
    '',
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join('\n')

  const credentialScope = `${dateStamp}/${AWS_REGION}/${service}/aws4_request`
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    credentialScope,
    await sha256Hex(canonicalRequest),
  ].join('\n')

  const kDate = await hmac(new TextEncoder().encode(`AWS4${AWS_SECRET_ACCESS_KEY}`), dateStamp)
  const kRegion = await hmac(kDate, AWS_REGION)
  const kService = await hmac(kRegion, service)
  const kSigning = await hmac(kService, 'aws4_request')
  const signature = toHex(await hmac(kSigning, stringToSign))

  const authorizationHeader =
    `AWS4-HMAC-SHA256 Credential=${AWS_ACCESS_KEY_ID}/${credentialScope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Amz-Date': amzDate,
      Authorization: authorizationHeader,
    },
    body,
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`SES request failed (${response.status}): ${text}`)
  }
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin')

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders(origin) })
  }

  try {
    const payload = (await req.json()) as ContactPayload

    if (!payload.name || !payload.email || !payload.subject || !payload.message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
      })
    }

    await sendViaSes(payload)

    // Mark the stored contact row as emailed, using the service role key
    // so this update bypasses row level security from the Edge Function.
    if (payload.contactId) {
      const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
      await supabaseAdmin
        .from('contacts')
        .update({ emailed_at: new Date().toISOString() })
        .eq('id', payload.contactId)
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
    })
  }
})
