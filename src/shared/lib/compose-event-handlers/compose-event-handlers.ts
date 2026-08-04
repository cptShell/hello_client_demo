type EventHandler<EventType> = (event: EventType) => void

export function composeEventHandlers<
  EventType extends { defaultPrevented: boolean },
>(
  consumerHandler: EventHandler<EventType> | undefined,
  internalHandler: EventHandler<EventType> | undefined,
) {
  return (event: EventType) => {
    consumerHandler?.(event)

    if (!event.defaultPrevented) {
      internalHandler?.(event)
    }
  }
}
