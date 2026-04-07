import { type ReactNode } from 'react'

import { type RootStore } from './RootStore'
import { StoreContext } from './StoreContext'

export function StoreProvider({ store, children }: { store: RootStore; children: ReactNode }) {
  return <StoreContext value={store}>{children}</StoreContext>
}
