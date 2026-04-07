import { createWidgetContext } from '@ax/shared'

import type { TextFieldStore } from './store'

export const { Provider: TextFieldProvider, useStore: useTextFieldStore } =
  createWidgetContext<TextFieldStore>('TextField')
