import { createFileRoute } from '@tanstack/react-router'

import { daisyExampleGroups } from '@/components/daisy-examples'

export const Route = createFileRoute('/components')({
  component: ComponentsPage,
})

const componentCount = daisyExampleGroups.reduce(
  (total, group) => total + group.examples.length,
  0,
)

function toId(value: string) {
  return value.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-').replaceAll(/(^-|-$)/g, '')
}

function ComponentsPage() {
  return (
    <div id="components" className="min-h-screen overflow-x-clip bg-base-200/40">
      <header className="border-b border-base-content/10 bg-base-100">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-primary">DaisyUI reference</p>
              <h1 className="text-4xl font-black [font-family:var(--font-space)] sm:text-5xl">Component library</h1>
            </div>
            <span className="badge badge-outline h-auto px-3 py-2 font-mono">{componentCount} examples</span>
          </div>
        </div>
      </header>

      <nav aria-label="Component categories" className="sticky top-16 z-40 overflow-hidden border-b border-base-content/10 bg-base-100/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 sm:px-8">
          {daisyExampleGroups.map((group) => (
            <a key={group.name} href={`#${toId(group.name)}`} className="btn btn-ghost btn-sm shrink-0">
              {group.name}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        {daisyExampleGroups.map((group) => (
          <section key={group.name} id={toId(group.name)} className="scroll-mt-32 py-12 sm:py-16">
            <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-base-content/15 pb-4">
              <h2 className="text-2xl font-bold [font-family:var(--font-space)] sm:text-3xl">{group.name}</h2>
              <span className="font-mono text-sm text-base-content/50">{group.examples.length}</span>
            </div>

            <div className="grid gap-x-10 lg:grid-cols-2">
              {group.examples.map(({ name, Component }) => (
                <article key={name} className="min-w-0 border-b border-base-content/10 py-8">
                  <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-base-content/55">{name}</h3>
                  <div className="flex min-h-56 min-w-0 items-center justify-center overflow-visible rounded-box border border-base-content/10 bg-base-100 p-5 sm:p-7">
                    <Component />
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}