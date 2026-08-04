import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { App } from './app'

afterEach(() => {
  window.history.replaceState(null, '', '/')
})

describe('App hash navigation', () => {
  it('uses the current hash as the initial active sidebar value', () => {
    window.history.replaceState(null, '', '/#/clients')

    render(<App />)

    expect(screen.getByRole('link', { name: 'Clients' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('button', { name: 'Products' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })
})
