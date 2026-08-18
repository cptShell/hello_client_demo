import { cloneElement } from 'react'
import type { ReactElement, SVGProps } from 'react'

type DecorativeIconProps = {
  icon: ReactElement<SVGProps<SVGSVGElement>>
}

export function DecorativeIcon({ icon }: DecorativeIconProps) {
  return cloneElement(icon, { 'aria-hidden': true, className: 'size-[var(--sidebar-icon-size)] shrink-0' })
}
