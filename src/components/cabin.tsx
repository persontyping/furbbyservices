import { ArrowRight, Sparkles } from 'lucide-react'

import LogoCabin from '@/assets/cabin6.png'


export function Cabin() {
    return (

        <section id="approach" className="relative isolate h-full min-h-0 w-full overflow-hidden [container-type:size]">
            <div className="absolute inset-0 opacity-25 [background-size:44px_44px] text-base-content/10" />
            <div className="relative mx-auto grid h-full min-h-0 max-w-7xl grid-rows-[minmax(0,1fr)_minmax(11rem,38%)] px-5 pt-4 sm:px-8 sm:pt-6 lg:grid-cols-2 lg:grid-rows-1 lg:items-end lg:gap-10 lg:px-20 lg:py-8">
                <div className="translate-y-10 relative z-10 flex min-h-0 self-center flex-col items-center overflow-hidden text-center lg:items-start lg:text-left">
                    <div className=" mb-[clamp(0.5rem,2cqh,1.25rem)] flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                        <a href="/services#day-services" className="invisible md:btn btn-secondary btn-outline btn-sm rounded">
                            <Sparkles aria-hidden="true" className="size-4" />
                            Day Services
                        </a>
                        <a href="/services#long-term-stays" className="invisible md:btn btn-secondary btn-outline btn-sm rounded">
                            <Sparkles aria-hidden="true" className="size-4" />
                            Long-term Stays
                        </a>
                    </div>
                    <h1 className="min-h-[3em] text-balance text-[clamp(2rem,6cqh,4rem)] leading-[0.9] font-black [font-family:var(--font-display)] [font-variation-settings:'wght'_700] [-webkit-text-stroke:1px_currentColor] sm:min-h-0 lg:text-[100px]">
                        Extended stays in good hands.
                    </h1>
                    <p className="min-h-[4.05em] max-w-xl text-[clamp(1rem,3cqh,1.5rem)] leading-[1.35] font-light text-blue-400 sm:min-h-0 lg:mx-0">
                        Live-in pet care, house presence, lawns, plants, mail, bins, property checks and more.
                    </p>
                    <div className="mt-[clamp(0.75rem,3cqh,2.25rem)] flex flex-wrap justify-center gap-3 lg:justify-start">
                        <a href="mailto:hello@northparkpetlife.com" className="invisible md:btn btn-ghost border border-base-content/15 sm:btn-lg rounded">
                            Plan their care
                            <ArrowRight aria-hidden="true" className="size-5" />
                        </a>
                        <a href="#services" className="invisible md:btn btn-ghost border border-base-content/15 sm:btn-lg">
                            Explore services
                        </a>
                    </div>
                </div>

                <div className="relative h-full max-h-full min-h-0 overflow-hidden lg:h-[min(72cqh,40rem)] lg:self-end">
                    <div className="absolute bottom-[10%] size-[70%] rounded-full bg-transparent blur-3xl" />
                    <img
                        src={LogoCabin}
                        alt="Cabin, a cozy retreat"
                        className="absolute inset-0 z-10 size-full max-h-full max-w-full -translate-y-10 object-contain object-bottom drop-shadow-2xl"
                    />
                    <div className="absolute right-0 bottom-8 z-20 hidden bg-transparent px-5 py-4 text-secondary-content shadow-xl sm:block">
                        <p className="text-xs font-black uppercase tracking-widest">Your Home</p>
                        <p className="mt-1 text-sm font-medium">Our care</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
