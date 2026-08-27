import { ArrowRight, Sparkles } from 'lucide-react'

import House5 from '@/assets/house5.png'

export function Cabin() {
    return (

        <section id="approach" className="relative isolate w-full min-h-[calc(100svh-8rem)] overflow-hidden lg:min-h-[calc(100svh-4rem)]">
            <div className="absolute inset-0 opacity-25 [background-size:44px_44px] text-base-content/10" />
            <div className="relative mx-auto grid min-h-[calc(100svh-8rem)] max-w-7xl items-center px-5 pt-10 sm:px-8 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[1fr_0.9fr] lg:gap-10 lg:pt-0">
                <div className="relative z-10 flex self-start flex-col items-center pb-60 text-center sm:pb-72 lg:self-center lg:items-start lg:py-24 lg:text-left">
                    <div className="mb-5 flex items-center gap-2">
                        <a href="/services#day-services" className="btn btn-secondary btn-outline btn-sm rounded">
                            <Sparkles aria-hidden="true" className="size-4" />
                            Day Services
                        </a>
                        <a href="/services#long-term-stays" className="btn btn-secondary btn-outline btn-sm rounded">
                            <Sparkles aria-hidden="true" className="size-4" />
                            Long-term Stays
                        </a>
                    </div>
                    <h1 className="max-w-3xl text-4xl leading-[0.98] font-bold [font-family:var(--font-mono)] sm:text-6xl lg:text-8xl">
                        Leave the whole place in good hands.
                    </h1>
                    <p className="mt-4 max-w-xl text-[22px] leading-8 font-light text-blue-400 sm:mt-7 sm:text-2xl sm:leading-9 lg:mx-0">
                        Live-in pet care, house presence, lawns, plants, mail, bins, property checks and practical coordination in one extended-stay package.                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-9 lg:justify-start">
                        <a href="mailto:hello@northparkpetlife.com" className="btn btn-ghost border border-base-content/15 sm:btn-lg rounded">
                            Plan their care
                            <ArrowRight aria-hidden="true" className="size-5" />
                        </a>
                        <a href="#services" className="btn btn-ghost border border-base-content/15 sm:btn-lg">
                            Explore services
                        </a>
                    </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 flex h-52 items-end justify-center overflow-hidden px-4 sm:h-64 sm:px-8 lg:relative lg:inset-auto lg:min-h-[calc(100svh-4rem)] lg:justify-end lg:overflow-visible lg:px-0">
                    <div className="absolute bottom-[12%] size-[70%] rounded-full bg-primary/20 blur-3xl" />
                    <img
                        src={House5}
                        alt="A cozy cabin"
                        className="relative z-10 h-full w-auto max-w-[70%] object-contain object-bottom drop-shadow-2xl lg:max-h-[72svh] lg:w-full lg:max-w-none"
                    />
                    <div className="absolute right-0 bottom-8 z-20 hidden bg-secondary px-5 py-4 text-secondary-content shadow-xl sm:block">
                        <p className="text-xs font-black uppercase tracking-widest">Meet Bill</p>
                        <p className="mt-1 text-sm font-medium">Chief treat inspector</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
