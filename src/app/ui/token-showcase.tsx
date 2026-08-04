import type { ReactNode } from 'react'

type SectionProps = {
  children: ReactNode
  description: string
  id: string
  title: string
}

function Section({ children, description, id, title }: SectionProps) {
  return (
    <section aria-labelledby={id} className="space-y-5">
      <div className="max-w-2xl space-y-1">
        <h2 id={id} className="text-xl font-semibold text-text-primary">
          {title}
        </h2>
        <p className="text-sm/6 text-text-secondary">{description}</p>
      </div>
      {children}
    </section>
  )
}

type ColorSwatchProps = {
  className: string
  label: string
  token: string
}

function ColorSwatch({ className, label, token }: ColorSwatchProps) {
  return (
    <article className="overflow-hidden rounded-item border border-border-default bg-surface-navigation">
      <div aria-hidden="true" className={`h-20 ${className}`} />
      <div className="space-y-1 p-3">
        <h3 className="text-sm/5 font-medium text-text-primary">{label}</h3>
        <code className="block break-words text-xs/4 text-text-secondary">
          {token}
        </code>
      </div>
    </article>
  )
}

type MetricProps = {
  label: string
  value: string
}

function Metric({ label, value }: MetricProps) {
  return (
    <div className="rounded-item border border-border-default bg-surface-navigation p-4">
      <dt className="text-xs/4 font-medium uppercase tracking-wider text-text-secondary">
        {label}
      </dt>
      <dd className="mt-2 text-sm/5 font-medium text-text-primary">{value}</dd>
    </div>
  )
}

type NavigationStateProps = {
  className?: string
  current?: boolean
  disabled?: boolean
  label: string
}

function NavigationState({
  className = '',
  current = false,
  disabled = false,
  label,
}: NavigationStateProps) {
  return (
    <button
      aria-current={current ? 'page' : undefined}
      aria-label={`${label} item preview`}
      className={`flex min-h-[var(--sidebar-item-height)] w-full items-center gap-2 rounded-item px-3 text-sm/5 font-medium outline-none transition-colors duration-[var(--sidebar-motion-fast)] ease-standard ${className}`}
      disabled={disabled}
      type="button"
    >
      <span
        aria-hidden="true"
        className="size-[var(--sidebar-icon-size)] shrink-0 rounded-[0.375rem] border-2 border-current"
      />
      <span>{label}</span>
    </button>
  )
}

