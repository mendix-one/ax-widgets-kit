import { createWidgetContext } from '@ax/shared'

import { type AuthLayoutStore } from './store'

export const { Provider: AuthLayoutProvider, useStore: useAuthLayoutStore } =
  createWidgetContext<AuthLayoutStore>('AuthLayout')
