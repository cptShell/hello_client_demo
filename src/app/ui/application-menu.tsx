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
import { ROUTES, toPath } from '@/shared/config/routes'
export function ApplicationMenu() {
  return (
    <RouterMenu>
      <RouterMenu.Item
        icon={<DecorativeIcon icon={<ChartNoAxesColumn />} />}
        label="Trends"
        to={toPath(ROUTES.trends)}
      />
      <RouterMenu.Item
        icon={<DecorativeIcon icon={<CircleCheckBig />} />}
        label="Tasks"
        to={toPath(ROUTES.tasks)}
      />
      <RouterMenu.Item
        icon={<DecorativeIcon icon={<TicketCheck />} />}
        label="Tickets"
        to={toPath(ROUTES.tickets)}
      />
      <RouterMenu.Item
        icon={<DecorativeIcon icon={<CreditCard />} />}
        label="Payments"
        to={toPath(ROUTES.payments)}
      />
      <RouterMenu.Item
        icon={<DecorativeIcon icon={<Smile />} />}
        label="Clients"
        to={toPath(ROUTES.clients)}
      />
      <RouterMenu.Group
        icon={<DecorativeIcon icon={<Archive />} />}
        label="Inventory"
      >
        <RouterMenu.Item
          label="Products"
          to={toPath(ROUTES.inventory.root, ROUTES.inventory.products)}
        />
        <RouterMenu.Item
          label="Orders"
          to={toPath(ROUTES.inventory.root, ROUTES.inventory.orders)}
        />
        <RouterMenu.Item
          label="Suppliers"
          to={toPath(ROUTES.inventory.root, ROUTES.inventory.suppliers)}
        />
      </RouterMenu.Group>
      <RouterMenu.Item
        icon={<DecorativeIcon icon={<ShoppingCart />} />}
        label="Shop"
        to={toPath(ROUTES.shop)}
      />
      <RouterMenu.Item
        icon={<DecorativeIcon icon={<ChartNoAxesColumn />} />}
        label="Reports"
        to={toPath(ROUTES.reports)}
      />
      <RouterMenu.Item
        icon={<DecorativeIcon icon={<Flame />} />}
        label="Tender"
        to={toPath(ROUTES.tender)}
      />
      <RouterMenu.Separator />
      <RouterMenu.Item
        icon={<DecorativeIcon icon={<Settings />} />}
        label="Settings"
        to={toPath(ROUTES.settings)}
      />
      <RouterMenu.Item
        icon={<DecorativeIcon icon={<CircleHelp />} />}
        label="Knowledge Base"
        to={toPath(ROUTES.knowledgeBase)}
      />
    </RouterMenu>
  )
}
