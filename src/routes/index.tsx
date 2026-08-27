import { createFileRoute } from '@tanstack/react-router'
import { House, ShieldCheck, Sparkles } from 'lucide-react'
import { Carousel } from '@/components/carousel'


export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>

      <Carousel />

      <section id="services" className="border-y border-base-content/10 bg-base-100">
        <div className="mx-auto grid max-w-7xl divide-y divide-base-content/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <Feature icon={House} title="A lived-in home" copy="A reliable presence for your property and pets." />
          <Feature icon={ShieldCheck} title="Practical oversight" copy="Checks, upkeep and coordination handled." />
          <Feature icon={Sparkles} title="Clear updates" copy="Useful communication without the guesswork." />
        </div>
      </section>
    </>
  )
}

function Feature({
  icon: Icon,
  title,
  copy,
}: {
  icon: typeof House
  title: string
  copy: string
}) {
  return (
    <div className="flex items-start gap-4 px-6 py-7 sm:px-8">
      <Icon aria-hidden="true" className="mt-1 size-5 shrink-0 text-primary" />
      <div>
        <h2 className="font-bold">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-base-content/60">{copy}</p>
      </div>
    </div>
  )
}
