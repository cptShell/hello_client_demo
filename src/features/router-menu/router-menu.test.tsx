import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { RouterMenu } from './index'

function RouteStatus() {
  const location = useLocation()

  return <output aria-label="Current route">{location.pathname}</output>
}

function WrappedItem({ label, to }: { label: string; to: string }) {
  return <RouterMenu.Item label={label} to={to} />
}

function RouterMenuFixture({
  firstRoute = '/inventory/products',
  showFirstRoute = true,
}: {
  firstRoute?: string
  showFirstRoute?: boolean
}) {
  return (
    <MemoryRouter initialEntries={['/outside']}>
      <RouterMenu>
        <RouterMenu.Group label="Inventory">
          {showFirstRoute ? (
            <>
              <WrappedItem label="Products" to={firstRoute} />
            </>
          ) : null}
          <RouterMenu.Item label="Orders" to="/inventory/orders" />
        </RouterMenu.Group>
      </RouterMenu>
      <RouteStatus />
    </MemoryRouter>
  )
}

describe('RouterMenu.Group route registration', () => {
  it('uses the first registered destination through component wrappers', async () => {
    const user = userEvent.setup()
    render(<RouterMenuFixture />)

    await user.click(screen.getByRole('button', { name: 'Inventory' }))

    expect(
      screen.getByRole('status', { name: 'Current route' }),
    ).toHaveTextContent('/inventory/products')
  })

  it('updates and removes registered destinations without changing their order', async () => {
    const user = userEvent.setup()
    const { rerender } = render(
      <RouterMenuFixture firstRoute="/inventory/featured" />,
    )

    rerender(<RouterMenuFixture firstRoute="/inventory/products" />)
    await user.click(screen.getByRole('button', { name: 'Inventory' }))
    expect(
      screen.getByRole('status', { name: 'Current route' }),
    ).toHaveTextContent('/inventory/products')

    rerender(<RouterMenuFixture showFirstRoute={false} />)
    await user.click(screen.getByRole('button', { name: 'Inventory' }))
    expect(
      screen.getByRole('status', { name: 'Current route' }),
    ).toHaveTextContent('/inventory/orders')
  })
})