export function TokenShowcase() {
  return (
    <main className="min-h-screen bg-surface-page px-4 py-10 text-text-primary md:px-8 md:py-14">
      <div className="mx-auto max-w-6xl space-y-14">
        <header className="max-w-3xl space-y-4">
          <p className="text-xs/4 font-medium uppercase tracking-wider text-text-active">
            Design system foundation
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
            HelloClient design tokens
          </h1>
          <p className="text-base/7 text-text-secondary">
            A static reference for semantic colors, typography, dimensions, and
            navigation state recipes. Behavior remains outside this phase.
          </p>
        </header>

        <Section
          description="Component styles consume purpose-based aliases instead of primitive palette values."
          id="semantic-colors"
          title="Semantic colors"
        >
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <ColorSwatch
              className="bg-surface-page"
              label="Page"
              token="surface-page"
            />
            <ColorSwatch
              className="bg-surface-navigation"
              label="Navigation"
              token="surface-navigation"
            />
            <ColorSwatch
              className="bg-surface-hover"
              label="Hover"
              token="surface-hover"
            />
            <ColorSwatch
              className="bg-surface-active"
              label="Active"
              token="surface-active"
            />
            <ColorSwatch
              className="bg-surface-active-strong"
              label="Active strong"
              token="surface-active-strong"
            />
            <ColorSwatch
              className="bg-surface-overlay"
              label="Overlay"
              token="surface-overlay"
            />
            <ColorSwatch
              className="bg-surface-disabled"
              label="Disabled"
              token="surface-disabled"
            />
            <ColorSwatch className="bg-scrim" label="Scrim" token="scrim" />
          </div>

          <div className="grid gap-3 rounded-flyout border border-border-default bg-surface-navigation p-5 md:grid-cols-2">
            <div className="space-y-3">
              <p className="font-medium text-text-primary">Primary content</p>
              <p className="text-text-secondary">Secondary content</p>
              <p className="text-text-active">Active content</p>
              <p className="text-text-disabled">Disabled content</p>
            </div>
            <div className="flex items-center gap-6 md:justify-end">
              <span className="flex items-center gap-2 text-sm text-icon-default">
                <span
                  aria-hidden="true"
                  className="size-[var(--sidebar-icon-size)] rounded-full bg-icon-default"
                />
                Default icon
              </span>
              <span className="flex items-center gap-2 text-sm text-icon-active">
                <span
                  aria-hidden="true"
                  className="size-[var(--sidebar-icon-size)] rounded-full bg-icon-active"
                />
                Active icon
              </span>
            </div>
          </div>
        </Section>

        <Section
          description="The system stack stays native; roles define size, line height, and weight."
          id="typography"
          title="Typography"
        >
          <div className="grid gap-3 md:grid-cols-2">
            <article className="rounded-item border border-border-default bg-surface-navigation p-5">
              <p className="text-xs/4 uppercase tracking-wider text-text-secondary">
                Brand
              </p>
              <p className="mt-3 text-base/6 font-semibold">HelloClient CRM</p>
            </article>
            <article className="rounded-item border border-border-default bg-surface-navigation p-5">
              <p className="text-xs/4 uppercase tracking-wider text-text-secondary">
                Item label
              </p>
              <p className="mt-3 text-sm/5 font-medium">Clients</p>
            </article>
            <article className="rounded-item border border-border-default bg-surface-navigation p-5">
              <p className="text-xs/4 uppercase tracking-wider text-text-secondary">
                Submenu label
              </p>
              <p className="mt-3 text-sm/5 font-normal">All clients</p>
            </article>
            <article className="rounded-item border border-border-default bg-surface-navigation p-5">
              <p className="text-xs/4 uppercase tracking-wider text-text-secondary">
                Mobile label
              </p>
              <p className="mt-3 text-xs/4 font-medium">Tasks</p>
            </article>
          </div>
        </Section>

        <Section
          description="Dimensions, shape, and elevation are shared contracts for later sidebar variants."
          id="component-foundations"
          title="Component foundations"
        >
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="overflow-hidden rounded-flyout border border-border-default bg-surface-navigation p-5">
              <h3 className="text-sm/5 font-medium">Sidebar widths</h3>
              <div className="mt-5 space-y-4 overflow-x-auto pb-2">
                <div className="w-[var(--sidebar-width-expanded)] max-w-full rounded-item bg-surface-active p-3 text-sm text-text-active">
                  Expanded · 16rem
                </div>
                <div className="w-[var(--sidebar-width-collapsed)] rounded-item bg-surface-active-strong p-3 text-center text-sm text-text-active">
                  4.5rem
                </div>
              </div>
            </article>

            <article className="rounded-flyout border border-border-default bg-surface-navigation p-5">
              <h3 className="text-sm/5 font-medium">Radius and elevation</h3>
              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="grid min-h-24 place-items-center rounded-item border border-border-default bg-surface-overlay p-2 text-center text-xs shadow-flyout">
                  Item
                </div>
                <div className="grid min-h-24 place-items-center rounded-flyout border border-border-default bg-surface-overlay p-2 text-center text-xs shadow-bottom-bar">
                  Flyout
                </div>
                <div className="grid min-h-24 place-items-center rounded-sheet border border-border-default bg-surface-overlay p-2 text-center text-xs shadow-sheet">
                  Sheet
                </div>
              </div>
            </article>
          </div>

          <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Metric label="Item target" value="44px" />
            <Metric label="Icon" value="20px" />
            <Metric label="Mobile bar" value="72px + safe area" />
            <Metric label="Sheet limit" value="70dvh" />
          </dl>
        </Section>

        <Section
          description="These static previews document visual recipes; interaction logic comes later."
          id="navigation-states"
          title="Navigation states"
        >
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            <NavigationState
              className="bg-surface-navigation text-text-primary"
              label="Default"
            />
            <NavigationState
              className="bg-surface-hover text-text-primary"
              label="Hover"
            />
            <NavigationState
              className="bg-surface-navigation text-text-primary ring-2 ring-focus-ring ring-offset-2"
              label="Focus"
            />
            <NavigationState
              className="bg-surface-active text-text-active"
              current
              label="Active"
            />
            <NavigationState
              className="cursor-not-allowed bg-surface-disabled text-text-disabled"
              disabled
              label="Disabled"
            />
          </div>
        </Section>

        <Section
          description="Motion tokens collapse to zero when reduced motion is requested; layout switches at 48rem."
          id="motion-responsive"
          title="Motion and responsive contracts"
        >
          <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Metric label="Fast" value="120ms" />
            <Metric label="Normal" value="180ms" />
            <Metric label="Sheet" value="240ms" />
            <Metric label="Desktop" value="≥ 768px" />
          </dl>
          <p className="rounded-item border border-border-default bg-surface-navigation p-4 text-sm/6 text-text-secondary">
            The mobile safe-area value is available as
            <code className="mx-1 text-text-primary">
              --sidebar-safe-area-bottom
            </code>
            and will be consumed by the bottom navigation in Phase 7.
          </p>
        </Section>
      </div>
    </main>
  )
}
