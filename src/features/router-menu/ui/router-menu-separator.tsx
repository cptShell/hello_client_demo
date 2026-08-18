import { Sidebar } from '@/shared/ui/sidebar'
import { separatorClassName } from './router-menu-styles'

export function RouterMenuSeparator() {
  return <Sidebar.Separator className={separatorClassName} />
}
