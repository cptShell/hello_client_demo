import { Link } from 'react-router-dom'

export function RouterDemoPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header className="space-y-3">
        <p className="text-xs/4 font-medium uppercase tracking-wider text-text-active">
          Headless sidebar
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Navigation workspace
        </h1>
        <p className="max-w-2xl text-base/7 text-text-secondary">
          The sidebar now follows Router location while its state machine stays
          independent from routing, storage, styling, and icons.
        </p>
      </header>

      <section
        aria-labelledby="router-summary"
        className="rounded-flyout border border-border-default bg-surface-navigation p-6 shadow-flyout"
      >
        <h2 id="router-summary" className="text-lg font-semibold">
          Router integration
        </h2>
        <p className="mt-2 text-sm/6 text-text-secondary">
          Open destinations, use browser history, reload a nested Products
          route, or switch the desktop width with the sidebar footer control.
        </p>
        <Link
          className="mt-4 inline-flex min-h-[var(--sidebar-item-height)] items-center rounded-item bg-surface-active px-4 text-sm/5 font-medium text-text-active no-underline outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          to="/state-example"
        >
          Open the useState example
        </Link>
      </section>
    </div>
  )
}
