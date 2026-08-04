import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mediaState = vi.hoisted(() => ({ matches: false }))

vi.mock('@/shared/lib/use-media-query', () => ({
  useMediaQuery: () => mediaState.matches,
}))

import { Sidebar } from './index'

beforeEach(() => {
  mediaState.matches = false
})

describe('Sidebar.Root', () => {
  it('toggles uncontrolled expanded state through CollapseTrigger', async () => {
    const user = userEvent.setup()
    const onExpandedChange = vi.fn()
    render(
      <Sidebar.Root
        aria-label="Primary"
        onExpandedChange={onExpandedChange}
      >
        <Sidebar.CollapseTrigger />
      </Sidebar.Root>,
    )

    const navigation = screen.getByRole('navigation', { name: 'Primary' })
    expect(navigation).toHaveAttribute('data-variant', 'desktop-expanded')

    await user.click(
      screen.getByRole('button', { name: 'Collapse navigation' }),
    )

    expect(navigation).toHaveAttribute('data-variant', 'desktop-collapsed')
    expect(onExpandedChange).toHaveBeenCalledExactlyOnceWith(false)
    expect(
      screen.getByRole('button', { name: 'Expand navigation' }),
    ).toHaveAttribute('aria-expanded', 'false')
  })

  it('requests a controlled change without mutating the supplied state', async () => {
    const user = userEvent.setup()
    const onExpandedChange = vi.fn()
    render(
      <Sidebar.Root
        aria-label="Primary"
        expanded
        onExpandedChange={onExpandedChange}
      >
        <Sidebar.CollapseTrigger />
      </Sidebar.Root>,
    )

    await user.click(
      screen.getByRole('button', { name: 'Collapse navigation' }),
    )

    expect(onExpandedChange).toHaveBeenCalledExactlyOnceWith(false)
    expect(screen.getByRole('navigation')).toHaveAttribute(
      'data-variant',
      'desktop-expanded',
    )
  })

  it('removes CollapseTrigger on mobile without resetting expanded state', () => {
    const onExpandedChange = vi.fn()
    mediaState.matches = true
    const { rerender } = render(
      <Sidebar.Root
        aria-label="Primary"
        expanded={false}
        onExpandedChange={onExpandedChange}
      >
        <Sidebar.CollapseTrigger />
      </Sidebar.Root>,
    )

    expect(screen.getByRole('navigation')).toHaveAttribute(
      'data-variant',
      'mobile',
    )
    expect(screen.queryByRole('button')).not.toBeInTheDocument()

    mediaState.matches = false
    rerender(
      <Sidebar.Root
        aria-label="Primary"
        expanded={false}
        onExpandedChange={onExpandedChange}
      >
        <Sidebar.CollapseTrigger />
      </Sidebar.Root>,
    )

    expect(screen.getByRole('navigation')).toHaveAttribute(
      'data-variant',
      'desktop-collapsed',
    )
    expect(
      screen.getByRole('button', { name: 'Expand navigation' }),
    ).toBeInTheDocument()
    expect(onExpandedChange).not.toHaveBeenCalled()
  })

  it('closes an open group when the viewport variant changes', () => {
    const onOpenGroupChange = vi.fn()
    const { rerender } = render(
      <Sidebar.Root
        aria-label="Primary"
        defaultOpenGroupId="clients"
        onOpenGroupChange={onOpenGroupChange}
      >
        <Sidebar.List>
          <Sidebar.Group id="clients">
            <Sidebar.GroupTrigger>Clients</Sidebar.GroupTrigger>
            <Sidebar.GroupContent>Client links</Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.List>
      </Sidebar.Root>,
    )

    expect(screen.getByRole('button', { name: 'Clients' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )

    mediaState.matches = true
    rerender(
      <Sidebar.Root
        aria-label="Primary"
        defaultOpenGroupId="clients"
        onOpenGroupChange={onOpenGroupChange}
      >
        <Sidebar.List>
          <Sidebar.Group id="clients">
            <Sidebar.GroupTrigger>Clients</Sidebar.GroupTrigger>
            <Sidebar.GroupContent>Client links</Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.List>
      </Sidebar.Root>,
    )

    expect(screen.getByRole('navigation')).toHaveAttribute(
      'data-variant',
      'mobile',
    )
    expect(screen.getByRole('button', { name: 'Clients' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
    expect(onOpenGroupChange).toHaveBeenCalledExactlyOnceWith(null)
  })
})
