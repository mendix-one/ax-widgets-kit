import { createWidgetContext } from '@ax/shared'

import type { SwitchStore } from './store'

export const { Provider: SwitchProvider, useStore: useSwitchStore } = createWidgetContext<SwitchStore>('Switch')
