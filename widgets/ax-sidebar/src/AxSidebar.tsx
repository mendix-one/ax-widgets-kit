import { AxThemeProvider, ErrorBoundary, useWidgetEvents, type AxEvent } from '@ax/shared'
import { configure } from 'mobx'
import { type ReactElement, useCallback } from 'react'

import { SidebarProvider } from './main/context'
import { Sidebar } from './main/Sidebar'
import { SidebarIcon } from './main/SidebarIcon'
import { SidebarStore } from './main/store'

import type { AxSidebarContainerProps } from '../typings/AxSidebarProps'

configure({ isolateGlobalState: true })

const defaultItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <SidebarIcon type="dashboard" /> },
  { id: 'analytics', label: 'Yield Analysis', icon: <SidebarIcon type="analytics" /> },
  { id: 'defects', label: 'Defect Analysis', icon: <SidebarIcon type="defects" /> },
  { id: 'lots', label: 'Lot Tracking', icon: <SidebarIcon type="lots" /> },
  { id: 'roadmap', label: 'Technology Roadmap', icon: <SidebarIcon type="roadmap" /> },
]

export function AxSidebar(props: AxSidebarContainerProps): ReactElement {
  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <SidebarProvider
          createStore={() => {
            const s = new SidebarStore()
            s.setItems(defaultItems)
            s.setActiveId(defaultItems[0]?.id ?? '')
            return s
          }}
        >
          <AxSidebarSync {...props} />
        </SidebarProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}

function AxSidebarSync(props: AxSidebarContainerProps): ReactElement {
  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return <Sidebar>{props.content}</Sidebar>
}
