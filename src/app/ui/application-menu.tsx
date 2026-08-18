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
import { DecorativeIcon } from '@/shared/ui/icon'
export function ApplicationMenu() {
  return (
    <RouterMenu>
      <RouterMenu.Item
        icon={<DecorativeIcon icon={<ChartNoAxesColumn />} />}
        label="Trends"
        to="/trends"
      />
      <RouterMenu.Item
        icon={<DecorativeIcon icon={<CircleCheckBig />} />}
        label="Tasks"
        to="/tasks"
      />
      <RouterMenu.Item
        icon={<DecorativeIcon icon={<TicketCheck />} />}
        label="Tickets"
        to="/tickets"
      />
      <RouterMenu.Item
        icon={<DecorativeIcon icon={<CreditCard />} />}
        label="Payments"
        to="/payments"
      />
      <RouterMenu.Item
        icon={<DecorativeIcon icon={<Smile />} />}
        label="Clients"
        to="/clients"
      />
      <RouterMenu.Group
        icon={<DecorativeIcon icon={<Archive />} />}
        label="Inventory"
      >
        <RouterMenu.Item label="Products" to="/inventory/products" />
        <RouterMenu.Item label="Orders" to="/inventory/orders" />
        <RouterMenu.Item label="Suppliers" to="/inventory/suppliers" />
      </RouterMenu.Group>
      <RouterMenu.Item
        icon={<DecorativeIcon icon={<ShoppingCart />} />}
        label="Shop"
        to="/shop"
      />
      <RouterMenu.Item
        icon={<DecorativeIcon icon={<ChartNoAxesColumn />} />}
        label="Reports"
        to="/reports"
      />
      <RouterMenu.Item
        icon={<DecorativeIcon icon={<Flame />} />}
        label="Tender"
        to="/tender"
      />
      <RouterMenu.Separator />
      <RouterMenu.Item
        icon={<DecorativeIcon icon={<Settings />} />}
        label="Settings"
        to="/settings"
      />
      <RouterMenu.Item
        icon={<DecorativeIcon icon={<CircleHelp />} />}
        label="Knowledge Base"
        to="/knowledge-base"
      />
    </RouterMenu>
  )
}
