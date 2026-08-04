import { useSyncExternalStore } from 'react'

import { AppSidebar } from '@/features/sidebar-demo'

const DEFAULT_NAVIGATION_VALUE = '/products/featured'

function subscribeToHashChange(onStoreChange: () => void) {
  window.addEventListener('hashchange', onStoreChange)

  return () => window.removeEventListener('hashchange', onStoreChange)
}

function getHashNavigationValue() {
  return window.location.hash.slice(1) || DEFAULT_NAVIGATION_VALUE
}

export function App() {
  const navigationValue = useSyncExternalStore(
    subscribeToHashChange,
    getHashNavigationValue,
    () => DEFAULT_NAVIGATION_VALUE,
  )

  return (
    <div className="min-h-screen bg-surface-page text-text-primary">
      <AppSidebar
        className="peer/sidebar"
        value={navigationValue}
        onValueChange={(value) => {
          window.location.hash = value
        }}
      />
      <main className="min-h-screen px-8 py-12 transition-[margin] duration-[var(--sidebar-motion-normal)] ease-standard md:ml-[var(--sidebar-width-expanded)] md:px-12 md:py-16 md:peer-data-[variant=desktop-collapsed]/sidebar:ml-[var(--sidebar-width-collapsed)]">
        <div className="mx-auto max-w-4xl space-y-8">
          <header className="space-y-3">
            <p className="text-xs/4 font-medium uppercase tracking-wider text-text-active">
              Headless sidebar
            </p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Navigation workspace
            </h1>
            <p className="max-w-2xl text-base/7 text-text-secondary">
              The first production-facing sidebar state now combines headless
              behavior, semantic tokens, and a concrete JSX navigation tree.
            </p>
          </header>

          <section
            aria-labelledby="phase-summary"
            className="rounded-flyout border border-border-default bg-surface-navigation p-6 shadow-flyout"
          >
            <h2 id="phase-summary" className="text-lg font-semibold">
              Desktop navigation preview
            </h2>
            <p className="mt-2 text-sm/6 text-text-secondary">
              Use the footer control to switch sidebar width. Products renders
              inline while expanded and as an interactive flyout while
              collapsed.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
