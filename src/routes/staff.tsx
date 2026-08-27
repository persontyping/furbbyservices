import { createFileRoute } from '@tanstack/react-router'
import { HeartHandshake, MessageSquareText, PawPrint } from 'lucide-react'

import LogoBill from '@/assets/logo-bill.png'

export const Route = createFileRoute('/staff')({
  component: StaffPage,
})

const values = [
  {
    icon: HeartHandshake,
    title: 'A trusted presence',
    copy: 'One dependable point of contact who learns your home, pets and routines before you leave.',
  },
  {
    icon: MessageSquareText,
    title: 'Useful updates',
    copy: 'Clear reports on your pets, property and anything that needs your attention while you are away.',
  },
  {
    icon: PawPrint,
    title: 'Practical judgment',
    copy: 'Everyday upkeep is handled carefully, and larger issues are identified early and coordinated with your tradespeople.',
  },
]

function StaffPage() {
  return (
    <div className="min-h-[calc(100svh-4rem)]">
      <section className="overflow-hidden border-b border-base-content/10 bg-base-100">
        <div className="mx-auto grid max-w-7xl items-end px-5 pt-16 sm:px-8 lg:grid-cols-[1fr_0.7fr] lg:pt-20">
          <div className="pb-14 sm:pb-20">
            <p className="text-sm font-bold uppercase text-primary">The people behind the care</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight [font-family:var(--font-mono)] sm:text-6xl">
              People you can trust with the whole place.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-base-content/65">
              Good house care is attentive, practical and calm. We learn how your property runs, keep pets in their familiar routines and make sure small jobs do not become bigger problems.
            </p>
          </div>

          <div className="relative flex h-72 items-end justify-center sm:h-96 lg:h-[32rem]">
            <div className="absolute bottom-0 size-64 bg-secondary/35 sm:size-80" />
            <img
              src={LogoBill}
              alt="Bill, Casa De Cato’s chief treat inspector"
              className="relative h-full w-auto max-w-full object-contain object-bottom drop-shadow-2xl"
            />
            <div className="absolute right-0 bottom-6 bg-secondary px-5 py-4 text-secondary-content shadow-xl">
              <p className="text-xs font-black uppercase">Bill</p>
              <p className="mt-1 text-sm font-medium">Chief treat inspector</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          {values.map(({ icon: Icon, title, copy }) => (
            <article key={title} className="border-t border-base-content/20 pt-6">
              <Icon aria-hidden="true" className="size-6 text-primary" />
              <h2 className="mt-5 text-xl font-bold">{title}</h2>
              <p className="mt-3 leading-7 text-base-content/65">{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}