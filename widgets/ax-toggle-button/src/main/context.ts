import { createWidgetContext } from '@ax/shared'

import type { ToggleButtonStore } from './store'

export const { Provider: ToggleButtonProvider, useStore: useToggleButtonStore } =
  createWidgetContext<ToggleButtonStore>('ToggleButton')
