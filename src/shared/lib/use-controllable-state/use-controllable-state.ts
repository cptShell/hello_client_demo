import { useCallback, useEffect, useRef, useState } from 'react'

type StateUpdater<Value> = Value | ((currentValue: Value) => Value)

type UseControllableStateOptions<Value> = {
  defaultValue: Value
  onChange?: (value: Value) => void
  value?: Value
}

function resolveValue<Value>(
  updater: StateUpdater<Value>,
  currentValue: Value,
) {
  return typeof updater === 'function'
    ? (updater as (value: Value) => Value)(currentValue)
    : updater
}

export function useControllableState<Value>({
  defaultValue,
  onChange,
  value,
}: UseControllableStateOptions<Value>) {
  const controlled = value !== undefined
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const currentValue = controlled ? value : uncontrolledValue
  const previousUncontrolledValueRef = useRef(uncontrolledValue)

  useEffect(() => {
    if (
      !Object.is(previousUncontrolledValueRef.current, uncontrolledValue)
    ) {
      previousUncontrolledValueRef.current = uncontrolledValue
      onChange?.(uncontrolledValue)
    }
  }, [onChange, uncontrolledValue])

  const setValue = useCallback((updater: StateUpdater<Value>) => {
    if (!controlled) {
      setUncontrolledValue(updater)
      return
    }

    const nextValue = resolveValue(updater, currentValue)

    if (!Object.is(currentValue, nextValue)) {
      onChange?.(nextValue)
    }
  }, [controlled, currentValue, onChange])

  return [currentValue, setValue] as const
}
