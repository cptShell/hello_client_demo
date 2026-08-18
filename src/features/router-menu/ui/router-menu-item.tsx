import { Link } from 'react-router-dom'
import { Sidebar } from '@/shared/ui/sidebar'
import { useRouterMenuContext } from '../model/router-menu-context'
import type { RouterMenuItemProps } from '../model/router-menu-types'
import { iconClassName, itemClassName, navigationLabelClassName } from './router-menu-styles'

export function RouterMenuItem({ disabled, icon, label, to }: RouterMenuItemProps) {
  const { markLinkNavigation } = useRouterMenuContext()
  return (
    <Sidebar.Item asChild className={itemClassName} disabled={disabled} value={to}>
      <Link onClick={markLinkNavigation} to={to}>
        {icon ? <span className={iconClassName}>{icon}</span> : null}
        <span className={navigationLabelClassName}>{label}</span>
      </Link>
    </Sidebar.Item>
  )
}
