import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { StateSidebarExample } from './state-sidebar-example'

describe('StateSidebarExample', () => {
  it('controls the active item with local React state', async () => {
    const user = userEvent.setup()
    render(<StateSidebarExample />)

    await user.click(screen.getByRole('button', { name: 'Уведомления' }))

    expect(
      screen.getByRole('button', { name: 'Уведомления' }),
    ).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('status')).toHaveTextContent('Уведомления')
  })
})
