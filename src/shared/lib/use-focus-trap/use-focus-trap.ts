import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

type UseFocusTrapOptions = {
  active: boolean
  containerRef: RefObject<HTMLElement | null>
  initialFocusRef?: RefObject<HTMLElement | null>
}

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter(
    (element) =>
      !element.hidden &&
      element.getAttribute('aria-disabled') !== 'true' &&
      element.tabIndex >= 0,
  )
}

export function useFocusTrap({
  active,
  containerRef,
  initialFocusRef,
}: UseFocusTrapOptions) {
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!active || !containerRef.current) {
      return
    }

    const container = containerRef.current
    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    const focusableElements = getFocusableElements(container)
    const requestedInitialFocus = initialFocusRef?.current
    const initialFocus =
      requestedInitialFocus && focusableElements.includes(requestedInitialFocus)
        ? requestedInitialFocus
        : focusableElements[0]

    initialFocus?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return
      }

      const focusableElements = getFocusableElements(container)

      if (focusableElements.length === 0) {
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements.at(-1)
      const currentIndex = focusableElements.indexOf(
        document.activeElement as HTMLElement,
      )

      if (event.shiftKey && currentIndex <= 0) {
        event.preventDefault()
        lastElement?.focus()
      } else if (
        !event.shiftKey &&
        (currentIndex === -1 || currentIndex === focusableElements.length - 1)
      ) {
        event.preventDefault()
        firstElement?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)

      const focusTarget = previouslyFocusedRef.current

      if (focusTarget?.isConnected) {
        focusTarget.focus()
      }

      previouslyFocusedRef.current = null
    }
  }, [active, containerRef, initialFocusRef])
}
