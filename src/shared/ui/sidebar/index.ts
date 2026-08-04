import { SidebarCollapseTrigger } from './ui/sidebar-collapse-trigger'
import { SidebarGroup } from './ui/sidebar-group'
import { SidebarGroupContent } from './ui/sidebar-group-content'
import { SidebarGroupTrigger } from './ui/sidebar-group-trigger'
import { SidebarItem } from './ui/sidebar-item'
import { SidebarList } from './ui/sidebar-list'
import { SidebarRoot } from './ui/sidebar-root'
import { SidebarSeparator } from './ui/sidebar-separator'

export const Sidebar = {
  CollapseTrigger: SidebarCollapseTrigger,
  Group: SidebarGroup,
  GroupContent: SidebarGroupContent,
  GroupTrigger: SidebarGroupTrigger,
  Item: SidebarItem,
  List: SidebarList,
  Root: SidebarRoot,
  Separator: SidebarSeparator,
} as const

export type {
  SidebarGroupState,
  SidebarItemState,
  SidebarPresentation,
  SidebarRootState,
  SidebarVariant,
  StateClassName,
} from './model/sidebar-types'
