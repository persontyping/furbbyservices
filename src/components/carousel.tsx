import { Bill } from './bill.tsx'
import { Cabin } from './cabin.tsx'

export function Carousel() {
    return (
        <div className="carousel border border-2 h-[clamp(32rem,calc(100svh-1rem),56rem)] w-full lg:h-[clamp(38rem,calc(100svh-4rem),56rem)]">
            <div id="slide1" className="carousel-item relative h-full max-h-full min-h-0 w-full overflow-hidden">
                <Cabin />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide4" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative h-full max-h-full min-h-0 w-full overflow-hidden">
                <Bill />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    )
}