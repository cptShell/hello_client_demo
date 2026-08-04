import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type {
  ComponentPropsWithoutRef,
  FocusEvent,
  KeyboardEvent,
} from 'react'

import { composeEventHandlers } from '@/shared/lib/compose-event-handlers'
import { useOutsideInteraction } from '@/shared/lib/use-outside-interaction'

import { SidebarGroupProvider, useSidebarRootContext } from '../model/sidebar-context'
import {
  getSidebarPresentation,
  resolveStateClassName,
  type SidebarGroupState,
  type StateClassName,
} from '../model/sidebar-types'

type SidebarGroupProps = Omit<
  ComponentPropsWithoutRef<'li'>,
  'className' | 'id'
> & {
  className?: StateClassName<SidebarGroupState>
  entryValue?: string
  id: string
}

const FLYOUT_POINTER_GRACE_MS = 100

export const SidebarGroup = forwardRef<HTMLLIElement, SidebarGroupProps>(
  function SidebarGroup(
    {
      children,
      className,
      entryValue,
      id,
      onBlurCapture,
      onFocusCapture,
      onKeyDown,
      onPointerDownCapture,
      onPointerEnter,
      onPointerLeave,
      ...groupProps
    },
    forwardedRef,
  ) {
    const root = useSidebarRootContext()
    const registerGroup = root.registerGroup
    const contentRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const pointerGraceTimerRef = useRef<ReturnType<typeof setTimeout>>(null)
    const suppressFocusOpenRef = useRef(false)
    const [focusWithin, setFocusWithin] = useState(false)
    const [pointerWithin, setPointerWithin] = useState(false)
    const [transientDismissed, setTransientDismissed] = useState(false)
    const active = root.state.activeParentId === id
    const explicitlyOpen = root.state.openGroupId === id
    const expanded = root.state.variant === 'desktop-expanded'
    const collapsed = root.state.variant === 'desktop-collapsed'
    const transientlyOpen =
      collapsed &&
      !transientDismissed &&
      (focusWithin || pointerWithin)
    const state = useMemo<SidebarGroupState>(
      () => ({
        active,
        open: explicitlyOpen || transientlyOpen || (expanded && active),
        presentation: getSidebarPresentation(root.state.variant),
        variant: root.state.variant,
      }),
      [
        active,
        expanded,
        explicitlyOpen,
        root.state.variant,
        transientlyOpen,
      ],
    )
    const triggerId = `sidebar-group-${id}-trigger`
    const contentId = `sidebar-group-${id}-content`
    useEffect(() => registerGroup(id), [id, registerGroup])

    const clearPointerGraceTimer = useCallback(() => {
      if (pointerGraceTimerRef.current === null) {
        return
      }

      clearTimeout(pointerGraceTimerRef.current)
      pointerGraceTimerRef.current = null
    }, [])

    useEffect(() => {
      clearPointerGraceTimer()
      setFocusWithin(false)
      setPointerWithin(false)
      setTransientDismissed(false)
    }, [clearPointerGraceTimer, root.state.variant])

    useEffect(() => clearPointerGraceTimer, [clearPointerGraceTimer])

    const activateTrigger = useCallback(() => {
      if (expanded && entryValue !== undefined) {
        root.setOpenGroupId(null)
        root.setValue(entryValue)
        return
      }

      if (explicitlyOpen) {
        setTransientDismissed(true)
        root.setOpenGroupId(null)
        return
      }

      setTransientDismissed(false)
      root.setOpenGroupId(id)
    }, [entryValue, expanded, explicitlyOpen, id, root])

    const closeFlyoutWithoutFocusRestore = useCallback(() => {
      setTransientDismissed(true)
      setFocusWithin(false)
      setPointerWithin(false)
      root.setOpenGroupId(null)
    }, [root])

    useOutsideInteraction({
      contentRef,
      enabled: collapsed && state.open,
      onOutsideInteraction: closeFlyoutWithoutFocusRestore,
      triggerRef,
    })

    const contextValue = useMemo(
      () => ({
        activateTrigger,
        contentId,
        contentRef,
        dismiss: closeFlyoutWithoutFocusRestore,
        entryValue,
        explicitlyOpen,
        id,
        state,
        triggerId,
        triggerRef,
      }),
      [
        activateTrigger,
        closeFlyoutWithoutFocusRestore,
        contentId,
        entryValue,
        explicitlyOpen,
        id,
        state,
        triggerId,
      ],
    )

    const handlePointerDownCapture = () => {
      if (collapsed) {
        suppressFocusOpenRef.current = true
        queueMicrotask(() => {
          suppressFocusOpenRef.current = false
        })
      }
    }

    const handlePointerEnter = () => {
      if (!collapsed) {
        return
      }

      clearPointerGraceTimer()
      setPointerWithin(true)
    }

    const handlePointerLeave = () => {
      if (!collapsed) {
        return
      }

      clearPointerGraceTimer()
      pointerGraceTimerRef.current = setTimeout(() => {
        pointerGraceTimerRef.current = null
        setPointerWithin(false)

        if (!focusWithin && !explicitlyOpen) {
          setTransientDismissed(false)
        }
      }, FLYOUT_POINTER_GRACE_MS)
    }

    const handleFocusCapture = (event: FocusEvent<HTMLLIElement>) => {
      if (!collapsed) {
        return
      }

      const previousTarget = event.relatedTarget
      const enteredGroup =
        !(previousTarget instanceof Node) ||
        !event.currentTarget.contains(previousTarget)

      if (!enteredGroup) {
        return
      }

      if (suppressFocusOpenRef.current) {
        suppressFocusOpenRef.current = false
        return
      }

      clearPointerGraceTimer()
      setTransientDismissed(false)
      setFocusWithin(true)
    }

    const handleBlurCapture = (event: FocusEvent<HTMLLIElement>) => {
      if (!collapsed) {
        return
      }

      const nextTarget = event.relatedTarget

      if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) {
        return
      }

      setFocusWithin(false)

      if (!pointerWithin && !explicitlyOpen) {
        setTransientDismissed(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
      if (event.key !== 'Escape') {
        return
      }

      const closesExpandedGroup = expanded && !active && explicitlyOpen
      const closesCollapsedFlyout = collapsed && state.open

      if (!closesExpandedGroup && !closesCollapsedFlyout) {
        return
      }

      event.preventDefault()
      event.stopPropagation()
      setTransientDismissed(true)
      setFocusWithin(false)
      setPointerWithin(false)
      root.setOpenGroupId(null)
      triggerRef.current?.focus()
    }

    return (
      <SidebarGroupProvider value={contextValue}>
        <li
          {...groupProps}
          className={resolveStateClassName(className, state)}
          id={`sidebar-group-${id}`}
          onBlurCapture={composeEventHandlers(onBlurCapture, handleBlurCapture)}
          onFocusCapture={composeEventHandlers(
            onFocusCapture,
            handleFocusCapture,
          )}
          onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
          onPointerDownCapture={composeEventHandlers(
            onPointerDownCapture,
            handlePointerDownCapture,
          )}
          onPointerEnter={composeEventHandlers(
            onPointerEnter,
            handlePointerEnter,
          )}
          onPointerLeave={composeEventHandlers(
            onPointerLeave,
            handlePointerLeave,
          )}
          ref={forwardedRef}
        >
          {children}
        </li>
      </SidebarGroupProvider>
    )
  },
)
