import { createWidgetContext } from '@ax/shared'

import type { SignInFormStore } from './store'

export const { Provider: SignInFormProvider, useStore: useSignInFormStore } =
  createWidgetContext<SignInFormStore>('SignInForm')
