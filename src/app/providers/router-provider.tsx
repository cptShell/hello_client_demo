import { HashRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'

import { RouterSidebarExample } from '@/features/sidebar-demo'
import { PlaceholderPage } from '@/pages/placeholder'
import { RouterDemoPage } from '@/pages/router-demo'

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
          <Route index element={<Navigate replace to="/trends" />} />
          <Route element={<RouterDemoPage />} path="trends" />
          <Route
            element={
              <PlaceholderPage
                description="Review and manage upcoming work from this route placeholder."
                title="Tasks"
              />
            }
            path="tasks"
          />
          <Route
            element={
              <PlaceholderPage
                description="Track customer requests from this route placeholder."
                title="Tickets"
              />
            }
            path="tickets"
          />
          <Route
            element={
              <PlaceholderPage
                description="Review account transactions from this route placeholder."
                title="Payments"
              />
            }
            path="payments"
          />
          <Route
            element={
              <PlaceholderPage
                description="Review and manage customer relationships from this route placeholder."
                title="Clients"
              />
            }
            path="clients"
          />
          <Route path="inventory">
            <Route index element={<Navigate replace to="products" />} />
            <Route
              element={
                <PlaceholderPage
                  description="Browse and manage products from this nested route placeholder."
                  title="Products"
                />
              }
              path="products"
            />
            <Route
              element={
                <PlaceholderPage
                  description="Review inventory orders from this nested route placeholder."
                  title="Orders"
                />
              }
              path="orders"
            />
            <Route
              element={
                <PlaceholderPage
                  description="Manage inventory suppliers from this nested route placeholder."
                  title="Suppliers"
                />
              }
              path="suppliers"
            />
          </Route>
          <Route
            element={
              <PlaceholderPage
                description="Browse available offers from this route placeholder."
                title="Shop"
              />
            }
            path="shop"
          />
          <Route
            element={
              <PlaceholderPage
                description="Inspect performance reports from this route placeholder."
                title="Reports"
              />
            }
            path="reports"
          />
          <Route
            element={
              <PlaceholderPage
                description="Review tender activity from this route placeholder."
                title="Tender"
              />
            }
            path="tender"
          />
          <Route
            element={
              <PlaceholderPage
                description="Manage workspace preferences from this route placeholder."
                title="Settings"
              />
            }
            path="settings"
          />
          <Route
            element={
              <PlaceholderPage
                description="Browse workspace guidance from this route placeholder."
                title="Knowledge Base"
              />
            }
            path="knowledge-base"
          />
          <Route element={<Navigate replace to="/trends" />} path="*" />
        </Route>
      </Routes>
    </HashRouter>
  )
}
