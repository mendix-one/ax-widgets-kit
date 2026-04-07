import { use } from 'react'

import { type RootStore } from './RootStore'
import { StoreContext } from './StoreContext'

export const useStore = (): RootStore => {
  const store = use(StoreContext)
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return store
}
