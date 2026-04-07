import { createWidgetContext } from '@ax/shared'

import { type LogoStore } from './store'

export const { Provider: LogoProvider, useStore: useLogoStore } = createWidgetContext<LogoStore>('Logo')
