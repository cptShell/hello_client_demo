import { Children, isValidElement, useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { Sidebar } from '@/shared/ui/sidebar'
import type { RouterMenuGroupProps, RouterMenuItemProps } from '../model/router-menu-types'
import { groupClassName, groupContentClassName, groupTriggerClassName, iconClassName, listClassName, navigationLabelClassName } from './router-menu-styles'

function getEntryValue(children: RouterMenuGroupProps['children']) {
  const firstChild = Children.toArray(children)[0]
  if (!isValidElement<RouterMenuItemProps>(firstChild)) return undefined
  return typeof firstChild.props.to === 'string' ? firstChild.props.to : undefined
}

export function RouterMenuGroup({ children, icon, label }: RouterMenuGroupProps) {
  const id = useId()
  const entryValue = getEntryValue(children)
  return (
    <Sidebar.Group className={groupClassName} entryValue={entryValue} id={id}>
      <Sidebar.GroupTrigger className={groupTriggerClassName}>
        {icon ? <span className={iconClassName}>{icon}</span> : null}
        <span className={navigationLabelClassName}>{label}</span>
        <ChevronDown aria-hidden="true" className="ml-auto size-4 shrink-0" />
      </Sidebar.GroupTrigger>
      <Sidebar.GroupContent className={groupContentClassName} title={label}>
        <Sidebar.List className={listClassName}>
          {children}
        </Sidebar.List>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  )
}
