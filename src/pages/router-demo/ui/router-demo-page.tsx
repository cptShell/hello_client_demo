import { StateSidebarExample } from '@/features/sidebar-demo'

export function RouterDemoPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header className="space-y-3">
        <p className="text-xs/4 font-medium uppercase tracking-wider text-text-active">
          Demo Destination
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Trends
        </h1>
        <p className="max-w-2xl text-base/7 text-text-secondary">
          The sidebar now follows Router location while its state machine stays
          independent from routing, storage, styling, and icons.
        </p>
      </header>

      <section
        aria-labelledby="local-state-summary"
        className="space-y-5 rounded-flyout border border-border-default bg-surface-navigation p-6 shadow-flyout"
      >
        <div>
          <h2 id="local-state-summary" className="text-lg font-semibold">
            Пример на локальных стейтах
          </h2>
          <p className="mt-2 max-w-2xl text-sm/6 text-text-secondary">
            Эта демонстрация примера с альтернативным видом сайдбара в виде классического навбара,
            чьи основная навигация, структура и стили "пересобраны" из одних и тех же хэдлесс компонентов для сайдбара.
            Здесь выбор обновляет только React useState и не меняет URL.
          </p>
        </div>

        <StateSidebarExample />
      </section>
    </div>
  )
}
