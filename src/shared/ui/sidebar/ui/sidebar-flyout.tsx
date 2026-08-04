import { useLayoutEffect } from 'react'
import type {
  ComponentPropsWithoutRef,
  Ref,
  RefObject,
} from 'react'
import { createPortal } from 'react-dom'

type SidebarFlyoutProps = ComponentPropsWithoutRef<'div'> & {
  contentRef: RefObject<HTMLDivElement | null>
  flyoutRef: Ref<HTMLDivElement>
  triggerRef: RefObject<HTMLButtonElement | null>
}

const VIEWPORT_EDGE_GAP = 8

export function SidebarFlyout({
  children,
  contentRef,
  flyoutRef,
  style,
  triggerRef,
  ...contentProps
}: SidebarFlyoutProps) {
  useLayoutEffect(() => {
    const updatePosition = () => {
      const content = contentRef.current
      const trigger = triggerRef.current

      if (!content || !trigger) {
        return
      }

      const triggerRect = trigger.getBoundingClientRect()
      const navigationRight =
        trigger.closest('nav')?.getBoundingClientRect().right ??
        triggerRect.right
      const maximumTop = window.innerHeight - content.offsetHeight - VIEWPORT_EDGE_GAP
      const top = Math.max(
        VIEWPORT_EDGE_GAP,
        Math.min(triggerRect.top, maximumTop),
      )

      content.style.left = `${navigationRight}px`
      content.style.top = `${top}px`
      content.style.visibility = 'visible'
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [contentRef, triggerRef])

  if (typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div
      {...contentProps}
      ref={flyoutRef}
      style={{ ...style, position: 'fixed', visibility: 'hidden' }}
    >
      {children}
    </div>,
    document.body,
  )
}
