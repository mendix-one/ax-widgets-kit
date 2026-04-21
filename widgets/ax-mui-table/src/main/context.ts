import { createWidgetContext } from '@ax/shared'

import type { MuiTableStore } from './store'

export const { Provider: MuiTableProvider, useStore: useMuiTableStore } =
  createWidgetContext<MuiTableStore>('MuiTable')
