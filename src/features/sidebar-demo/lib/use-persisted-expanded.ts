import { useCallback, useState } from 'react'

const SIDEBAR_EXPANDED_STORAGE_KEY = 'hello-client.sidebar.expanded'

function readPersistedExpanded() {
  try {
    const storedValue = window.localStorage.getItem(
      SIDEBAR_EXPANDED_STORAGE_KEY,
    )

    if (storedValue === 'false') {
      return false
    }

    return true
  } catch {
    return true
  }
}

export function usePersistedExpanded() {
  const [expanded, setExpanded] = useState(readPersistedExpanded)

  const updateExpanded = useCallback((nextExpanded: boolean) => {
    setExpanded(nextExpanded)

    try {
      window.localStorage.setItem(
        SIDEBAR_EXPANDED_STORAGE_KEY,
        String(nextExpanded),
      )
    } catch {
      // Storage may be unavailable; the in-memory preference still works.
    }
  }, [])

  return [expanded, updateExpanded] as const
}
