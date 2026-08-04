import { fireEvent, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useFocusTrap } from './use-focus-trap'

describe('useFocusTrap', () => {
  it('focuses the preferred target, cycles Tab, and restores focus', () => {
    const opener = document.createElement('button')
    const container = document.createElement('div')
    const first = document.createElement('button')
    const preferred = document.createElement('button')
    const last = document.createElement('a')

    last.href = '#target'
    container.append(first, preferred, last)
    document.body.append(opener, container)
    opener.focus()

    const containerRef = { current: container }
    const initialFocusRef = { current: preferred }
    const { rerender, unmount } = renderHook(
      ({ active }) =>
        useFocusTrap({ active, containerRef, initialFocusRef }),
      { initialProps: { active: false } },
    )

    rerender({ active: true })
    expect(preferred).toHaveFocus()

    last.focus()
    fireEvent.keyDown(document, { key: 'Tab' })
    expect(first).toHaveFocus()

    first.focus()
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
    expect(last).toHaveFocus()

    rerender({ active: false })
    expect(opener).toHaveFocus()

    unmount()
    opener.remove()
    container.remove()
  })
})
