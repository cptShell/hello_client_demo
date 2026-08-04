import { HashRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'

import { RouterSidebarExample } from '@/features/sidebar-demo'
import { PlaceholderPage } from '@/pages/placeholder'
import { RouterDemoPage } from '@/pages/router-demo'
import { StateDemoPage } from '@/pages/state-demo'

function ApplicationLayout() {
  return (
    <div className="min-h-screen bg-surface-page text-text-primary">
      <RouterSidebarExample className="peer/sidebar" />
      <main className="min-h-screen px-8 pb-[calc(var(--sidebar-mobile-height)+var(--sidebar-safe-area-bottom)+2rem)] pt-12 transition-[margin] duration-[var(--sidebar-motion-normal)] ease-standard md:ml-[var(--sidebar-width-expanded)] md:px-12 md:py-16 md:peer-data-[variant=desktop-collapsed]/sidebar:ml-[var(--sidebar-width-collapsed)]">
        <Outlet />
      </main>
    </div>
  )
}

export function AppRouterProvider() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<ApplicationLayout />}>
          <Route index element={<Navigate replace to="/overview" />} />
          <Route element={<RouterDemoPage />} path="overview" />
          <Route
            element={
              <PlaceholderPage
                description="Review and manage customer relationships from this route placeholder."
                title="Clients"
              />
            }
            path="clients"
          />
          <Route
            element={
              <PlaceholderPage
                description="Plan appointments and upcoming customer activities from this route placeholder."
                title="Calendar"
              />
            }
            path="calendar"
          />
          <Route
            element={
              <PlaceholderPage
                description="Inspect performance indicators from this route placeholder."
                title="Analytics"
              />
            }
            path="analytics"
          />
          <Route
            element={
              <PlaceholderPage
                description="Coordinate customer communication from this route placeholder."
                title="Campaigns"
              />
            }
            path="campaigns"
          />
          <Route path="products">
            <Route index element={<Navigate replace to="catalog" />} />
            <Route
              element={
                <PlaceholderPage
                  description="Browse the complete product collection from this nested route placeholder."
                  title="Catalog"
                />
              }
              path="catalog"
            />
            <Route
              element={
                <PlaceholderPage
                  description="Organize the catalog structure from this nested route placeholder."
                  title="Categories"
                />
              }
              path="categories"
            />
            <Route
              element={
                <PlaceholderPage
                  description="Curate highlighted products from this nested route placeholder."
                  title="Featured products"
                />
              }
              path="featured"
            />
          </Route>
          <Route
            element={
              <PlaceholderPage
                description="Review account charges from this route placeholder."
                title="Billing"
              />
            }
            path="billing"
          />
          <Route element={<StateDemoPage />} path="state-example" />
          <Route element={<Navigate replace to="/overview" />} path="*" />
        </Route>
      </Routes>
    </HashRouter>
  )
}
