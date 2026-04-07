import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { App } from './App'
import './core/i18n'
import { RootStore, StoreProvider } from './core/stores'

const rootStore = new RootStore()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider store={rootStore}>
      <App />
    </StoreProvider>
  </StrictMode>,
)
