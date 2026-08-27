import { createFileRoute } from '@tanstack/react-router'
import { CalendarDays, Check, Mail, MessageCircle } from 'lucide-react'

export const Route = createFileRoute('/book')({
  component: BookPage,
})

const steps = [
  'Tell us about your property, pets, travel dates and the support you need.',
  'We’ll recommend a Stay or Care plan and arrange a property walkthrough.',
  'Once the details feel right, we’ll confirm responsibilities, updates and timing.',
]

function BookPage() {
  return (
    <div className="min-h-[calc(100svh-4rem)] bg-base-100">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
        <section>
          <p className="text-sm font-bold uppercase text-primary">Start here</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight [font-family:var(--font-mono)] sm:text-6xl">
            Let’s plan your time away.
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-8 text-base-content/65">
            Every booking starts with a clear handover. Share what needs caring for, what needs maintaining and how long you will be away.
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
            Email is the fastest way to get started. Include your property location, travel dates, pets and the home or garden tasks you need covered.
          </p>
          <a
            href="mailto:hello@northsidepetlife@pm.me?subject=House%20and%20property%20care%20request"
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
              <p className="mt-1 text-sm leading-6 text-base-content/65">We’ll reply with availability and arrange a walkthrough of your routines and property.</p>
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            <div>
              <h3 className="font-bold">No pressure</h3>
              <p className="mt-1 text-sm leading-6 text-base-content/65">The introduction is a chance to confirm the scope and make sure the arrangement works for everyone.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}