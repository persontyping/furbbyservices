import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Clock3, Heart, Home, MapPin } from 'lucide-react'

export const Route = createFileRoute('/services')({
  component: ServicesPage,
})

const services = [
  {
    icon: MapPin,
    title: 'Neighborhood walks',
    description: 'Unhurried, one-on-one walks shaped around your dog’s energy, routine, and favorite routes.',
    detail: '30 or 60 minutes',
  },
  {
    icon: Home,
    title: 'Drop-in visits',
    description: 'Meals, medication, play, and company at home, with a clear update after every visit.',
    detail: 'Cats and dogs welcome',
  },
  {
    icon: Heart,
    title: 'Custom care',
    description: 'A flexible care plan for puppies, senior pets, and households with a more particular rhythm.',
    detail: 'Built around your pet',
  },
]

function ServicesPage() {
  return (
    <div className="min-h-[calc(100svh-4rem)]">
      <section className="border-b border-base-content/10 bg-base-100">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-sm font-bold uppercase text-primary">Care that fits real life</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight [font-family:var(--font-mono)] sm:text-6xl">
            The right care, at their pace.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-base-content/65">
            Reliable local support for ordinary weekdays, busy weekends, and every change of plans in between.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-px overflow-hidden border border-base-content/10 bg-base-content/10 md:grid-cols-3">
          {services.map(({ icon: Icon, title, description, detail }) => (
            <article key={title} className="bg-base-100 p-7 sm:p-8">
              <Icon aria-hidden="true" className="size-7 text-primary" />
              <h2 className="mt-8 text-2xl font-bold">{title}</h2>
              <p className="mt-3 leading-7 text-base-content/65">{description}</p>
              <div className="mt-8 flex items-center gap-2 border-t border-base-content/10 pt-5 text-sm font-semibold">
                <Clock3 aria-hidden="true" className="size-4" />
                {detail}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-base-content/15 pt-9 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold">Not sure what your pet needs?</h2>
            <p className="mt-2 text-base-content/65">Tell us about their routine and we’ll work it out together.</p>
          </div>
          <Link to="/book" className="btn btn-primary rounded">
            Book an introduction
            <ArrowRight aria-hidden="true" className="size-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}