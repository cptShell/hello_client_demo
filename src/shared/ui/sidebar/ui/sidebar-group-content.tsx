import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { composeRefs } from '../lib/compose-refs'
import { useSidebarGroupContext } from '../model/sidebar-context'
import {
  resolveStateClassName,
  type SidebarGroupState,
  type StateClassName,
} from '../model/sidebar-types'
import { SidebarMobileSheet } from './sidebar-mobile-sheet'

type SidebarGroupContentProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'className' | 'hidden' | 'title'
> & {
  backdropClassName?: string
  className?: StateClassName<SidebarGroupState>
  closeButtonClassName?: string
  closeContent?: ReactNode
  title?: ReactNode
  titleClassName?: string
}

export const SidebarGroupContent = forwardRef<
  HTMLDivElement,
  SidebarGroupContentProps
>(function SidebarGroupContent(
  {
    backdropClassName,
    children,
    className,
    closeButtonClassName,
    closeContent,
    title,
    titleClassName,
    ...contentProps
  },
  forwardedRef,
) {
  const group = useSidebarGroupContext()
  const resolvedClassName = resolveStateClassName(className, group.state)

  if (group.state.presentation === 'bottom-sheet') {
    if (!group.state.open) {
      return (
        <div
          {...contentProps}
          aria-labelledby={group.triggerId}
          className={resolvedClassName}
          hidden
          id={group.contentId}
          ref={composeRefs(group.contentRef, forwardedRef)}
        >
          {children}
        </div>
      )
    }

    return (
      <SidebarMobileSheet
        {...contentProps}
        backdropClassName={backdropClassName}
        className={resolvedClassName}
        closeButtonClassName={closeButtonClassName}
        closeContent={closeContent}
        contentRef={group.contentRef}
        dialogRef={composeRefs(group.contentRef, forwardedRef)}
        id={group.contentId}
        onDismiss={group.dismiss}
        title={title}
        titleClassName={titleClassName}
        triggerId={group.triggerId}
      >
        {children}
      </SidebarMobileSheet>
    )
  }

  return (
    <div
      {...contentProps}
      aria-labelledby={group.triggerId}
      className={resolvedClassName}
      hidden={!group.state.open}
      id={group.contentId}
      ref={composeRefs(group.contentRef, forwardedRef)}
    >
      {children}
    </div>
  )
})
