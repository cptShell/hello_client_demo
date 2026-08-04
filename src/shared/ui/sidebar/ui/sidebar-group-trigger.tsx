import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

import { composeEventHandlers } from '@/shared/lib/compose-event-handlers'

import { composeRefs } from '../lib/compose-refs'
import { useSidebarGroupContext } from '../model/sidebar-context'
import {
  resolveStateClassName,
  type SidebarGroupState,
  type StateClassName,
} from '../model/sidebar-types'

type SidebarGroupTriggerProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'className'
> & {
  className?: StateClassName<SidebarGroupState>
}

export const SidebarGroupTrigger = forwardRef<
  HTMLButtonElement,
  SidebarGroupTriggerProps
>(function SidebarGroupTrigger(
  { children, className, onClick, ...triggerProps },
  forwardedRef,
) {
  const group = useSidebarGroupContext()

  return (
    <button
      {...triggerProps}
      aria-controls={group.contentId}
      aria-expanded={group.state.open}
      className={resolveStateClassName(className, group.state)}
      id={group.triggerId}
      onClick={composeEventHandlers(onClick, group.activateTrigger)}
      ref={composeRefs(group.triggerRef, forwardedRef)}
      type="button"
    >
      {children}
    </button>
  )
})
