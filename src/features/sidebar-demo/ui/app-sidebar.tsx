import type { ComponentProps, ReactElement, ReactNode } from 'react'
import {
  Archive,
  ChartNoAxesColumn,
  ChevronDown,
  CircleCheckBig,
  CircleHelp,
  CreditCard,
  Flame,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  ShoppingCart,
  Smile,
  TicketCheck,
  X,
} from 'lucide-react'

import { Sidebar } from '@/shared/ui/sidebar'
import type {
  SidebarGroupState,
  SidebarItemState,
  SidebarRootState,
} from '@/shared/ui/sidebar'

type SidebarRootProps = ComponentProps<typeof Sidebar.Root>

export type AppSidebarLinkProps = {
  children: ReactNode
  to: string
}

type AppSidebarProps = Omit<SidebarRootProps, 'children'> & {
  renderLink?: (props: AppSidebarLinkProps) => ReactElement
}

const rootBaseClassName =
  'group/sidebar fixed z-[var(--sidebar-z-navigation)] flex bg-surface-navigation text-text-primary'
const desktopRootClassName =
  'inset-y-0 left-0 flex-col border-r border-border-default p-3 transition-[width] duration-[var(--sidebar-motion-normal)] ease-standard'
const mobileRootClassName =
  'inset-x-0 bottom-0 h-[calc(var(--sidebar-mobile-height)+var(--sidebar-safe-area-bottom))] border-t border-border-default px-2 pb-[var(--sidebar-safe-area-bottom)] pt-1 shadow-bottom-bar'
const listClassName = 'm-0 list-none p-0'
const iconClassName = 'size-[var(--sidebar-icon-size)] shrink-0'
const navigationLabelClassName =
  'min-w-0 flex-1 truncate text-left opacity-100 transition-opacity duration-[var(--sidebar-motion-normal)] ease-standard group-data-[variant=desktop-collapsed]/sidebar:opacity-0 group-data-[variant=mobile]/sidebar:flex-none group-data-[variant=mobile]/sidebar:text-center group-data-[variant=mobile]/sidebar:text-xs/4'
const submenuLabelClassName = 'min-w-0 flex-1 truncate text-left'
const itemBaseClassName =
  'group flex min-h-[var(--sidebar-item-height)] w-full items-center gap-3 overflow-hidden rounded-item px-3 text-sm/5 font-medium no-underline outline-none transition-colors duration-[var(--sidebar-motion-fast)] ease-standard focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-navigation'
const collapseTriggerClassName =
  'mt-3 flex min-h-[var(--sidebar-item-height)] w-full items-center justify-start px-3 text-text-secondary outline-none transition-colors duration-[var(--sidebar-motion-fast)] ease-standard hover:text-text-primary focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-navigation'
const separatorClassName =
  'my-2 border-t border-border-default group-data-[variant=mobile]/sidebar:hidden'

function joinClassNames(...classNames: Array<string | undefined>) {
  const result = classNames.filter(Boolean).join(' ')
  return result || undefined
}

function resolveRootClassName(
  className: SidebarRootProps['className'],
  state: SidebarRootState,
) {
  return typeof className === 'function' ? className(state) : className
}

function getNavigationLink(
  renderLink: AppSidebarProps['renderLink'],
  to: string,
  children: ReactNode,
) {
  return renderLink?.({ children, to }) ?? <a href={`#${to}`}>{children}</a>
}

function getRootClassName(state: SidebarRootState) {
  if (state.variant === 'mobile') {
    return joinClassNames(rootBaseClassName, mobileRootClassName)
  }

  return joinClassNames(
    rootBaseClassName,
    desktopRootClassName,
    state.variant === 'desktop-collapsed'
      ? 'w-[var(--sidebar-width-collapsed)] overflow-visible'
      : 'w-[var(--sidebar-width-expanded)] overflow-hidden',
  )
}

