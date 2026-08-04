import { createRef, useEffect } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Link, MemoryRouter, useLocation } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { Sidebar } from '@/shared/ui/sidebar'

function LocationObserver({ onChange }: { onChange: (path: string) => void }) {
  const location = useLocation()

  useEffect(() => {
    onChange(location.pathname)
  }, [location.pathname, onChange])

  return null
}

describe('Sidebar.Item Router compatibility', () => {
  it('composes Link navigation, selection, and forwarded refs through asChild', async () => {
    const user = userEvent.setup()
    const onLocationChange = vi.fn()
    const itemRef = createRef<HTMLElement>()
    const linkRef = createRef<HTMLAnchorElement>()
    render(
      <MemoryRouter initialEntries={['/overview']}>
        <Sidebar.Root aria-label="Primary" defaultValue="/overview">
          <Sidebar.List>
            <Sidebar.Item asChild ref={itemRef} value="/clients">
              <Link ref={linkRef} to="/clients">
                Clients
              </Link>
            </Sidebar.Item>
          </Sidebar.List>
        </Sidebar.Root>
        <LocationObserver onChange={onLocationChange} />
      </MemoryRouter>,
    )

    const link = screen.getByRole('link', { name: 'Clients' })
    expect(itemRef.current).toBe(link)
    expect(linkRef.current).toBe(link)

    await user.click(link)

    await waitFor(() => {
      expect(onLocationChange).toHaveBeenLastCalledWith('/clients')
    })
    expect(link).toHaveAttribute('aria-current', 'page')
  })
})
