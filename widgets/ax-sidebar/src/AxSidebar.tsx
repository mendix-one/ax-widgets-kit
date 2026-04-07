import { type ReactElement, useCallback, useState } from 'react'
import { AxThemeProvider, ErrorBoundary, useWidgetEvents, type AxEvent } from '@ax/shared'

import type { AxSidebarContainerProps } from '../typings/AxSidebarProps'

import { SidebarProvider } from './main/context'
import { Sidebar } from './main/Sidebar'
import { SidebarIcon } from './main/SidebarIcon'
import { SidebarStore } from './main/store'

const defaultItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <SidebarIcon type="dashboard" /> },
  { id: 'analytics', label: 'Yield Analysis', icon: <SidebarIcon type="analytics" /> },
  { id: 'defects', label: 'Defect Analysis', icon: <SidebarIcon type="defects" /> },
  { id: 'lots', label: 'Lot Tracking', icon: <SidebarIcon type="lots" /> },
  { id: 'roadmap', label: 'Technology Roadmap', icon: <SidebarIcon type="roadmap" /> },
]

export function AxSidebar(props: AxSidebarContainerProps): ReactElement {
  const [store] = useState(() => {
    const s = new SidebarStore()
    s.setItems(defaultItems)
    s.setActiveId(defaultItems[0]?.id ?? '')
    return s
  })

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <SidebarProvider store={store}>
          <Sidebar>{props.content}</Sidebar>
        </SidebarProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}
