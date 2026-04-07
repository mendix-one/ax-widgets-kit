import { createWidgetContext } from '@ax/shared'

import type { SliderStore } from './store'

export const { Provider: SliderProvider, useStore: useSliderStore } = createWidgetContext<SliderStore>('Slider')
