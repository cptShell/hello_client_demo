import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Sidebar } from './index'

afterEach(() => {
  vi.useRealTimers()
})

function GroupFixture({ showChild = true }: { showChild?: boolean }) {
  return (
    <Sidebar.Root aria-label="Primary" defaultValue="clients-list">
      <Sidebar.List>
        <Sidebar.Group id="clients">
          <Sidebar.GroupTrigger>Clients</Sidebar.GroupTrigger>
          <Sidebar.GroupContent>
            <Sidebar.List>
              {showChild ? (
                <Sidebar.Item value="clients-list">Client list</Sidebar.Item>
              ) : null}
            </Sidebar.List>
          </Sidebar.GroupContent>
        </Sidebar.Group>
      </Sidebar.List>
    </Sidebar.Root>
  )
}

describe('Sidebar.Group', () => {
  it('derives an active parent and cleans the registration after unmount', () => {
    const { rerender } = render(<GroupFixture />)
    const trigger = screen.getByRole('button', { name: 'Clients' })

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByLabelText('Clients')).toBeVisible()

    rerender(<GroupFixture showChild={false} />)

    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByLabelText('Clients')).toHaveAttribute(
      'aria-hidden',
      'true',
    )
  })

  it('keeps an active collapsed group closed until explicitly opened', async () => {
    const user = userEvent.setup()
    render(
      <Sidebar.Root
        aria-label="Primary"
        defaultExpanded={false}
        defaultValue="clients-list"
      >
        <Sidebar.List>
          <Sidebar.Group id="clients">
            <Sidebar.GroupTrigger>Clients</Sidebar.GroupTrigger>
            <Sidebar.GroupContent
              className={({ presentation }) => presentation}
            >
              <Sidebar.List>
                <Sidebar.Item value="clients-list">Client list</Sidebar.Item>
              </Sidebar.List>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.List>
      </Sidebar.Root>,
    )

    const trigger = screen.getByRole('button', { name: 'Clients' })
    const content = screen.getByLabelText('Clients')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(content).not.toBeVisible()
    expect(content).toHaveClass('flyout')

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByLabelText('Clients')).toBeVisible()
  })

  it('closes a pointer-opened flyout after the grace period', () => {
    vi.useFakeTimers()
    render(
      <Sidebar.Root aria-label="Primary" defaultExpanded={false}>
        <Sidebar.List>
          <Sidebar.Group id="clients">
            <Sidebar.GroupTrigger>Clients</Sidebar.GroupTrigger>
            <Sidebar.GroupContent>Client links</Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.List>
      </Sidebar.Root>,
    )

    const trigger = screen.getByRole('button', { name: 'Clients' })
    const group = trigger.closest('li')

    expect(group).not.toBeNull()
    fireEvent.pointerEnter(group!)
    expect(screen.getByLabelText('Clients')).toBeVisible()

    fireEvent.pointerLeave(group!)
    act(() => vi.advanceTimersByTime(99))
    expect(screen.getByLabelText('Clients')).toBeVisible()

    fireEvent.pointerEnter(group!)
    act(() => vi.advanceTimersByTime(1))
    expect(screen.getByLabelText('Clients')).toBeVisible()

    fireEvent.pointerLeave(group!)
    act(() => vi.advanceTimersByTime(100))
    expect(screen.getByLabelText('Clients')).not.toBeVisible()
  })

  it('keeps a click-opened flyout until an explicit dismissal', () => {
    vi.useFakeTimers()
    render(
      <Sidebar.Root aria-label="Primary" defaultExpanded={false}>
        <Sidebar.List>
          <Sidebar.Group id="clients">
            <Sidebar.GroupTrigger>Clients</Sidebar.GroupTrigger>
            <Sidebar.GroupContent>Client links</Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.List>
      </Sidebar.Root>,
    )

    const trigger = screen.getByRole('button', { name: 'Clients' })
    const group = trigger.closest('li')

    expect(group).not.toBeNull()
    fireEvent.pointerEnter(group!)
    fireEvent.click(trigger)
    fireEvent.pointerLeave(group!)
    act(() => vi.advanceTimersByTime(100))

    expect(screen.getByLabelText('Clients')).toBeVisible()

    fireEvent.click(trigger)
    expect(screen.getByLabelText('Clients')).not.toBeVisible()
  })

  it('opens from keyboard focus and closes when focus leaves the group', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Sidebar.Root aria-label="Primary" defaultExpanded={false}>
          <Sidebar.List>
            <Sidebar.Group id="clients">
              <Sidebar.GroupTrigger>Clients</Sidebar.GroupTrigger>
              <Sidebar.GroupContent>
                <Sidebar.List>
                  <Sidebar.Item value="clients-list">Client list</Sidebar.Item>
                </Sidebar.List>
              </Sidebar.GroupContent>
            </Sidebar.Group>
          </Sidebar.List>
        </Sidebar.Root>
        <button type="button">Outside</button>
      </>,
    )

    const trigger = screen.getByRole('button', { name: 'Clients' })

    await user.tab()
    expect(trigger).toHaveFocus()
    expect(screen.getByLabelText('Clients')).toBeVisible()

    await user.tab()
    expect(screen.getByRole('button', { name: 'Client list' })).toHaveFocus()
    expect(screen.getByLabelText('Clients')).toBeVisible()

    await user.tab()
    expect(screen.getByRole('button', { name: 'Outside' })).toHaveFocus()
    expect(screen.getByLabelText('Clients')).not.toBeVisible()
  })

  it('closes a collapsed flyout from outside interaction without restoring focus', () => {
    render(
      <>
        <Sidebar.Root
          aria-label="Primary"
          defaultExpanded={false}
          defaultOpenGroupId="clients"
        >
          <Sidebar.List>
            <Sidebar.Group id="clients">
              <Sidebar.GroupTrigger>Clients</Sidebar.GroupTrigger>
              <Sidebar.GroupContent>Client links</Sidebar.GroupContent>
            </Sidebar.Group>
          </Sidebar.List>
        </Sidebar.Root>
        <button type="button">Outside</button>
      </>,
    )

    const trigger = screen.getByRole('button', { name: 'Clients' })
    const outside = screen.getByRole('button', { name: 'Outside' })

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    fireEvent.pointerDown(outside)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).not.toHaveFocus()
  })

  it('closes a collapsed flyout with Escape and restores trigger focus', async () => {
    const user = userEvent.setup()
    render(
      <Sidebar.Root aria-label="Primary" defaultExpanded={false}>
        <Sidebar.List>
          <Sidebar.Group id="clients">
            <Sidebar.GroupTrigger>Clients</Sidebar.GroupTrigger>
            <Sidebar.GroupContent>
              <Sidebar.List>
                <Sidebar.Item value="clients-list">Client list</Sidebar.Item>
              </Sidebar.List>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.List>
      </Sidebar.Root>,
    )

    const trigger = screen.getByRole('button', { name: 'Clients' })
    await user.click(trigger)
    await user.tab()
    expect(screen.getByRole('button', { name: 'Client list' })).toHaveFocus()

    await user.keyboard('{Escape}')

    expect(trigger).toHaveFocus()
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('requests controlled group opening without overriding the prop', async () => {
    const user = userEvent.setup()
    const onOpenGroupChange = vi.fn()
    render(
      <Sidebar.Root
        aria-label="Primary"
        onOpenGroupChange={onOpenGroupChange}
        openGroupId={null}
      >
        <Sidebar.List>
          <Sidebar.Group id="clients">
            <Sidebar.GroupTrigger>Clients</Sidebar.GroupTrigger>
            <Sidebar.GroupContent>Content</Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.List>
      </Sidebar.Root>,
    )

    const trigger = screen.getByRole('button', { name: 'Clients' })
    await user.click(trigger)

    expect(onOpenGroupChange).toHaveBeenCalledExactlyOnceWith('clients')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes a transient group after child selection', async () => {
    const user = userEvent.setup()
    render(
      <Sidebar.Root
        aria-label="Primary"
        defaultExpanded={false}
        defaultOpenGroupId="clients"
      >
        <Sidebar.List>
          <Sidebar.Group id="clients">
            <Sidebar.GroupTrigger>Clients</Sidebar.GroupTrigger>
            <Sidebar.GroupContent>
              <Sidebar.List>
                <Sidebar.Item value="clients-list">Client list</Sidebar.Item>
              </Sidebar.List>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.List>
      </Sidebar.Root>,
    )

    const trigger = screen.getByRole('button', { name: 'Clients' })
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    await user.click(screen.getByRole('button', { name: 'Client list' }))
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('warns when group ids are duplicated within one root', () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    render(
      <Sidebar.Root aria-label="Primary">
        <Sidebar.List>
          <Sidebar.Group id="clients">First</Sidebar.Group>
          <Sidebar.Group id="clients">Second</Sidebar.Group>
        </Sidebar.List>
      </Sidebar.Root>,
    )

    expect(warning).toHaveBeenCalledWith(
      'Sidebar.Group id "clients" must be unique',
    )
    warning.mockRestore()
  })

  it('does not open an inactive inline group from pointer or focus', async () => {
    const user = userEvent.setup()
    render(
      <Sidebar.Root aria-label="Primary">
        <Sidebar.List>
          <Sidebar.Group id="clients">
            <Sidebar.GroupTrigger>Clients</Sidebar.GroupTrigger>
            <Sidebar.GroupContent>Client links</Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.List>
      </Sidebar.Root>,
    )

    const trigger = screen.getByRole('button', { name: 'Clients' })
    const group = trigger.closest('li')
    const content = screen.getByLabelText('Clients')

    expect(group).not.toBeNull()
    fireEvent.pointerEnter(group!)
    expect(content).toHaveAttribute('aria-hidden', 'true')

    await user.tab()
    expect(trigger).toHaveFocus()
    expect(content).toHaveAttribute('aria-hidden', 'true')
  })

  it('selects the group entry item when its expanded trigger is activated', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Sidebar.Root aria-label="Primary" onValueChange={onValueChange}>
        <Sidebar.List>
          <Sidebar.Group entryValue="clients-list" id="clients">
            <Sidebar.GroupTrigger>Clients</Sidebar.GroupTrigger>
            <Sidebar.GroupContent>
              <Sidebar.List>
                <Sidebar.Item value="clients-list">Client list</Sidebar.Item>
              </Sidebar.List>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.List>
      </Sidebar.Root>,
    )

    const trigger = screen.getByRole('button', { name: 'Clients' })
    await user.click(trigger)

    expect(onValueChange).toHaveBeenCalledExactlyOnceWith('clients-list')
    expect(trigger).toHaveFocus()
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: 'Client list' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('closes an explicitly open inactive group with Escape', async () => {
    const user = userEvent.setup()
    render(
      <Sidebar.Root aria-label="Primary">
        <Sidebar.List>
          <Sidebar.Group id="clients">
            <Sidebar.GroupTrigger>Clients</Sidebar.GroupTrigger>
            <Sidebar.GroupContent>
              <Sidebar.List>
                <Sidebar.Item value="clients-list">Client list</Sidebar.Item>
              </Sidebar.List>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.List>
      </Sidebar.Root>,
    )

    const trigger = screen.getByRole('button', { name: 'Clients' })
    const content = screen.getByLabelText('Clients')

    await user.click(trigger)
    await user.tab()
    expect(screen.getByRole('button', { name: 'Client list' })).toHaveFocus()

    await user.keyboard('{Escape}')

    expect(trigger).toHaveFocus()
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(content).toHaveAttribute('aria-hidden', 'true')
  })

  it('keeps an active inline group open', () => {
    render(<GroupFixture />)
    const trigger = screen.getByRole('button', { name: 'Clients' })
    const content = screen.getByLabelText('Clients')

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(content).toBeVisible()
  })
})
