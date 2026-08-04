import { forwardRef, useEffect, useMemo, useRef } from 'react'
import type { ComponentPropsWithoutRef, KeyboardEvent } from 'react'

import { composeEventHandlers } from '@/shared/lib/compose-event-handlers'

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
  entryValue?: string
  id: string
}

export const SidebarGroup = forwardRef<HTMLLIElement, SidebarGroupProps>(
  function SidebarGroup(
    {
      children,
      className,
      entryValue,
      id,
      onKeyDown,
      ...groupProps
    },
    forwardedRef,
  ) {
    const root = useSidebarRootContext()
    const registerGroup = root.registerGroup
    const triggerRef = useRef<HTMLButtonElement>(null)
    const active = root.state.activeParentId === id
    const explicitlyOpen = root.state.openGroupId === id
    const expanded = root.state.variant === 'desktop-expanded'
    const state = useMemo<SidebarGroupState>(
      () => ({
        active,
        open: explicitlyOpen || (expanded && active),
        presentation: getSidebarPresentation(root.state.variant),
        variant: root.state.variant,
      }),
      [active, expanded, explicitlyOpen, root.state.variant],
    )
    const triggerId = `sidebar-group-${id}-trigger`
    const contentId = `sidebar-group-${id}-content`
    const contextValue = useMemo(
      () => ({
        contentId,
        entryValue,
        explicitlyOpen,
        id,
        state,
        triggerId,
        triggerRef,
      }),
      [contentId, entryValue, explicitlyOpen, id, state, triggerId],
    )

    useEffect(() => registerGroup(id), [id, registerGroup])

    const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
      if (
        event.key !== 'Escape' ||
        !expanded ||
        active ||
        !explicitlyOpen
      ) {
        return
      }

      event.preventDefault()
      event.stopPropagation()
      root.setOpenGroupId(null)
      triggerRef.current?.focus()
    }

    return (
      <SidebarGroupProvider value={contextValue}>
        <li
          {...groupProps}
          className={resolveStateClassName(className, state)}
          id={`sidebar-group-${id}`}
          onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
          ref={forwardedRef}
        >
          {children}
        </li>
      </SidebarGroupProvider>
    )
  },
)
