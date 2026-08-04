import { useCallback, useRef } from 'react'
import type { ComponentProps } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { usePersistedExpanded } from '../lib/use-persisted-expanded'
import { AppSidebar } from './app-sidebar'
import type { AppSidebarLinkProps } from './app-sidebar'

type RouterSidebarExampleProps = Pick<
  ComponentProps<typeof AppSidebar>,
  'className'
>

export function RouterSidebarExample({
  className,
}: RouterSidebarExampleProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const linkNavigationRef = useRef(false)
  const [expanded, setExpanded] = usePersistedExpanded()

  const markLinkNavigation = useCallback(() => {
    linkNavigationRef.current = true

    queueMicrotask(() => {
      linkNavigationRef.current = false
    })
  }, [])

  const renderLink = useCallback(
    ({ children, to }: AppSidebarLinkProps) => (
      <Link onClick={markLinkNavigation} to={to}>
        {children}
      </Link>
    ),
    [markLinkNavigation],
  )

  const handleValueChange = useCallback(
    (value: string) => {
      if (!linkNavigationRef.current) {
        void navigate(value)
      }
    },
    [navigate],
  )

  return (
    <AppSidebar
      className={className}
      expanded={expanded}
      onExpandedChange={setExpanded}
      onValueChange={handleValueChange}
      renderLink={renderLink}
      value={location.pathname}
    />
  )
}
