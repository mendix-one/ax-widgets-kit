import { createWidgetContext } from '@ax/shared'

import type { ResetPassFormStore } from './store'

export const { Provider: ResetPassFormProvider, useStore: useResetPassFormStore } =
  createWidgetContext<ResetPassFormStore>('ResetPassForm')
