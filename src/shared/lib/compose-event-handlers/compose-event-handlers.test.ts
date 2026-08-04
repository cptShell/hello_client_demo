import { describe, expect, it, vi } from 'vitest'

import { composeEventHandlers } from './compose-event-handlers'

describe('composeEventHandlers', () => {
  it('runs the consumer handler before the internal handler', () => {
    const calls: string[] = []
    const handler = composeEventHandlers<Event>(
      () => calls.push('consumer'),
      () => calls.push('internal'),
    )

    handler(new Event('click', { cancelable: true }))

    expect(calls).toEqual(['consumer', 'internal'])
  })

  it('skips the internal handler when the consumer prevents default', () => {
    const internalHandler = vi.fn()
    const handler = composeEventHandlers<Event>(
      (event) => event.preventDefault(),
      internalHandler,
    )

    handler(new Event('click', { cancelable: true }))

    expect(internalHandler).not.toHaveBeenCalled()
  })
})
