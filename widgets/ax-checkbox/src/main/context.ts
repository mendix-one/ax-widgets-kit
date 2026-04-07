import { createWidgetContext } from '@ax/shared'

import type { CheckboxStore } from './store'

export const { Provider: CheckboxProvider, useStore: useCheckboxStore } = createWidgetContext<CheckboxStore>('Checkbox')
