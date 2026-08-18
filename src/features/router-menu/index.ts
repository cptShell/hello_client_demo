import { RouterMenuGroup } from './ui/router-menu-group'
import { RouterMenuItem } from './ui/router-menu-item'
import { RouterMenuRoot } from './ui/router-menu'
import { RouterMenuSeparator } from './ui/router-menu-separator'

export const RouterMenu = Object.assign(RouterMenuRoot, {
  Group: RouterMenuGroup,
  Item: RouterMenuItem,
  Separator: RouterMenuSeparator,
})

export type {
  RouterMenuGroupProps,
  RouterMenuItemProps,
  RouterMenuRootProps,
} from './model/router-menu-types'
