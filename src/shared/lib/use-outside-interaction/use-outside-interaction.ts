import { useEffect } from 'react'
import type { RefObject } from 'react'

type UseOutsideInteractionOptions = {
  contentRef: RefObject<HTMLElement | null>
  enabled: boolean
  onOutsideInteraction: (event: PointerEvent) => void
  triggerRef: RefObject<HTMLElement | null>
}

export function useOutsideInteraction({
  contentRef,
  enabled,
  onOutsideInteraction,
  triggerRef,
}: UseOutsideInteractionOptions) {
  useEffect(() => {
    if (!enabled) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target

      if (!(target instanceof Node)) {
        return
      }

      if (
        triggerRef.current?.contains(target) ||
        contentRef.current?.contains(target)
      ) {
        return
      }

      onOutsideInteraction(event)
    }

    document.addEventListener('pointerdown', handlePointerDown, true)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true)
    }
  }, [contentRef, enabled, onOutsideInteraction, triggerRef])
}
