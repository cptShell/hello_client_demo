export const ROUTES = {
  trends: 'trends',
  tasks: 'tasks',
  tickets: 'tickets',
  payments: 'payments',
  clients: 'clients',
  inventory: {
    root: 'inventory',
    products: 'products',
    orders: 'orders',
    suppliers: 'suppliers',
  },
  shop: 'shop',
  reports: 'reports',
  tender: 'tender',
  settings: 'settings',
  knowledgeBase: 'knowledge-base',
} as const

export function toPath(...segments: string[]) {
  return `/${segments.join('/')}`
}
