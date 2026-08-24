import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">Welcome</h1>
      <p className="text-muted-foreground">
        A Vite + React SPA with a Supabase-backed contact form and CRUD model,
        delivering email notifications through Amazon SES.
      </p>
    </div>
  )
}
