import { Bill } from '@/components/bill'
import { Cabin } from '@/components/cabin'

export function Carousel() {
    return (
        <div className="carousel mx-auto w-full max-w-[100vw] overflow-x-auto">
            <div id="slide2" className="carousel-item relative w-full min-w-full shrink-0 justify-center">
                <Bill />
                <div className="absolute inset-x-2 top-1/2 z-30 flex -translate-y-1/2 transform justify-between sm:inset-x-5">
                    <a href="#slide3" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full min-w-full shrink-0 justify-center">
                <Cabin />
                <div className="absolute inset-x-2 top-1/2 z-30 flex -translate-y-1/2 transform justify-between sm:inset-x-5">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>

        </div>
    
  )
}