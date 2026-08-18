import { Outlet } from 'react-router-dom'

import { ApplicationMenu } from './application-menu'

export function ApplicationShell() {
  return (
    <div className="min-h-screen bg-surface-page text-text-primary">
      <ApplicationMenu />
      <main className="min-h-screen px-8 pb-[calc(var(--sidebar-mobile-height)+var(--sidebar-safe-area-bottom)+2rem)] pt-12 transition-[margin] duration-[var(--sidebar-motion-normal)] ease-standard md:ml-[var(--sidebar-width-expanded)] md:px-12 md:py-16 md:peer-data-[variant=desktop-collapsed]/sidebar:ml-[var(--sidebar-width-collapsed)]">
        <Outlet />
      </main>
    </div>
  )
}
