import type {
  SidebarGroupState,
  SidebarItemState,
  SidebarRootState,
} from '@/shared/ui/sidebar'

export const iconClassName = 'size-[var(--sidebar-icon-size)] shrink-0'
export const listClassName =
  'm-0 list-none p-0 mt-3 min-h-0 flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain group-data-[variant=mobile]/sidebar:mt-0 group-data-[variant=mobile]/sidebar:flex-row group-data-[variant=mobile]/sidebar:overflow-x-auto group-data-[variant=mobile]/sidebar:overflow-y-hidden group-data-[variant=mobile]/sidebar:[&>li]:min-w-[var(--sidebar-mobile-item-width)] group-data-[variant=mobile]/sidebar:[&>li]:flex-1 group-data-[variant=mobile]/sidebar:[&>li]:shrink-0'
const itemBase =
  'group flex min-h-[var(--sidebar-item-height)] w-full items-center gap-3 overflow-hidden rounded-item px-3 text-sm/5 font-medium no-underline outline-none transition-colors duration-[var(--sidebar-motion-fast)] ease-standard focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-navigation'

export function rootClassName(state: SidebarRootState, extra?: string) {
  const layout =
    state.variant === 'mobile'
      ? 'inset-x-0 bottom-0 h-[calc(var(--sidebar-mobile-height)+var(--sidebar-safe-area-bottom))] border-t border-border-default px-2 pb-[var(--sidebar-safe-area-bottom)] pt-1 shadow-bottom-bar'
      : `inset-y-0 left-0 flex-col border-r border-border-default p-3 transition-[width] duration-[var(--sidebar-motion-normal)] ease-standard ${state.variant === 'desktop-collapsed' ? 'w-[var(--sidebar-width-collapsed)] overflow-visible' : 'w-[var(--sidebar-width-expanded)] overflow-hidden'}`
  return [
    'group/sidebar peer/sidebar fixed z-[var(--sidebar-z-navigation)] flex bg-surface-navigation text-text-primary',
    layout,
    extra,
  ].filter(Boolean).join(' ')
}

export function itemClassName({ active, variant }: SidebarItemState) {
  const mobile =
    variant === 'mobile'
      ? 'h-[var(--sidebar-mobile-height)] min-w-[var(--sidebar-mobile-item-width)] flex-col justify-center gap-1 px-2 py-1 text-xs/4'
      : undefined
  return [itemBase, mobile, active ? 'bg-surface-active text-text-active' : 'text-text-primary hover:bg-surface-hover'].filter(Boolean).join(' ')
}

export function groupClassName({ presentation, variant }: SidebarGroupState) {
  if (presentation === 'flyout') return 'relative'
  return variant === 'mobile' ? 'shrink-0' : undefined
}

export function groupTriggerClassName(state: SidebarGroupState) {
  return [itemClassName({ active: state.active || state.open, disabled: false, variant: state.variant })].join(' ')
}

export function groupContentClassName({ open, presentation }: SidebarGroupState) {
  if (presentation === 'inline') {
    return `grid overflow-hidden transition-[grid-template-rows,opacity] duration-[var(--sidebar-motion-normal)] ease-standard motion-reduce:transition-none [&>*]:min-h-0 [&>*]:overflow-hidden ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`
  }
  if (presentation === 'flyout') return 'z-[var(--sidebar-z-flyout)] ml-3 w-[var(--sidebar-flyout-width)] rounded-flyout border border-border-default bg-surface-overlay p-2 shadow-flyout'
  return 'relative z-[var(--sidebar-z-sheet)] max-h-[var(--sidebar-sheet-max-height)] w-full overflow-y-auto rounded-t-sheet bg-surface-overlay p-6 pb-[calc(1.5rem+var(--sidebar-safe-area-bottom))] shadow-sheet motion-safe:animate-[sidebar-sheet-enter_var(--sidebar-motion-sheet)_var(--sidebar-ease-standard)] before:mx-auto before:mb-4 before:block before:h-1 before:w-[var(--sidebar-sheet-handle-width)] before:rounded-full before:bg-border-default'
}

export const navigationLabelClassName = 'min-w-0 flex-1 truncate text-left opacity-100 transition-opacity duration-[var(--sidebar-motion-normal)] ease-standard group-data-[variant=desktop-collapsed]/sidebar:opacity-0 group-data-[variant=mobile]/sidebar:flex-none group-data-[variant=mobile]/sidebar:text-center group-data-[variant=mobile]/sidebar:text-xs/4'
export const submenuLabelClassName = 'min-w-0 flex-1 truncate text-left'
export const separatorClassName = 'my-2 border-t border-border-default group-data-[variant=mobile]/sidebar:hidden'
export const collapseTriggerClassName = 'mt-3 flex min-h-[var(--sidebar-item-height)] w-full items-center justify-start px-3 text-text-secondary outline-none transition-colors duration-[var(--sidebar-motion-fast)] ease-standard hover:text-text-primary focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-navigation'
