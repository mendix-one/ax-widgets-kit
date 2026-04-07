import { createWidgetContext } from '@ax/shared'

import type { SetPasswordFormStore } from './store'

export const { Provider: SetPasswordFormProvider, useStore: useSetPasswordFormStore } =
  createWidgetContext<SetPasswordFormStore>('SetPasswordForm')
