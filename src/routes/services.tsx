import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { ServiceList } from '@/components/service-list'

export const Route = createFileRoute('/services')({
    component: ServicesPage,
})


function ServicesPage() {
    return (
        <div className="min-h-[calc(100svh-4rem)]">
            <section className="border-b border-base-content/10 bg-base-100">
                <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
                    <p className="text-sm font-bold uppercase text-primary">Stay or scheduled care</p>
                    <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight [font-family:var(--font-mono)] sm:text-6xl">
                        Your home, pets and property looked after.
                    </h1>
                    <p className="mt-6 max-w-2xl text-xl leading-8 text-base-content/65">
                        Choose live-in support while you travel or practical property care on a regular schedule. Both are shaped around what needs to keep moving while you are away.
                    </p>
                </div>
            </section>
            <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
                <ServiceList />
                <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-base-content/15 pt-9 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-2xl font-bold">Not sure which layer fits?</h2>
                        <p className="mt-2 text-base-content/65">Tell us about your property, pets and time away. We will shape the right plan.</p>
                    </div>
                    <Link to="/book" className="btn btn-primary rounded">
                        Plan your care
                        <ArrowRight aria-hidden="true" className="size-5" />
                    </Link>
                </div>
            </section>
        </div>
    )
}