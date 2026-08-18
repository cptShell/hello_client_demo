import { useId, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Sidebar } from '@/shared/ui/sidebar'
import { useRouterMenuContext } from '../model/router-menu-context'
import { useRouterMenuGroupContext } from '../model/router-menu-group-context'
import type { RouterMenuItemProps } from '../model/router-menu-types'
import {
  iconClassName,
  itemClassName,
  navigationLabelClassName,
  submenuItemClassName,
  submenuLabelClassName,
} from './router-menu-styles'

export function RouterMenuItem({
  disabled,
  icon,
  label,
  to,
}: RouterMenuItemProps) {
  const { markLinkNavigation } = useRouterMenuContext()
  const group = useRouterMenuGroupContext()
  const routeId = useId()
  const initialToRef = useRef(to)
  const isSubmenuItem = group !== null

  // Keep registration lifecycle separate from route updates so changing `to`
  // preserves the item's original position in the group registry.
  useLayoutEffect(() => {
    if (!group) return

    group.registerRoute(routeId, initialToRef.current)
    return () => group.unregisterRoute(routeId)
  }, [group, routeId])

  useLayoutEffect(() => {
    group?.updateRoute(routeId, to)
  }, [group, routeId, to])

  return (
    <Sidebar.Item
      asChild
      className={isSubmenuItem ? submenuItemClassName : itemClassName}
      disabled={disabled}
      value={to}
    >
      <Link onClick={markLinkNavigation} to={to}>
        {isSubmenuItem ? (
          <span
            aria-hidden="true"
            className="size-1 shrink-0 rounded-full bg-current"
          />
        ) : icon ? (
          <span aria-hidden="true" className={iconClassName}>
            {icon}
          </span>
        ) : null}
        <span
          className={
            isSubmenuItem
              ? submenuLabelClassName
              : navigationLabelClassName
          }
        >
          {label}
        </span>
      </Link>
    </Sidebar.Item>
  )
}
