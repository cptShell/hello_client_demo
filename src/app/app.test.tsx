import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { App } from '@/app'

describe('App token showcase', () => {
  it('renders the design-system foundation semantically', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: 'HelloClient design tokens',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Semantic colors' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Active item preview' }),
    ).toHaveAttribute('aria-current', 'page')
    expect(
      screen.getByRole('button', { name: 'Disabled item preview' }),
    ).toBeDisabled()
  })
})
