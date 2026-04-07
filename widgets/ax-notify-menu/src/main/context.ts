import { createWidgetContext } from '@ax/shared'

import { type NotifyMenuStore } from './store'

export const { Provider: NotifyMenuProvider, useStore: useNotifyMenuStore } =
  createWidgetContext<NotifyMenuStore>('NotifyMenu')
