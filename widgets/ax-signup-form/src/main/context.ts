import { createWidgetContext } from '@ax/shared'

import type { SignUpFormStore } from './store'

export const { Provider: SignUpFormProvider, useStore: useSignUpFormStore } =
  createWidgetContext<SignUpFormStore>('SignUpForm')
