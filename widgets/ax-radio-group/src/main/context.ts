import { createWidgetContext } from '@ax/shared'

import type { RadioGroupStore } from './store'

export const { Provider: RadioGroupProvider, useStore: useRadioGroupStore } =
  createWidgetContext<RadioGroupStore>('RadioGroup')
