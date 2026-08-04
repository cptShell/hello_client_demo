import { useState } from 'react'

import { Sidebar } from '@/shared/ui/sidebar'

const itemClassName =
  'min-h-[var(--sidebar-item-height)] rounded-item px-4 text-sm/5 font-medium outline-none transition-colors duration-[var(--sidebar-motion-fast)] focus-visible:ring-2 focus-visible:ring-focus-ring aria-current:bg-surface-active aria-current:text-text-active'

export function StateSidebarExample() {
  const [value, setValue] = useState('profile')
  const currentLabel =
    value === 'profile'
      ? 'Профиль'
      : value === 'notifications'
        ? 'Уведомления'
        : 'Безопасность'

  return (
    <div className="space-y-4">
      <Sidebar.Root
        aria-label="Пример с локальным состоянием"
        className="rounded-flyout border border-border-default bg-surface-navigation p-3"
        onValueChange={setValue}
        value={value}
      >
        <Sidebar.List className="m-0 flex list-none flex-wrap gap-2 p-0">
          <Sidebar.Item className={itemClassName} value="profile">
            Профиль
          </Sidebar.Item>
          <Sidebar.Item className={itemClassName} value="notifications">
            Уведомления
          </Sidebar.Item>
          <Sidebar.Item className={itemClassName} value="security">
            Безопасность
          </Sidebar.Item>
        </Sidebar.List>
      </Sidebar.Root>

      <p className="text-sm/6 text-text-secondary">
        Текущее локальное значение:{' '}
        <output className="font-medium text-text-primary">
          {currentLabel}
        </output>
      </p>
    </div>
  )
}
