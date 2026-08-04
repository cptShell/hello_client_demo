import { Link } from 'react-router-dom'

import { StateSidebarExample } from '@/features/sidebar-demo'

export function StateDemoPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-3">
        <p className="text-xs/4 font-medium uppercase tracking-wider text-text-active">
          Независимая интеграция
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Пример с локальным состоянием
        </h1>
        <p className="max-w-2xl text-base/7 text-text-secondary">
          Этот компактный пример и основная навигация приложения собраны из
          одних и тех же headless-компонентов Sidebar. Отличия лишь в том,
          что тут они пересобраны в классический навбар и работают на useState.
        </p>
      </header>

      <StateSidebarExample />

      <Link
        className="inline-flex min-h-[var(--sidebar-item-height)] items-center rounded-item px-3 text-sm/5 font-medium text-text-active outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        to="/overview"
      >
        Вернуться к примеру с Router
      </Link>
    </div>
  )
}
