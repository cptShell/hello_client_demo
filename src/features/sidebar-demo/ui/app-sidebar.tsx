import type { ComponentProps } from 'react'
import {
  CalendarDays,
  ChartPie,
  ChevronDown,
  CircleDollarSign,
  LayoutDashboard,
  Megaphone,
  PackageSearch,
  PanelLeftClose,
  PanelLeftOpen,
  UsersRound,
} from 'lucide-react'

import { Sidebar } from '@/shared/ui/sidebar'
import type {
  SidebarGroupState,
  SidebarItemState,
  SidebarRootState,
} from '@/shared/ui/sidebar'

type SidebarRootProps = ComponentProps<typeof Sidebar.Root>

type AppSidebarProps = Omit<SidebarRootProps, 'children'>

const rootBaseClassName =
  'group/sidebar fixed inset-y-0 left-0 z-[var(--sidebar-z-navigation)] flex flex-col border-r border-border-default bg-surface-navigation p-3 text-text-primary transition-[width] duration-[var(--sidebar-motion-normal)] ease-standard'
const listClassName = 'm-0 list-none space-y-1 p-0'
const iconClassName = 'size-[var(--sidebar-icon-size)] shrink-0'
const navigationLabelClassName =
  'min-w-0 flex-1 truncate text-left group-data-[variant=desktop-collapsed]/sidebar:sr-only'
const submenuLabelClassName = 'min-w-0 flex-1 truncate text-left'
const itemBaseClassName =
  'group flex min-h-[var(--sidebar-item-height)] w-full items-center gap-3 rounded-item px-3 text-sm/5 font-medium no-underline outline-none transition-colors duration-[var(--sidebar-motion-fast)] ease-standard focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-navigation'

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

function getRootClassName(state: SidebarRootState) {
  return joinClassNames(
    rootBaseClassName,
    state.variant === 'desktop-collapsed'
      ? 'w-[var(--sidebar-width-collapsed)] overflow-visible'
      : 'w-[var(--sidebar-width-expanded)] overflow-hidden',
  )
}

function getCollapsedItemLayout(variant: SidebarItemState['variant']) {
  return variant === 'desktop-collapsed'
    ? 'justify-center gap-0 px-0'
    : undefined
}

function getItemClassName({ active, variant }: SidebarItemState) {
  return joinClassNames(
    itemBaseClassName,
    getCollapsedItemLayout(variant),
    active
      ? 'bg-surface-active text-text-active'
      : 'text-text-primary hover:bg-surface-hover',
  )
}

function getGroupClassName({ presentation }: SidebarGroupState) {
  return presentation === 'flyout' ? 'relative' : undefined
}

function getGroupTriggerClassName({
  active,
  open,
  variant,
}: SidebarGroupState) {
  return joinClassNames(
    itemBaseClassName,
    variant === 'desktop-collapsed' ? 'justify-center gap-0 px-0' : undefined,
    active || open
      ? 'bg-surface-active text-text-active'
      : 'text-text-primary hover:bg-surface-hover',
  )
}

function getGroupContentClassName({ presentation }: SidebarGroupState) {
  if (presentation !== 'flyout') {
    return undefined
  }

  return 'absolute left-full top-0 z-[var(--sidebar-z-flyout)] ml-3 w-[var(--sidebar-flyout-width)] rounded-flyout border border-border-default bg-surface-overlay p-2 shadow-flyout'
}

function getSubmenuItemClassName({ active, variant }: SidebarItemState) {
  return joinClassNames(
    itemBaseClassName,
    variant === 'desktop-collapsed'
      ? 'px-3 font-normal'
      : 'pl-10 font-normal',
    active
      ? 'bg-surface-active-strong text-text-active'
      : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
  )
}

function getCollapseTriggerClassName({ variant }: SidebarRootState) {
  return joinClassNames(
    itemBaseClassName,
    'mt-3 border-t border-border-default pt-3 text-text-secondary hover:bg-surface-hover hover:text-text-primary',
    variant === 'desktop-collapsed' ? 'justify-center gap-0 px-0' : undefined,
  )
}

