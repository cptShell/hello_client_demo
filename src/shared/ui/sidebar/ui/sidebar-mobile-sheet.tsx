import { useEffect, useId, useRef } from 'react'
import type {
  ComponentPropsWithoutRef,
  KeyboardEvent,
  PointerEvent,
  ReactNode,
  Ref,
  RefObject,
} from 'react'
import { createPortal } from 'react-dom'

import { composeEventHandlers } from '@/shared/lib/compose-event-handlers'
import { useFocusTrap } from '@/shared/lib/use-focus-trap'

type SidebarMobileSheetProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'title'
> & {
  backdropClassName?: string
  closeButtonClassName?: string
  closeContent?: ReactNode
  contentRef: RefObject<HTMLDivElement | null>
  dialogRef: Ref<HTMLDivElement>
  onDismiss: () => void
  title?: ReactNode
  titleClassName?: string
  triggerId: string
}

export function SidebarMobileSheet({
  backdropClassName,
  children,
  closeButtonClassName,
  closeContent = 'Close',
  contentRef,
  dialogRef,
  onDismiss,
  onKeyDown,
  title,
  titleClassName,
  triggerId,
  ...dialogProps
}: SidebarMobileSheetProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  useFocusTrap({
    active: true,
    containerRef: contentRef,
    initialFocusRef: closeButtonRef,
  })

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  const handleBackdropPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onDismiss()
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Escape') {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    onDismiss()
  }

  if (typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div
      className={backdropClassName}
      onPointerDown={handleBackdropPointerDown}
    >
      <div
        {...dialogProps}
        aria-labelledby={title === undefined ? triggerId : titleId}
        aria-modal="true"
        onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
        ref={dialogRef}
        role="dialog"
      >
        <button
          aria-label="Close menu"
          className={closeButtonClassName}
          onClick={onDismiss}
          ref={closeButtonRef}
          type="button"
        >
          {closeContent}
        </button>
        {title === undefined ? null : (
          <h2 className={titleClassName} id={titleId}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>,
    document.body,
  )
}
