import { Fragment, cloneElement, forwardRef, isValidElement, useEffect } from 'react'
import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  Ref,
} from 'react'

import { composeEventHandlers } from '@/shared/lib/compose-event-handlers'

import { composeRefs } from '../lib/compose-refs'
import {
  useOptionalSidebarGroupContext,
  useSidebarRootContext,
} from '../model/sidebar-context'
import {
  resolveStateClassName,
  type SidebarItemState,
  type StateClassName,
} from '../model/sidebar-types'

type SidebarItemProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'children' | 'className' | 'disabled' | 'onClick' | 'value'
> & {
  asChild?: boolean
  children: ReactNode
  className?: StateClassName<SidebarItemState>
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLElement>
  onSelect?: (value: string) => void
  value: string
}

type SlotChildProps = {
  'aria-disabled'?: boolean | 'true' | 'false'
  className?: string
  onClick?: MouseEventHandler<HTMLElement>
  ref?: Ref<HTMLElement>
  style?: CSSProperties
  tabIndex?: number
}

function joinClassNames(...classNames: Array<string | undefined>) {
  const result = classNames.filter(Boolean).join(' ')
  return result || undefined
}

function getSlotChild(children: ReactNode) {
  if (!isValidElement<SlotChildProps>(children) || children.type === Fragment) {
    throw new Error('Sidebar.Item with asChild requires one valid element')
  }

  return children
}

export const SidebarItem = forwardRef<HTMLElement, SidebarItemProps>(
  function SidebarItem(
    {
      asChild = false,
      children,
      className,
      disabled = false,
      onClick,
      onSelect,
      style,
      value,
      ...interactiveProps
    },
    forwardedRef,
  ) {
    const root = useSidebarRootContext()
    const group = useOptionalSidebarGroupContext()
    const registerItem = root.registerItem
    const active = root.state.value === value
    const state: SidebarItemState = {
      active,
      disabled,
      variant: root.state.variant,
    }
    const stateClassName = resolveStateClassName(className, state)

    useEffect(
      () => registerItem(value, group?.id ?? null),
      [group?.id, registerItem, value],
    )

    const handleSelection = (event: MouseEvent<HTMLElement>) => {
      if (disabled) {
        event.preventDefault()
        return
      }

      root.setValue(value)
      onSelect?.(value)

      if (root.state.variant !== 'desktop-expanded') {
        if (group) {
          group.dismiss()
        } else {
          root.setOpenGroupId(null)
        }
      }
    }

    if (!asChild) {
      return (
        <li>
          <button
            {...interactiveProps}
            aria-current={active ? 'page' : undefined}
            className={stateClassName}
            disabled={disabled}
            onClick={composeEventHandlers(onClick, handleSelection)}
            ref={forwardedRef as Ref<HTMLButtonElement>}
            style={style}
            type="button"
          >
            {children}
          </button>
        </li>
      )
    }

    const child = getSlotChild(children)
    const consumerClick = composeEventHandlers(child.props.onClick, onClick)
    const slottedChild = cloneElement(
      child as ReactElement<SlotChildProps>,
      {
        ...interactiveProps,
        'aria-current': active ? 'page' : undefined,
        'aria-disabled': disabled
          ? true
          : (child.props['aria-disabled'] ??
            interactiveProps['aria-disabled']),
        className: joinClassNames(child.props.className, stateClassName),
        onClick: composeEventHandlers(consumerClick, handleSelection),
        ref: composeRefs(child.props.ref, forwardedRef),
        style: { ...child.props.style, ...style },
        tabIndex: disabled
          ? -1
          : (child.props.tabIndex ?? interactiveProps.tabIndex),
      } as SlotChildProps,
    )

    return <li>{slottedChild}</li>
  },
)
