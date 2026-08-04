import { fireEvent, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useOutsideInteraction } from './use-outside-interaction'

describe('useOutsideInteraction', () => {
  it('ignores trigger and portal content, then cleans up when disabled', () => {
    const trigger = document.createElement('button')
    const triggerChild = document.createElement('span')
    const portalContent = document.createElement('div')
    const portalChild = document.createElement('button')
    const outside = document.createElement('button')

    trigger.append(triggerChild)
    portalContent.append(portalChild)
    document.body.append(trigger, portalContent, outside)

    const onOutsideInteraction = vi.fn()
    const triggerRef = { current: trigger }
    const contentRef = { current: portalContent }
    const { rerender, unmount } = renderHook(
      ({ enabled }) =>
        useOutsideInteraction({
          contentRef,
          enabled,
          onOutsideInteraction,
          triggerRef,
        }),
      { initialProps: { enabled: true } },
    )

    fireEvent.pointerDown(triggerChild)
    fireEvent.pointerDown(portalChild)
    expect(onOutsideInteraction).not.toHaveBeenCalled()

    fireEvent.pointerDown(outside)
    expect(onOutsideInteraction).toHaveBeenCalledOnce()

    rerender({ enabled: false })
    fireEvent.pointerDown(outside)
    expect(onOutsideInteraction).toHaveBeenCalledOnce()

    unmount()
    trigger.remove()
    portalContent.remove()
    outside.remove()
  })
})
