import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'

import { ROUTES, toPath } from '@/app/config/routes'
import { ApplicationShell } from '@/app/ui/application-shell'
import { PlaceholderPage } from '@/pages/placeholder'
import { RouterDemoPage } from '@/pages/router-demo'

export function AppRouterProvider() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<ApplicationShell />}>
          <Route index element={<Navigate replace to={toPath(ROUTES.trends)} />} />
          <Route element={<RouterDemoPage />} path={ROUTES.trends} />
          <Route
            element={
              <PlaceholderPage
                description="Review and manage upcoming work from this route placeholder."
                title="Tasks"
              />
            }
            path={ROUTES.tasks}
          />
          <Route
            element={
              <PlaceholderPage
                description="Track customer requests from this route placeholder."
                title="Tickets"
              />
            }
            path={ROUTES.tickets}
          />
          <Route
            element={
              <PlaceholderPage
                description="Review account transactions from this route placeholder."
                title="Payments"
              />
            }
            path={ROUTES.payments}
          />
          <Route
            element={
              <PlaceholderPage
                description="Review and manage customer relationships from this route placeholder."
                title="Clients"
              />
            }
            path={ROUTES.clients}
          />
          <Route path={ROUTES.inventory.root}>
            <Route index element={<Navigate replace to={ROUTES.inventory.products} />} />
            <Route
              element={
                <PlaceholderPage
                  description="Browse and manage products from this nested route placeholder."
                  title="Products"
                />
              }
              path={ROUTES.inventory.products}
            />
            <Route
              element={
                <PlaceholderPage
                  description="Review inventory orders from this nested route placeholder."
                  title="Orders"
                />
              }
              path={ROUTES.inventory.orders}
            />
            <Route
              element={
                <PlaceholderPage
                  description="Manage inventory suppliers from this nested route placeholder."
                  title="Suppliers"
                />
              }
              path={ROUTES.inventory.suppliers}
            />
          </Route>
          <Route
            element={
              <PlaceholderPage
                description="Browse available offers from this route placeholder."
                title="Shop"
              />
            }
            path={ROUTES.shop}
          />
          <Route
            element={
              <PlaceholderPage
                description="Inspect performance reports from this route placeholder."
                title="Reports"
              />
            }
            path={ROUTES.reports}
          />
          <Route
            element={
              <PlaceholderPage
                description="Review tender activity from this route placeholder."
                title="Tender"
              />
            }
            path={ROUTES.tender}
          />
          <Route
            element={
              <PlaceholderPage
                description="Manage workspace preferences from this route placeholder."
                title="Settings"
              />
            }
            path={ROUTES.settings}
          />
          <Route
            element={
              <PlaceholderPage
                description="Browse workspace guidance from this route placeholder."
                title="Knowledge Base"
              />
            }
            path={ROUTES.knowledgeBase}
          />
          <Route element={<Navigate replace to={toPath(ROUTES.trends)} />} path="*" />
        </Route>
      </Routes>
    </HashRouter>
  )
}
