import { act } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { App } from './app'

const storageValues = new Map<string, string>()

beforeEach(() => {
  storageValues.clear()
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => storageValues.get(key) ?? null,
      setItem: (key: string, value: string) => {
        storageValues.set(key, value)
      },
    },
  })
})

afterEach(() => {
  window.history.replaceState(null, '', '/')
})

describe('App Router integration', () => {
  it('derives the active child and parent from a direct nested route', () => {
    window.history.replaceState(null, '', '/#/inventory/orders')

    render(<App />)

    expect(screen.getByRole('link', { name: 'Orders' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('button', { name: 'Inventory' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })

  it('keeps link selection synchronized with browser history', async () => {
    const user = userEvent.setup()
    window.history.replaceState(null, '', '/#/clients')
    render(<App />)

    await user.click(screen.getByRole('link', { name: 'Tickets' }))

    expect(window.location.hash).toBe('#/tickets')
    expect(screen.getByRole('link', { name: 'Tickets' })).toHaveAttribute(
      'aria-current',
      'page',
    )

    act(() => window.history.back())

    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Clients' })).toHaveAttribute(
        'aria-current',
        'page',
      )
    })

    act(() => window.history.forward())

    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Tickets' })).toHaveAttribute(
        'aria-current',
        'page',
      )
    })
  })

  it('navigates an expanded group trigger to its entry route', async () => {
    const user = userEvent.setup()
    window.history.replaceState(null, '', '/#/clients')
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Inventory' }))

    expect(window.location.hash).toBe('#/inventory/products')
    expect(screen.getByRole('link', { name: 'Products' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('restores only the persisted desktop expanded preference', async () => {
    const user = userEvent.setup()
    window.history.replaceState(null, '', '/#/clients')
    const firstRender = render(<App />)

    await user.click(
      screen.getByRole('button', { name: 'Collapse navigation' }),
    )
    expect(
      window.localStorage.getItem('hello-client.sidebar.expanded'),
    ).toBe('false')

    firstRender.unmount()
    render(<App />)

    expect(
      screen.getByRole('button', { name: 'Expand navigation' }),
    ).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('link', { name: 'Clients' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })
})
