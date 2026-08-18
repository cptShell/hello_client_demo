import { useCallback, useMemo, useRef } from 'react'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Sidebar } from '@/shared/ui/sidebar'
import { RouterMenuContext } from '../model/router-menu-context'
import type { RouterMenuRootProps } from '../model/router-menu-types'
import { collapseTriggerClassName, listClassName, rootClassName } from './router-menu-styles'

export function RouterMenuRoot({ ariaLabel = 'Primary', children }: RouterMenuRootProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const linkNavigationRef = useRef(false)

  const markLinkNavigation = useCallback(() => {
    linkNavigationRef.current = true
    queueMicrotask(() => { linkNavigationRef.current = false })
  }, [])

  const handleValueChange = useCallback((value: string) => {
    if (!linkNavigationRef.current) void navigate(value)
  }, [navigate])

  const contextValue = useMemo(() => ({ markLinkNavigation }), [markLinkNavigation])

  return (
    <RouterMenuContext.Provider value={contextValue}>
      <Sidebar.Root
        aria-label={ariaLabel}
        className={rootClassName}
        defaultValue="/trends"
        defaultExpanded
        onValueChange={handleValueChange}
        value={location.pathname}
      >
        <div className="flex min-h-14 items-center gap-3 overflow-hidden border-b border-border-default px-3 pb-3 group-data-[variant=mobile]/sidebar:hidden">
          <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-item bg-surface-active-strong text-sm font-semibold text-text-active transition-transform duration-[var(--sidebar-motion-normal)] ease-standard group-data-[variant=desktop-collapsed]/sidebar:-translate-x-2">HC</span>
          <span className="min-w-0 opacity-100 transition-opacity duration-[var(--sidebar-motion-normal)] ease-standard group-data-[variant=desktop-collapsed]/sidebar:opacity-0">
            <span className="block truncate text-base/6 font-semibold">HelloClient</span>
            <span className="block truncate text-xs/4 text-text-secondary">Client workspace</span>
          </span>
        </div>
        <Sidebar.List className={listClassName}>{children}</Sidebar.List>
        <Sidebar.CollapseTrigger className={collapseTriggerClassName}>
          <PanelLeftClose aria-hidden="true" className="size-[var(--sidebar-icon-size)] shrink-0 group-data-[variant=desktop-collapsed]/sidebar:hidden" />
          <PanelLeftOpen aria-hidden="true" className="hidden size-[var(--sidebar-icon-size)] shrink-0 group-data-[variant=desktop-collapsed]/sidebar:block" />
          <span className="sr-only">Toggle navigation</span>
        </Sidebar.CollapseTrigger>
      </Sidebar.Root>
    </RouterMenuContext.Provider>
  )
}
