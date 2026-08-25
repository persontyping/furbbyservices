import { createClient } from 'jsr:@supabase/supabase-js@2'

interface ContactPayload {
  contactId: string
  name: string
  email: string
  subject: string
  message: string
}

function requiredEnv(name: string) {
  const value = Deno.env.get(name)
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

const SENDGRID_API_KEY = requiredEnv('SENDGRID_API_KEY')
const SENDGRID_FROM_EMAIL = requiredEnv('SENDGRID_FROM_EMAIL')
const SENDGRID_TO_EMAIL = requiredEnv('SENDGRID_TO_EMAIL')

const SUPABASE_URL = requiredEnv('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = requiredEnv('SUPABASE_SERVICE_ROLE_KEY')

function corsHeaders(origin: string | null) {
  return {
    'Access-Control-Allow-Origin': origin ?? '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }
}

async function sendViaSendGrid(payload: ContactPayload) {
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{
        to: [{ email: SENDGRID_TO_EMAIL }],
        subject: `[Contact form] ${payload.subject}`,
      }],
      from: { email: SENDGRID_FROM_EMAIL },
      reply_to: { email: payload.email, name: payload.name },
      content: [{
        type: 'text/plain',
        value: `From: ${payload.name} <${payload.email}>\n\n${payload.message}`,
      }],
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`SendGrid request failed (${response.status}): ${text}`)
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

    await sendViaSendGrid(payload)

    // Mark the stored contact row as emailed, using the service role key
    // so this update bypasses row level security from the Edge Function.
    if (payload.contactId) {
      const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
      const { error } = await supabaseAdmin
        .from('contacts')
        .update({ emailed_at: new Date().toISOString() })
        .eq('id', payload.contactId)
      if (error) throw error
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