function getItemLayout(variant: SidebarItemState['variant']) {
  if (variant === 'mobile') {
    return 'h-[var(--sidebar-mobile-height)] min-w-[var(--sidebar-mobile-item-width)] flex-col justify-center gap-1 px-2 py-1 text-xs/4'
  }
}

function getItemClassName({ active, variant }: SidebarItemState) {
  return joinClassNames(
    itemBaseClassName,
    getItemLayout(variant),
    active
      ? 'bg-surface-active text-text-active'
      : 'text-text-primary hover:bg-surface-hover',
  )
}

function getGroupClassName({ presentation, variant }: SidebarGroupState) {
  if (presentation === 'flyout') {
    return 'relative'
  }

  return variant === 'mobile' ? 'shrink-0' : undefined
}

function getGroupTriggerClassName({
  active,
  open,
  variant,
}: SidebarGroupState) {
  return joinClassNames(
    itemBaseClassName,
    getItemLayout(variant),
    active || open
      ? 'bg-surface-active text-text-active'
      : 'text-text-primary hover:bg-surface-hover',
  )
}

function getGroupContentClassName({ open, presentation }: SidebarGroupState) {
  if (presentation === 'inline') {
    return joinClassNames(
      'grid overflow-hidden transition-[grid-template-rows,opacity] duration-[var(--sidebar-motion-normal)] ease-standard motion-reduce:transition-none [&>*]:min-h-0 [&>*]:overflow-hidden',
      open
        ? 'grid-rows-[1fr] opacity-100'
        : 'grid-rows-[0fr] opacity-0',
    )
  }

  if (presentation === 'flyout') {
    return 'z-[var(--sidebar-z-flyout)] ml-3 w-[var(--sidebar-flyout-width)] rounded-flyout border border-border-default bg-surface-overlay p-2 shadow-flyout'
  }

  if (presentation === 'bottom-sheet') {
    return 'relative z-[var(--sidebar-z-sheet)] max-h-[var(--sidebar-sheet-max-height)] w-full overflow-y-auto rounded-t-sheet bg-surface-overlay p-6 pb-[calc(1.5rem+var(--sidebar-safe-area-bottom))] shadow-sheet motion-safe:animate-[sidebar-sheet-enter_var(--sidebar-motion-sheet)_var(--sidebar-ease-standard)] before:mx-auto before:mb-4 before:block before:h-1 before:w-[var(--sidebar-sheet-handle-width)] before:rounded-full before:bg-border-default'
  }
}

function getSubmenuItemClassName({ active, variant }: SidebarItemState) {
  return joinClassNames(
    itemBaseClassName,
    variant === 'desktop-collapsed' || variant === 'mobile'
      ? 'px-3 font-normal'
      : 'pl-7 font-normal',
    active
      ? 'bg-surface-active-strong text-text-active'
      : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
  )
}

