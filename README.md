# Vite Supabase SPA template

A repeatable React single-page application template with a landing page, the full daisyUI
component catalog, typed Supabase CRUD access, and a SendGrid-backed contact email function.

## Included stack

- Bun 1.4+ for dependency management and scripts
- Vite 8, React 19, and TypeScript 6
- Tailwind CSS 4 through the official `@tailwindcss/vite` plugin
- daisyUI 5 with all 35 built-in themes enabled and `wireframe` selected
- Self-hosted Outfit and Roboto Mono variable fonts through Fontsource
- TanStack Router and TanStack Query
- Supabase Postgres, row-level security, typed CRUD hooks, and an Edge Function
- SendGrid v3 Mail API

The landing page is at `/`. The reusable examples for all 68 daisyUI component categories
are exported from `src/components/daisy-examples.tsx` and previewed at `/components`.
Open `setup.html` directly in a browser for the visual installation and configuration guide.

## Create another app

From this repository, create a fresh project in an empty or nonexistent directory:

```sh
./scripts/create-app.sh ../my-app
```

The creator checks the environment, copies only the safe template files, creates local
environment files from the examples, installs the locked dependency graph, builds, lints,
and initializes a new Git repository. It never copies `.git`, `node_modules`, build output,
local Supabase state, or secrets.

Useful modes:

```sh
./scripts/create-app.sh --check
./scripts/create-app.sh --check --local-supabase
./scripts/create-app.sh ../my-app --skip-install --no-git
```

The default workflow uses hosted Supabase and does not require Docker. Add
`--local-supabase` when you want the creator to require the Supabase CLI, Docker CLI, and a
running Docker daemon for `supabase start`.

## Configure this app

1. Install and validate the frontend:

   ```sh
   bun install --frozen-lockfile
   bun run check
   ```

2. Copy `.env.example` to `.env.local` and set the hosted Supabase values:

   ```dotenv
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. Link the Supabase CLI and apply `supabase/migrations/0001_create_contacts.sql`:

   ```sh
   supabase link --project-ref <project-ref>
   supabase db push
   ```

4. Verify a sender identity in SendGrid. Copy `supabase/functions/.env.example` to
   `supabase/functions/.env.local`, then set:

   ```dotenv
   SENDGRID_API_KEY=SG.your-api-key
   SENDGRID_FROM_EMAIL=verified-sender@example.com
   SENDGRID_TO_EMAIL=inbox@example.com
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

5. Upload secrets and deploy the Edge Function:

   ```sh
   supabase secrets set --env-file supabase/functions/.env.local
   supabase functions deploy send-contact-email --no-verify-jwt
   ```

6. Start Vite:

   ```sh
   bun dev
   ```

## Supabase CRUD

The migration creates `public.contacts`, enables row-level security, permits anonymous
inserts, and restricts reads, updates, and deletes to authenticated users. The typed client
is in `src/lib/supabase.ts`, the current database contract is in `src/types/database.ts`, and
TanStack Query hooks for create/read/update/delete are in `src/hooks/use-contacts.ts`. The
create mutation invokes `send-contact-email` after storing the row; the function sends through
SendGrid and records `emailed_at` with the service-role client.

After changing the database, regenerate the checked-in type contract:

```sh
supabase gen types typescript --linked > src/types/database.ts
```

Do not expose `SUPABASE_SERVICE_ROLE_KEY` or `SENDGRID_API_KEY` through `VITE_*` variables;
Vite embeds those variables in the browser bundle. Both secrets belong only in the Edge
Function environment.
