import { createFileRoute } from '@tanstack/react-router'
import { CalendarDays, Check, Mail, MessageCircle } from 'lucide-react'

export const Route = createFileRoute('/book')({
  component: BookPage,
})

const steps = [
  'Tell us about your pet and the care you have in mind.',
  'We’ll arrange a short introduction to meet each other.',
  'Once it feels right, we’ll confirm the schedule.',
]

function BookPage() {
  return (
    <div className="min-h-[calc(100svh-4rem)] bg-base-100">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
        <section>
          <p className="text-sm font-bold uppercase text-primary">Start here</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight [font-family:var(--font-mono)] sm:text-6xl">
            Let’s plan their care.
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-8 text-base-content/65">
            Every new booking starts with a conversation. Share a little about your pet, their routine, and the dates you need.
          </p>

          <ol className="mt-10 space-y-5">
            {steps.map((step, index) => (
              <li key={step} className="flex max-w-xl items-start gap-4">
                <span className="grid size-8 shrink-0 place-items-center border border-base-content/20 font-bold">
                  {index + 1}
                </span>
                <span className="pt-1 leading-7">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <aside className="self-start border border-base-content/15 bg-base-200 p-6 sm:p-9">
          <CalendarDays aria-hidden="true" className="size-8 text-primary" />
          <h2 className="mt-6 text-2xl font-bold">Request an introduction</h2>
          <p className="mt-3 leading-7 text-base-content/65">
            Email is the fastest way to get started. Include your neighborhood, pet’s name, the service you need, and your preferred dates.
          </p>
          <a
            href="mailto:hello@northsidepetlife@pm.me?subject=Care%20request"
            className="btn btn-primary mt-7 w-full rounded"
          >
            <Mail aria-hidden="true" className="size-5" />
            Send a care request
          </a>

          <div className="my-8 border-t border-base-content/15" />

          <div className="flex gap-3">
            <MessageCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            <div>
              <h3 className="font-bold">What happens next</h3>
              <p className="mt-1 text-sm leading-6 text-base-content/65">We’ll reply with availability and a time to meet.</p>
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            <div>
              <h3 className="font-bold">No pressure</h3>
              <p className="mt-1 text-sm leading-6 text-base-content/65">The introduction is simply a chance to make sure everyone is comfortable.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}