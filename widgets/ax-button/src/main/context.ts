import { createWidgetContext } from '@ax/shared'

import type { ButtonStore } from './store'

export const { Provider: ButtonProvider, useStore: useButtonStore } = createWidgetContext<ButtonStore>('Button')
