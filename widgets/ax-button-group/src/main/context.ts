import { createWidgetContext } from '@ax/shared'

import type { ButtonGroupStore } from './store'

export const { Provider: ButtonGroupProvider, useStore: useButtonGroupStore } =
  createWidgetContext<ButtonGroupStore>('ButtonGroup')
