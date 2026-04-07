import { createWidgetContext } from '@ax/shared'

import type { SelectStore } from './store'

export const { Provider: SelectProvider, useStore: useSelectStore } = createWidgetContext<SelectStore>('Select')