export function AppSidebar({
  'aria-label': ariaLabel = 'Primary',
  className,
  defaultValue = '/products/featured',
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
      <div className="flex min-h-14 items-center gap-3 border-b border-border-default px-3 pb-3 group-data-[variant=desktop-collapsed]/sidebar:justify-center group-data-[variant=desktop-collapsed]/sidebar:px-0">
        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center rounded-item bg-surface-active-strong text-sm font-semibold text-text-active"
        >
          HC
        </span>
        <span className="min-w-0 group-data-[variant=desktop-collapsed]/sidebar:sr-only">
          <span className="block truncate text-base/6 font-semibold">
            HelloClient
          </span>
          <span className="block truncate text-xs/4 text-text-secondary">
            Client workspace
          </span>
        </span>
      </div>

      <Sidebar.List className={joinClassNames(listClassName, 'mt-3 flex-1')}>
        <Sidebar.Item asChild className={getItemClassName} value="/overview">
          <a href="#/overview">
            <LayoutDashboard aria-hidden="true" className={iconClassName} />
            <span className={navigationLabelClassName}>Overview</span>
          </a>
        </Sidebar.Item>

        <Sidebar.Item asChild className={getItemClassName} value="/clients">
          <a href="#/clients">
            <UsersRound aria-hidden="true" className={iconClassName} />
            <span className={navigationLabelClassName}>Clients</span>
          </a>
        </Sidebar.Item>

        <Sidebar.Item asChild className={getItemClassName} value="/calendar">
          <a href="#/calendar">
            <CalendarDays aria-hidden="true" className={iconClassName} />
            <span className={navigationLabelClassName}>Calendar</span>
          </a>
        </Sidebar.Item>

        <Sidebar.Item asChild className={getItemClassName} value="/analytics">
          <a href="#/analytics">
            <ChartPie aria-hidden="true" className={iconClassName} />
            <span className={navigationLabelClassName}>Analytics</span>
          </a>
        </Sidebar.Item>

        <Sidebar.Item asChild className={getItemClassName} value="/campaigns">
          <a href="#/campaigns">
            <Megaphone aria-hidden="true" className={iconClassName} />
            <span className={navigationLabelClassName}>Campaigns</span>
          </a>
        </Sidebar.Item>

        <Sidebar.Group
          className={getGroupClassName}
          entryValue="/products/catalog"
          id="products"
        >
          <Sidebar.GroupTrigger className={getGroupTriggerClassName}>
            <PackageSearch aria-hidden="true" className={iconClassName} />
            <span className={navigationLabelClassName}>Products</span>
            <ChevronDown
              aria-hidden="true"
              className="size-4 shrink-0 transition-transform duration-[var(--sidebar-motion-fast)] group-aria-expanded:rotate-180 group-data-[variant=desktop-collapsed]/sidebar:hidden"
            />
          </Sidebar.GroupTrigger>
          <Sidebar.GroupContent className={getGroupContentClassName}>
            <span
              aria-hidden="true"
              className="hidden px-3 pb-2 pt-1 text-xs/4 font-semibold uppercase tracking-wider text-text-secondary group-data-[variant=desktop-collapsed]/sidebar:block"
            >
              Products
            </span>
            <Sidebar.List className={joinClassNames(listClassName, 'mt-1')}>
              <Sidebar.Item
                asChild
                className={getSubmenuItemClassName}
                value="/products/catalog"
              >
                <a href="#/products/catalog">
                  <span className={submenuLabelClassName}>Catalog</span>
                </a>
              </Sidebar.Item>
              <Sidebar.Item
                asChild
                className={getSubmenuItemClassName}
                value="/products/categories"
              >
                <a href="#/products/categories">
                  <span className={submenuLabelClassName}>Categories</span>
                </a>
              </Sidebar.Item>
              <Sidebar.Item
                asChild
                className={getSubmenuItemClassName}
                value="/products/featured"
              >
                <a href="#/products/featured">
                  <span className={submenuLabelClassName}>
                    Featured products
                  </span>
                </a>
              </Sidebar.Item>
            </Sidebar.List>
          </Sidebar.GroupContent>
        </Sidebar.Group>

        <Sidebar.Item asChild className={getItemClassName} value="/billing">
          <a href="#/billing">
            <CircleDollarSign aria-hidden="true" className={iconClassName} />
            <span className={navigationLabelClassName}>Billing</span>
          </a>
        </Sidebar.Item>
      </Sidebar.List>

      <Sidebar.CollapseTrigger className={getCollapseTriggerClassName}>
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
        <span className={navigationLabelClassName}>Collapse navigation</span>
      </Sidebar.CollapseTrigger>
    </Sidebar.Root>
  )
}
