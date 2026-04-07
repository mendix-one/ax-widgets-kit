import { createWidgetContext } from '@ax/shared'

import { type UserMenuStore } from './store'

export const { Provider: UserMenuProvider, useStore: useUserMenuStore } = createWidgetContext<UserMenuStore>('UserMenu')