export function AppSidebar({
  'aria-label': ariaLabel = 'Primary',
  className,
  defaultValue = '/trends',
  renderLink,
  ...rootProps
}: AppSidebarProps) {
  return (
    <Sidebar.Root
      {...rootProps}
      aria-label={ariaLabel}
      className={(state) =>
        joinClassNames(
          getRootClassName(state),
          resolveRootClassName(className, state),
        )
      }
      defaultValue={defaultValue}
    >
      <div className="flex min-h-14 items-center gap-3 overflow-hidden border-b border-border-default px-3 pb-3 group-data-[variant=mobile]/sidebar:hidden">
        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center rounded-item bg-surface-active-strong text-sm font-semibold text-text-active transition-transform duration-[var(--sidebar-motion-normal)] ease-standard group-data-[variant=desktop-collapsed]/sidebar:-translate-x-2"
        >
          HC
        </span>
        <span className="min-w-0 opacity-100 transition-opacity duration-[var(--sidebar-motion-normal)] ease-standard group-data-[variant=desktop-collapsed]/sidebar:opacity-0">
          <span className="block truncate text-base/6 font-semibold">
            HelloClient
          </span>
          <span className="block truncate text-xs/4 text-text-secondary">
            Client workspace
          </span>
        </span>
      </div>

      <Sidebar.List
        className={joinClassNames(
          listClassName,
          'mt-3 min-h-0 flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain group-data-[variant=mobile]/sidebar:mt-0 group-data-[variant=mobile]/sidebar:flex-row group-data-[variant=mobile]/sidebar:overflow-x-auto group-data-[variant=mobile]/sidebar:overflow-y-hidden group-data-[variant=mobile]/sidebar:[&>li]:min-w-[var(--sidebar-mobile-item-width)] group-data-[variant=mobile]/sidebar:[&>li]:flex-1 group-data-[variant=mobile]/sidebar:[&>li]:shrink-0',
        )}
      >
        <Sidebar.Item asChild className={getItemClassName} value="/trends">
          {getNavigationLink(
            renderLink,
            '/trends',
            <>
              <ChartNoAxesColumn
                aria-hidden="true"
                className={iconClassName}
              />
              <span className={navigationLabelClassName}>Trends</span>
            </>,
          )}
        </Sidebar.Item>

        <Sidebar.Item asChild className={getItemClassName} value="/tasks">
          {getNavigationLink(
            renderLink,
            '/tasks',
            <>
              <CircleCheckBig aria-hidden="true" className={iconClassName} />
              <span className={navigationLabelClassName}>Tasks</span>
            </>,
          )}
        </Sidebar.Item>

        <Sidebar.Item asChild className={getItemClassName} value="/tickets">
          {getNavigationLink(
            renderLink,
            '/tickets',
            <>
              <TicketCheck aria-hidden="true" className={iconClassName} />
              <span className={navigationLabelClassName}>Tickets</span>
            </>,
          )}
        </Sidebar.Item>

        <Sidebar.Item asChild className={getItemClassName} value="/payments">
          {getNavigationLink(
            renderLink,
            '/payments',
            <>
              <CreditCard aria-hidden="true" className={iconClassName} />
              <span className={navigationLabelClassName}>Payments</span>
            </>,
          )}
        </Sidebar.Item>

        <Sidebar.Item asChild className={getItemClassName} value="/clients">
          {getNavigationLink(
            renderLink,
            '/clients',
            <>
              <Smile aria-hidden="true" className={iconClassName} />
              <span className={navigationLabelClassName}>Clients</span>
            </>,
          )}
        </Sidebar.Item>

        <Sidebar.Group
          className={getGroupClassName}
          entryValue="/inventory/products"
          id="inventory"
        >
          <Sidebar.GroupTrigger className={getGroupTriggerClassName}>
            <Archive aria-hidden="true" className={iconClassName} />
            <span className={navigationLabelClassName}>Inventory</span>
            <ChevronDown
              aria-hidden="true"
              className="size-4 shrink-0 transition-transform duration-[var(--sidebar-motion-fast)] group-aria-expanded:rotate-180 group-data-[variant=desktop-collapsed]/sidebar:hidden group-data-[variant=mobile]/sidebar:hidden"
            />
          </Sidebar.GroupTrigger>
          <Sidebar.GroupContent
            backdropClassName="fixed inset-0 z-[var(--sidebar-z-scrim)] flex items-end bg-scrim"
            className={getGroupContentClassName}
            closeButtonClassName="absolute right-4 top-4 grid size-[var(--sidebar-item-height)] place-items-center rounded-item text-text-secondary outline-none hover:bg-surface-hover hover:text-text-primary focus-visible:ring-2 focus-visible:ring-focus-ring"
            closeContent={
              <X aria-hidden="true" className={iconClassName} />
            }
            title="Inventory"
            titleClassName="pr-20 text-base/6 font-semibold text-text-primary"
          >
            <span
              aria-hidden="true"
              className="hidden px-3 pb-2 pt-1 text-xs/4 font-semibold uppercase tracking-wider text-text-secondary group-data-[variant=desktop-collapsed]/sidebar:block"
            >
              Inventory
            </span>
            <Sidebar.List
              className={joinClassNames(listClassName, 'mt-1')}
            >
              <Sidebar.Item
                asChild
                className={getSubmenuItemClassName}
                value="/inventory/products"
              >
                {getNavigationLink(
                  renderLink,
                  '/inventory/products',
                  <>
                    <span
                      aria-hidden="true"
                      className="size-1 shrink-0 rounded-full bg-current"
                    />
                    <span className={submenuLabelClassName}>Products</span>
                  </>,
                )}
              </Sidebar.Item>
              <Sidebar.Item
                asChild
                className={getSubmenuItemClassName}
                value="/inventory/orders"
              >
                {getNavigationLink(
                  renderLink,
                  '/inventory/orders',
                  <>
                    <span
                      aria-hidden="true"
                      className="size-1 shrink-0 rounded-full bg-current"
                    />
                    <span className={submenuLabelClassName}>Orders</span>
                  </>,
                )}
              </Sidebar.Item>
              <Sidebar.Item
                asChild
                className={getSubmenuItemClassName}
                value="/inventory/suppliers"
              >
                {getNavigationLink(
                  renderLink,
                  '/inventory/suppliers',
                  <>
                    <span
                      aria-hidden="true"
                      className="size-1 shrink-0 rounded-full bg-current"
                    />
                    <span className={submenuLabelClassName}>Suppliers</span>
                  </>,
                )}
              </Sidebar.Item>
            </Sidebar.List>
          </Sidebar.GroupContent>
        </Sidebar.Group>

        <Sidebar.Item asChild className={getItemClassName} value="/shop">
          {getNavigationLink(
            renderLink,
            '/shop',
            <>
              <ShoppingCart aria-hidden="true" className={iconClassName} />
              <span className={navigationLabelClassName}>Shop</span>
            </>,
          )}
        </Sidebar.Item>

        <Sidebar.Item asChild className={getItemClassName} value="/reports">
          {getNavigationLink(
            renderLink,
            '/reports',
            <>
              <ChartNoAxesColumn
                aria-hidden="true"
                className={iconClassName}
              />
              <span className={navigationLabelClassName}>Reports</span>
            </>,
          )}
        </Sidebar.Item>

        <Sidebar.Item asChild className={getItemClassName} value="/tender">
          {getNavigationLink(
            renderLink,
            '/tender',
            <>
              <Flame aria-hidden="true" className={iconClassName} />
              <span className={navigationLabelClassName}>Tender</span>
            </>,
          )}
        </Sidebar.Item>

        <Sidebar.Separator className={separatorClassName} />

        <Sidebar.Item asChild className={getItemClassName} value="/settings">
          {getNavigationLink(
            renderLink,
            '/settings',
            <>
              <Settings aria-hidden="true" className={iconClassName} />
              <span className={navigationLabelClassName}>Settings</span>
            </>,
          )}
        </Sidebar.Item>

        <Sidebar.Item
          asChild
          className={getItemClassName}
          value="/knowledge-base"
        >
          {getNavigationLink(
            renderLink,
            '/knowledge-base',
            <>
              <CircleHelp aria-hidden="true" className={iconClassName} />
              <span className={navigationLabelClassName}>Knowledge Base</span>
            </>,
          )}
        </Sidebar.Item>
      </Sidebar.List>

      <Sidebar.CollapseTrigger className={collapseTriggerClassName}>
        <PanelLeftClose
          aria-hidden="true"
          className={joinClassNames(
            iconClassName,
            'group-data-[variant=desktop-collapsed]/sidebar:hidden',
          )}
        />
        <PanelLeftOpen
          aria-hidden="true"
          className={joinClassNames(
            iconClassName,
            'hidden group-data-[variant=desktop-collapsed]/sidebar:block',
          )}
        />
        <span className="sr-only">Collapse navigation</span>
      </Sidebar.CollapseTrigger>
    </Sidebar.Root>
  )
}
