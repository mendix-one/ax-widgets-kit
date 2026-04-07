import { createWidgetContext } from '@ax/shared'

import { type SidebarStore } from './store'

export const { Provider: SidebarProvider, useStore: useSidebarStore } = createWidgetContext<SidebarStore>('Sidebar')
