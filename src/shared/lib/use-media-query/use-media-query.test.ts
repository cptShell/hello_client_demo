import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { MOBILE_MEDIA_QUERY, useMediaQuery } from './use-media-query'

function createMatchMediaMock(initialMatch: boolean) {
  let matches = initialMatch
  const listeners = new Set<EventListenerOrEventListenerObject>()
  const addEventListener = vi.fn(
    (_type: string, listener: EventListenerOrEventListenerObject) => {
      listeners.add(listener)
    },
  )
  const removeEventListener = vi.fn(
    (_type: string, listener: EventListenerOrEventListenerObject) => {
      listeners.delete(listener)
    },
  )
  const mediaQueryList = {
    get matches() {
      return matches
    },
    media: MOBILE_MEDIA_QUERY,
    onchange: null,
    addEventListener,
    removeEventListener,
  } as unknown as MediaQueryList
  const matchMedia = vi.fn(() => mediaQueryList)

  return {
    addEventListener,
    matchMedia,
    removeEventListener,
    setMatches(nextMatch: boolean) {
      matches = nextMatch
      const event = new Event('change')

      for (const listener of listeners) {
        if (typeof listener === 'function') {
          listener(event)
        } else {
          listener.handleEvent(event)
        }
      }
    },
  }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('useMediaQuery', () => {
  it('updates only when the media-query result changes and cleans up', () => {
    const media = createMatchMediaMock(false)
    vi.stubGlobal('matchMedia', media.matchMedia)
    const { result, unmount } = renderHook(() => useMediaQuery())

    expect(result.current).toBe(false)
    expect(media.matchMedia).toHaveBeenCalledWith(MOBILE_MEDIA_QUERY)
    expect(media.addEventListener).toHaveBeenCalledOnce()

    act(() => media.setMatches(true))
    expect(result.current).toBe(true)

    unmount()
    expect(media.removeEventListener).toHaveBeenCalledOnce()
  })

  it('uses a controlled match without subscribing to the viewport', () => {
    const media = createMatchMediaMock(false)
    vi.stubGlobal('matchMedia', media.matchMedia)
    const { result, rerender } = renderHook(
      ({ match }) => useMediaQuery(match),
      { initialProps: { match: true } },
    )

    expect(result.current).toBe(true)
    expect(media.addEventListener).not.toHaveBeenCalled()

    rerender({ match: false })
    expect(result.current).toBe(false)
    expect(media.addEventListener).not.toHaveBeenCalled()
  })
})
