import { forwardRef, useEffect, useMemo, useRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

import { SidebarGroupProvider, useSidebarRootContext } from '../model/sidebar-context'
import {
  getSidebarPresentation,
  resolveStateClassName,
  type SidebarGroupState,
  type StateClassName,
} from '../model/sidebar-types'

type SidebarGroupProps = Omit<
  ComponentPropsWithoutRef<'li'>,
  'className' | 'id'
> & {
  className?: StateClassName<SidebarGroupState>
  id: string
}

export const SidebarGroup = forwardRef<HTMLLIElement, SidebarGroupProps>(
  function SidebarGroup(
    { children, className, id, ...groupProps },
    forwardedRef,
  ) {
    const root = useSidebarRootContext()
    const registerGroup = root.registerGroup
    const triggerRef = useRef<HTMLButtonElement>(null)
    const active = root.state.activeParentId === id
    const explicitlyOpen = root.state.openGroupId === id
    const state = useMemo<SidebarGroupState>(
      () => ({
        active,
        open:
          explicitlyOpen ||
          (active && root.state.variant === 'desktop-expanded'),
        presentation: getSidebarPresentation(root.state.variant),
        variant: root.state.variant,
      }),
      [active, explicitlyOpen, root.state.variant],
    )
    const triggerId = `sidebar-group-${id}-trigger`
    const contentId = `sidebar-group-${id}-content`
    const contextValue = useMemo(
      () => ({
        contentId,
        explicitlyOpen,
        id,
        state,
        triggerId,
        triggerRef,
      }),
      [contentId, explicitlyOpen, id, state, triggerId],
    )

    useEffect(() => registerGroup(id), [id, registerGroup])

    return (
      <SidebarGroupProvider value={contextValue}>
        <li
          {...groupProps}
          className={resolveStateClassName(className, state)}
          id={`sidebar-group-${id}`}
          ref={forwardedRef}
        >
          {children}
        </li>
      </SidebarGroupProvider>
    )
  },
)
