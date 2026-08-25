import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { PawPrint } from 'lucide-react'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <div className="min-h-screen text-base-content">
      <header className="navbar sticky top-0 z-50 border-b border-base-content/10 backdrop-blur-xl sm:px-8">
        <nav className="mx-auto flex w-full max-w-7xl items-center">
          <Link to="/" className="flex items-center gap-3 text-lg font-black tracking-wide">
            <span className="grid size-9 place-items-center border-yellow-700 border border-1 font-bold  rounded ">
              <PawPrint aria-hidden="true" className="size-5" />
            </span>
            <span className="hidden sm:inline">NORTH SIDE PET SERVICES</span>
            <span className="sm:hidden">NSPS</span>
          </Link>
          <div className="ml-auto hidden items-center gap-8 md:flex text-lg">
            <a href="#approach" className="link link-hover">Our approach</a>
            <a href="#services" className="link link-hover">Services</a>
          </div>
          <a href="mailto:hello@northsidepetlife@pm.me" className="btn btn-sm p-6 ml-6 sm:btn-md border border-pink-500 hover:bg-pink-100 hover:text-red-700 text-red-900 font-light hover:border-pink-400 text-lg">
            Let's talk
          </a>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
