import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Sidebar } from './index'

describe('Sidebar.Item', () => {
  it('does not mutate a controlled value after selection', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Sidebar.Root
        aria-label="Primary"
        onValueChange={onValueChange}
        value="overview"
      >
        <Sidebar.List>
          <Sidebar.Item value="overview">Overview</Sidebar.Item>
          <Sidebar.Item value="clients">Clients</Sidebar.Item>
        </Sidebar.List>
      </Sidebar.Root>,
    )

    await user.click(screen.getByRole('button', { name: 'Clients' }))

    expect(onValueChange).toHaveBeenCalledExactlyOnceWith('clients')
    expect(screen.getByRole('button', { name: 'Overview' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('button', { name: 'Clients' })).not.toHaveAttribute(
      'aria-current',
    )
  })

  it('respects preventDefault before internal selection', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const onValueChange = vi.fn()
    render(
      <Sidebar.Root aria-label="Primary" onValueChange={onValueChange}>
        <Sidebar.List>
          <Sidebar.Item
            onClick={(event) => event.preventDefault()}
            onSelect={onSelect}
            value="clients"
          >
            Clients
          </Sidebar.Item>
        </Sidebar.List>
      </Sidebar.Root>,
    )

    await user.click(screen.getByRole('button', { name: 'Clients' }))

    expect(onValueChange).not.toHaveBeenCalled()
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('merges an asChild anchor class and refs without wrapping a button', () => {
    const itemRef = createRef<HTMLElement>()
    const anchorRef = createRef<HTMLAnchorElement>()
    render(
      <Sidebar.Root aria-label="Primary" defaultValue="clients">
        <Sidebar.List>
          <Sidebar.Item
            asChild
            className={({ active }) => (active ? 'state-active' : undefined)}
            ref={itemRef}
            value="clients"
          >
            <a className="consumer-class" href="#clients" ref={anchorRef}>
              Clients
            </a>
          </Sidebar.Item>
        </Sidebar.List>
      </Sidebar.Root>,
    )

    const link = screen.getByRole('link', { name: 'Clients' })
    expect(link).toHaveClass('consumer-class', 'state-active')
    expect(link).toHaveAttribute('aria-current', 'page')
    expect(itemRef.current).toBe(link)
    expect(anchorRef.current).toBe(link)
    expect(link.closest('button')).toBeNull()
  })

  it('blocks a disabled asChild anchor', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Sidebar.Root aria-label="Primary" onValueChange={onValueChange}>
        <Sidebar.List>
          <Sidebar.Item asChild disabled value="clients">
            <a href="#clients">Clients</a>
          </Sidebar.Item>
        </Sidebar.List>
      </Sidebar.Root>,
    )

    const link = screen.getByRole('link', { name: 'Clients' })
    expect(link).toHaveAttribute('aria-disabled', 'true')
    expect(link).toHaveAttribute('tabindex', '-1')

    await user.click(link)
    expect(onValueChange).not.toHaveBeenCalled()
    expect(window.location.hash).not.toBe('#clients')
  })
})
