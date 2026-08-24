# npl

A single-page app with a Supabase-backed contact form (emailed via Amazon SES) and a full
CRUD model for the submitted messages.

## Stack

- **Bun** — package manager & runtime
- **Vite + React + TypeScript** — SPA build tooling
- **Tailwind CSS + shadcn/ui-style components** — styling
- **TanStack Router** (file-based, `src/routes`) and **TanStack Query** — routing & data fetching
- **Supabase** — Postgres database, RLS, and an Edge Function that sends email via Amazon SES

## Project structure

```
src/
  routes/            TanStack Router file-based routes (__root, index, contact, messages)
  components/        UI primitives (src/components/ui) + contact-form, contacts-list
  hooks/use-contacts.ts   TanStack Query CRUD hooks (list/get/create/update/delete)
  lib/                supabase client, cn() helper, zod contact schema
  types/database.ts   Supabase `Database` type used by the typed client

supabase/
  migrations/0001_create_contacts.sql   contacts table + RLS policies
  functions/send-contact-email          Edge Function that signs & calls the SES v2 API
```

## Setup

1. Install dependencies:

   ```sh
   bun install
   ```

2. Create a Supabase project, then copy `.env.example` to `.env.local` and fill in:

   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   ```

3. Apply the database migration (requires the [Supabase CLI](https://supabase.com/docs/guides/cli)):

   ```sh
   supabase link --project-ref <your-project-ref>
   supabase db push
   ```

4. Configure Amazon SES:
   - Verify a sender identity/domain in SES.
   - Create an IAM user/role with `ses:SendEmail` permission scoped to that identity.
   - Copy `supabase/functions/.env.example` and set the AWS + SES + Supabase service-role secrets,
     then push them to your project:

     ```sh
     supabase secrets set --env-file supabase/functions/.env.local
     ```

5. Deploy the Edge Function:

   ```sh
   supabase functions deploy send-contact-email --no-verify-jwt
   ```

6. Run the app:

   ```sh
   bun dev
   ```

## Available scripts

- `bun dev` — start the Vite dev server
- `bun run build` — type-check and build for production
- `bun run preview` — preview the production build
- `bun run lint` — run Oxlint

## How it works

- **Contact form** (`/contact`): validated with `react-hook-form` + `zod`, on submit it inserts
  a row into the `contacts` table (Supabase CRUD "create") and invokes the `send-contact-email`
  Edge Function to deliver the message via Amazon SES.
- **Messages** (`/messages`): lists all `contacts` rows and supports editing and deleting them,
  demonstrating the rest of the CRUD model via TanStack Query mutations.
- **Edge Function**: signs a request to the SES v2 `SendEmail` REST API with AWS Signature
  Version 4 (no AWS SDK dependency needed in Deno) and marks the row as emailed using the
  Supabase service-role key.


See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
