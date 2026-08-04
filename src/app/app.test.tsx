import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { App } from '@/app'

describe('App scaffold', () => {
  it('renders the scaffold status', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: 'HelloClient sidebar scaffold is ready',
      }),
    ).toBeInTheDocument()
  })
})
