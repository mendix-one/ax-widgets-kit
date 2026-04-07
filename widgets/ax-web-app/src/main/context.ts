import { createWidgetContext } from '@ax/shared'

import { type WebAppStore } from './store'

export const { Provider: WebAppProvider, useStore: useWebAppStore } = createWidgetContext<WebAppStore>('WebApp')
