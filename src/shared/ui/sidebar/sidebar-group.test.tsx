import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Sidebar } from './index'

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
    expect(screen.getByLabelText('Clients')).not.toBeVisible()
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
    expect(content).toBeVisible()
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
    expect(content).not.toBeVisible()

    await user.tab()
    expect(trigger).toHaveFocus()
    expect(content).not.toBeVisible()
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
    expect(content).not.toBeVisible()
  })

  it('keeps an active inline group open', () => {
    render(<GroupFixture />)
    const trigger = screen.getByRole('button', { name: 'Clients' })
    const content = screen.getByLabelText('Clients')

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(content).toBeVisible()
  })
})
