import type { Ref, RefCallback } from 'react'

function assignRef<Value>(ref: Ref<Value> | undefined, value: Value | null) {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref) {
    ref.current = value
  }
}

export function composeRefs<Value>(
  ...refs: Array<Ref<Value> | undefined>
): RefCallback<Value> {
  return (value) => {
    for (const ref of refs) {
      assignRef(ref, value)
    }
  }
}
