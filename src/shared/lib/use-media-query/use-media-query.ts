import { useCallback, useSyncExternalStore } from 'react'

export const MOBILE_MEDIA_QUERY = '(max-width: 767px)'

function canUseMatchMedia() {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
}

function readMobileMatch() {
  return canUseMatchMedia()
    ? window.matchMedia(MOBILE_MEDIA_QUERY).matches
    : false
}

export function useMediaQuery(controlledMatch?: boolean) {
  const subscribe = useCallback(
    (notify: () => void) => {
      if (controlledMatch !== undefined || !canUseMatchMedia()) {
        return () => undefined
      }

      const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY)
      mediaQuery.addEventListener('change', notify)

      return () => {
        mediaQuery.removeEventListener('change', notify)
      }
    },
    [controlledMatch],
  )

  const getSnapshot = useCallback(
    () => controlledMatch ?? readMobileMatch(),
    [controlledMatch],
  )
  const getServerSnapshot = useCallback(
    () => controlledMatch ?? false,
    [controlledMatch],
  )

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
