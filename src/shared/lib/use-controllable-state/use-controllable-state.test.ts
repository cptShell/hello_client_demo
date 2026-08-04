import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useControllableState } from './use-controllable-state'

describe('useControllableState', () => {
  it('updates uncontrolled state and emits only actual changes', () => {
    const onChange = vi.fn()
    const { result, rerender } = renderHook(
      ({ defaultValue }) =>
        useControllableState({ defaultValue, onChange }),
      { initialProps: { defaultValue: 1 } },
    )

    act(() => result.current[1](1))
    expect(onChange).not.toHaveBeenCalled()

    act(() => result.current[1]((currentValue) => currentValue + 1))
    expect(result.current[0]).toBe(2)
    expect(onChange).toHaveBeenCalledExactlyOnceWith(2)

    act(() => {
      result.current[1]((currentValue) => currentValue + 1)
      result.current[1]((currentValue) => currentValue + 1)
    })
    expect(result.current[0]).toBe(4)
    expect(onChange).toHaveBeenNthCalledWith(2, 4)

    rerender({ defaultValue: 10 })
    expect(result.current[0]).toBe(4)
  })

  it('requests controlled changes without mutating the supplied value', () => {
    const onChange = vi.fn()
    const { result, rerender } = renderHook(
      ({ value }) =>
        useControllableState({ defaultValue: 0, onChange, value }),
      { initialProps: { value: 1 } },
    )

    act(() => result.current[1](2))
    expect(result.current[0]).toBe(1)
    expect(onChange).toHaveBeenCalledExactlyOnceWith(2)

    rerender({ value: 2 })
    act(() => result.current[1](2))
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
