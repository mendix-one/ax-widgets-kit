import { createContext, type ReactNode, useContext } from 'react'

/**
 * Creates a typed React context + Provider + useStore hook for a MobX widget store.
 *
 * Usage:
 * ```ts
 * class MyWidgetStore { ... }
 * const { Provider, useStore } = createWidgetContext<MyWidgetStore>()
 * ```
 */
export function createWidgetContext<T>(displayName?: string) {
  const Context = createContext<T | null>(null)
  if (displayName) Context.displayName = displayName

  function Provider({ store, children }: { store: T; children: ReactNode }) {
    return <Context value={store}>{children}</Context>
  }

  function useStore(): T {
    const store = useContext(Context)
    if (!store) {
      throw new Error(`useStore must be used within <${displayName ?? 'Widget'}Provider>`)
    }
    return store
  }

  return { Provider, useStore } as const
}
