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

export function RouterMenuItem({ disabled, icon, label, to }: RouterMenuItemProps) {
  const { markLinkNavigation } = useRouterMenuContext()
  const isSubmenuItem = useRouterMenuGroupContext()
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
          <span className={iconClassName}>{icon}</span>
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
