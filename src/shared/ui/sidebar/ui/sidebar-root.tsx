import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

import { useControllableState } from '@/shared/lib/use-controllable-state'
import { useMediaQuery } from '@/shared/lib/use-media-query'

import { SidebarRootProvider } from '../model/sidebar-context'
import {
  resolveStateClassName,
  type SidebarRootState,
  type SidebarVariant,
  type StateClassName,
} from '../model/sidebar-types'

type SidebarRootProps = Omit<
  ComponentPropsWithoutRef<'nav'>,
  'className' | 'onChange'
> & {
  className?: StateClassName<SidebarRootState>
  defaultExpanded?: boolean
  defaultOpenGroupId?: string | null
  defaultValue?: string
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  onOpenGroupChange?: (groupId: string | null) => void
  onValueChange?: (value: string) => void
  openGroupId?: string | null
  value?: string
}

function getVariant(isMobile: boolean, expanded: boolean): SidebarVariant {
  if (isMobile) {
    return 'mobile'
  }

  return expanded ? 'desktop-expanded' : 'desktop-collapsed'
}

export const SidebarRoot = forwardRef<HTMLElement, SidebarRootProps>(
  function SidebarRoot(
    {
      children,
      className,
      defaultExpanded = true,
      defaultOpenGroupId = null,
      defaultValue = '',
      expanded: expandedProp,
      onExpandedChange,
      onOpenGroupChange,
      onValueChange,
      openGroupId: openGroupIdProp,
      value: valueProp,
      ...navigationProps
    },
    forwardedRef,
  ) {
    const [value, setValue] = useControllableState({
      defaultValue,
      onChange: onValueChange,
      value: valueProp,
    })
    const [expanded, setExpanded] = useControllableState({
      defaultValue: defaultExpanded,
      onChange: onExpandedChange,
      value: expandedProp,
    })
    const [openGroupId, setOpenGroupId] = useControllableState({
      defaultValue: defaultOpenGroupId,
      onChange: onOpenGroupChange,
      value: openGroupIdProp,
    })
    const [itemParents, setItemParents] = useState(
      () => new Map<string, string | null>(),
    )
    const registeredGroupCountsRef = useRef(new Map<string, number>())
    const isMobile = useMediaQuery()
    const variant = getVariant(isMobile, expanded)
    const previousVariantRef = useRef(variant)
    const activeParentId = itemParents.get(value) ?? null

    useEffect(() => {
      if (previousVariantRef.current === variant) {
        return
      }

      previousVariantRef.current = variant
      setOpenGroupId(null)
    }, [setOpenGroupId, variant])

    const registerItem = useCallback(
      (itemValue: string, parentGroupId: string | null) => {
        setItemParents((currentItems) => {
          if (currentItems.get(itemValue) === parentGroupId) {
            return currentItems
          }

          const nextItems = new Map(currentItems)
          nextItems.set(itemValue, parentGroupId)
          return nextItems
        })

        return () => {
          setItemParents((currentItems) => {
            if (currentItems.get(itemValue) !== parentGroupId) {
              return currentItems
            }

            const nextItems = new Map(currentItems)
            nextItems.delete(itemValue)
            return nextItems
          })
        }
      },
      [],
    )

    const registerGroup = useCallback((groupId: string) => {
      const registeredGroups = registeredGroupCountsRef.current
      const currentCount = registeredGroups.get(groupId) ?? 0

      if (currentCount > 0) {
        console.warn(`Sidebar.Group id "${groupId}" must be unique`)
      }

      registeredGroups.set(groupId, currentCount + 1)

      return () => {
        const nextCount = (registeredGroups.get(groupId) ?? 1) - 1

        if (nextCount === 0) {
          registeredGroups.delete(groupId)
        } else {
          registeredGroups.set(groupId, nextCount)
        }
      }
    }, [])

    const state = useMemo<SidebarRootState>(
      () => ({ activeParentId, expanded, openGroupId, value, variant }),
      [activeParentId, expanded, openGroupId, value, variant],
    )
    const contextValue = useMemo(
      () => ({
        registerGroup,
        registerItem,
        setExpanded,
        setOpenGroupId,
        setValue,
        state,
      }),
      [
        registerGroup,
        registerItem,
        setExpanded,
        setOpenGroupId,
        setValue,
        state,
      ],
    )

    return (
      <SidebarRootProvider value={contextValue}>
        <nav
          {...navigationProps}
          className={resolveStateClassName(className, state)}
          data-variant={variant}
          ref={forwardedRef}
        >
          {children}
        </nav>
      </SidebarRootProvider>
    )
  },
)
