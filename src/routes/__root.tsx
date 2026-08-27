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
            <span className=" grid size-9 place-items-center border border-2 font-bold  rounded">
              <PawPrint aria-hidden="true" className="size-5" />
            </span>
            <span className="hidden sm:inline">Casa De Cato</span>
          </Link>
          <div className="ml-auto flex items-center gap-3 text-sm sm:gap-6 sm:text-base">
            <Link to="/services" className="link link-hover" activeProps={{ className: 'font-bold text-primary' }}>
              Services
            </Link>
            <Link to="/staff" className="link link-hover" activeProps={{ className: 'font-bold text-primary' }}>
              Staff
            </Link>
            <Link to="/book" className="btn btn-sm rounded sm:btn-md">
              Book
            </Link>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
