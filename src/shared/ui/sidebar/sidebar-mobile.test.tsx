import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mediaState = vi.hoisted(() => ({ matches: true }))

vi.mock('@/shared/lib/use-media-query', () => ({
  useMediaQuery: () => mediaState.matches,
}))

import { Sidebar } from './index'

const scrollIntoView = vi.fn()

beforeEach(() => {
  mediaState.matches = true
  scrollIntoView.mockReset()
  Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
    configurable: true,
    value: scrollIntoView,
  })
})

function MobileGroupFixture() {
  return (
    <Sidebar.Root aria-label="Primary">
      <Sidebar.List>
        <Sidebar.Group id="products">
          <Sidebar.GroupTrigger>Products</Sidebar.GroupTrigger>
          <Sidebar.GroupContent title="Product navigation">
            <Sidebar.List>
              <Sidebar.Item value="catalog">Catalog</Sidebar.Item>
            </Sidebar.List>
          </Sidebar.GroupContent>
        </Sidebar.Group>
      </Sidebar.List>
    </Sidebar.Root>
  )
}

describe('Sidebar mobile behavior', () => {
  it('opens a group only by activation and restores focus after Escape', async () => {
    const user = userEvent.setup()
    render(<MobileGroupFixture />)

    const trigger = screen.getByRole('button', { name: 'Products' })
    const group = trigger.closest('li')

    fireEvent.pointerEnter(group!)
    trigger.focus()
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await user.click(trigger)

    expect(
      screen.getByRole('dialog', { name: 'Product navigation' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveFocus()
    expect(document.body.style.overflow).toBe('hidden')

    await user.keyboard('{Escape}')

    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).toHaveFocus()
    expect(document.body.style.overflow).toBe('')
  })

  it('dismisses the sheet from its backdrop and child selection', async () => {
    const user = userEvent.setup()
    render(<MobileGroupFixture />)

    const trigger = screen.getByRole('button', { name: 'Products' })
    await user.click(trigger)

    const dialog = screen.getByRole('dialog', { name: 'Product navigation' })
    fireEvent.pointerDown(dialog.parentElement!)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await user.click(trigger)
    await user.click(screen.getByRole('button', { name: 'Catalog' }))
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('scrolls the active mobile destination or its parent group into view', async () => {
    const { rerender } = render(
      <Sidebar.Root aria-label="Primary" value="overview">
        <Sidebar.List>
          <Sidebar.Item value="overview">Overview</Sidebar.Item>
          <Sidebar.Group id="products">
            <Sidebar.GroupTrigger>Products</Sidebar.GroupTrigger>
            <Sidebar.GroupContent>
              <Sidebar.Item value="catalog">Catalog</Sidebar.Item>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.List>
      </Sidebar.Root>,
    )

    const overview = screen.getByRole('button', { name: 'Overview' })
    await waitFor(() => {
      expect(scrollIntoView.mock.instances).toContain(overview)
    })

    scrollIntoView.mockClear()
    rerender(
      <Sidebar.Root aria-label="Primary" value="catalog">
        <Sidebar.List>
          <Sidebar.Item value="overview">Overview</Sidebar.Item>
          <Sidebar.Group id="products">
            <Sidebar.GroupTrigger>Products</Sidebar.GroupTrigger>
            <Sidebar.GroupContent>
              <Sidebar.Item value="catalog">Catalog</Sidebar.Item>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.List>
      </Sidebar.Root>,
    )

    const products = screen.getByRole('button', { name: 'Products' })
    await waitFor(() => {
      expect(scrollIntoView.mock.instances).toContain(products)
    })
    expect(scrollIntoView).toHaveBeenLastCalledWith({
      block: 'nearest',
      inline: 'nearest',
    })
  })
})
