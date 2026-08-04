export type SidebarVariant =
  | 'desktop-expanded'
  | 'desktop-collapsed'
  | 'mobile'

export type SidebarPresentation = 'inline' | 'flyout' | 'bottom-sheet'

export type SidebarRootState = {
  activeParentId: string | null
  expanded: boolean
  openGroupId: string | null
  value: string
  variant: SidebarVariant
}

export type SidebarItemState = {
  active: boolean
  disabled: boolean
  variant: SidebarVariant
}

export type SidebarGroupState = {
  active: boolean
  open: boolean
  presentation: SidebarPresentation
  variant: SidebarVariant
}

export type StateClassName<State> =
  | string
  | ((state: State) => string | undefined)

export function resolveStateClassName<State>(
  className: StateClassName<State> | undefined,
  state: State,
) {
  return typeof className === 'function' ? className(state) : className
}

export function getSidebarPresentation(
  variant: SidebarVariant,
): SidebarPresentation {
  if (variant === 'desktop-expanded') {
    return 'inline'
  }

  if (variant === 'desktop-collapsed') {
    return 'flyout'
  }

  return 'bottom-sheet'
}
