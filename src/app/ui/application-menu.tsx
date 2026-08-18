import {
  Archive,
  ChartNoAxesColumn,
  CircleCheckBig,
  CircleHelp,
  CreditCard,
  Flame,
  Settings,
  ShoppingCart,
  Smile,
  TicketCheck,
} from 'lucide-react'

import { RouterMenu } from '@/features/router-menu'

const iconClassName = 'size-[var(--sidebar-icon-size)]'

export function ApplicationMenu() {
  return (
    <RouterMenu className="peer/sidebar">
      <RouterMenu.Item
        icon={<ChartNoAxesColumn aria-hidden="true" className={iconClassName} />}
        label="Trends"
        to="/trends"
      />
      <RouterMenu.Item
        icon={<CircleCheckBig aria-hidden="true" className={iconClassName} />}
        label="Tasks"
        to="/tasks"
      />
      <RouterMenu.Item
        icon={<TicketCheck aria-hidden="true" className={iconClassName} />}
        label="Tickets"
        to="/tickets"
      />
      <RouterMenu.Item
        icon={<CreditCard aria-hidden="true" className={iconClassName} />}
        label="Payments"
        to="/payments"
      />
      <RouterMenu.Item
        icon={<Smile aria-hidden="true" className={iconClassName} />}
        label="Clients"
        to="/clients"
      />
      <RouterMenu.Group
        icon={<Archive aria-hidden="true" className={iconClassName} />}
        label="Inventory"
      >
        <RouterMenu.Item label="Products" to="/inventory/products" />
        <RouterMenu.Item label="Orders" to="/inventory/orders" />
        <RouterMenu.Item label="Suppliers" to="/inventory/suppliers" />
      </RouterMenu.Group>
      <RouterMenu.Item
        icon={<ShoppingCart aria-hidden="true" className={iconClassName} />}
        label="Shop"
        to="/shop"
      />
      <RouterMenu.Item
        icon={<ChartNoAxesColumn aria-hidden="true" className={iconClassName} />}
        label="Reports"
        to="/reports"
      />
      <RouterMenu.Item
        icon={<Flame aria-hidden="true" className={iconClassName} />}
        label="Tender"
        to="/tender"
      />
      <RouterMenu.Separator />
      <RouterMenu.Item
        icon={<Settings aria-hidden="true" className={iconClassName} />}
        label="Settings"
        to="/settings"
      />
      <RouterMenu.Item
        icon={<CircleHelp aria-hidden="true" className={iconClassName} />}
        label="Knowledge Base"
        to="/knowledge-base"
      />
    </RouterMenu>
  )
}
