import { Children, isValidElement, useId } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { Sidebar } from '@/shared/ui/sidebar'
import type { RouterMenuGroupProps, RouterMenuItemProps } from '../model/router-menu-types'
import { RouterMenuGroupProvider } from '../model/router-menu-group-provider'
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
        {icon ? (
          <span aria-hidden="true" className={iconClassName}>
            {icon}
          </span>
        ) : null}
        <span className={navigationLabelClassName}>{label}</span>
        <ChevronDown aria-hidden="true" className="ml-auto size-4 shrink-0 transition-transform duration-[var(--sidebar-motion-fast)] group-aria-expanded:rotate-180 group-data-[variant=desktop-collapsed]/sidebar:hidden group-data-[variant=mobile]/sidebar:hidden" />
      </Sidebar.GroupTrigger>
      <Sidebar.GroupContent
        backdropClassName="fixed inset-0 z-[var(--sidebar-z-scrim)] flex items-end bg-scrim"
        className={groupContentClassName}
        closeButtonClassName="absolute right-4 top-4 grid size-[var(--sidebar-item-height)] place-items-center rounded-item text-text-secondary outline-none hover:bg-surface-hover hover:text-text-primary focus-visible:ring-2 focus-visible:ring-focus-ring"
        closeContent={<X aria-hidden="true" className={iconClassName} />}
        title={label}
        titleClassName="pr-20 text-base/6 font-semibold text-text-primary"
      >
        <span aria-hidden="true" className="hidden px-3 pb-2 pt-1 text-xs/4 font-semibold uppercase tracking-wider text-text-secondary group-data-[variant=desktop-collapsed]/sidebar:block">
          {label}
        </span>
        <Sidebar.List className={listClassName}>
          <RouterMenuGroupProvider>{children}</RouterMenuGroupProvider>
        </Sidebar.List>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  )
}
