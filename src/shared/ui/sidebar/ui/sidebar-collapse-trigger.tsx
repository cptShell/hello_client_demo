import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

import { composeEventHandlers } from '@/shared/lib/compose-event-handlers'

import { useSidebarRootContext } from '../model/sidebar-context'
import {
  resolveStateClassName,
  type SidebarRootState,
  type StateClassName,
} from '../model/sidebar-types'

type SidebarCollapseTriggerProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'className'
> & {
  className?: StateClassName<SidebarRootState>
  collapsedLabel?: string
  expandedLabel?: string
}

export const SidebarCollapseTrigger = forwardRef<
  HTMLButtonElement,
  SidebarCollapseTriggerProps
>(function SidebarCollapseTrigger(
  {
    'aria-label': ariaLabel,
    children,
    className,
    collapsedLabel = 'Expand navigation',
    expandedLabel = 'Collapse navigation',
    onClick,
    ...triggerProps
  },
  forwardedRef,
) {
  const root = useSidebarRootContext()

  if (root.state.variant === 'mobile') {
    return null
  }

  const label = root.state.expanded ? expandedLabel : collapsedLabel
  const handleToggle = () => root.setExpanded(!root.state.expanded)

  return (
    <button
      {...triggerProps}
      aria-expanded={root.state.expanded}
      aria-label={ariaLabel ?? label}
      className={resolveStateClassName(className, root.state)}
      onClick={composeEventHandlers(onClick, handleToggle)}
      ref={forwardedRef}
      type="button"
    >
      {children ?? label}
    </button>
  )
})
