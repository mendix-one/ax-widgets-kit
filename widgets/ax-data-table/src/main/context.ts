import { createWidgetContext } from '@ax/shared'

import type { DataTableStore } from './store'

export const { Provider: DataTableProvider, useStore: useDataTableStore } = createWidgetContext<DataTableStore>('DataTable')