import { type ReactElement, useCallback, useEffect, useState } from 'react'
import { AxThemeProvider, ErrorBoundary, executeAction, useWidgetEvents, type AxEvent } from '@ax/shared'

import type { AxNotifyMenuContainerProps } from '../typings/AxNotifyMenuProps'

import { NotifyMenuProvider } from './main/context'
import { NotifyMenuStore } from './main/store'
import { NotifyMenu } from './main/NotifyMenu'

const sampleNotifications = [
  {
    id: 1,
    type: 'danger' as const,
    title: 'Defect rate critical',
    description: 'Defect rate exceeded 3% threshold on Etching line — immediate review required.',
    timestamp: '10 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'danger' as const,
    title: 'Yield drop on Line 3',
    description: 'Overall yield dropped below 90% on Line 3 during the last shift.',
    timestamp: '35 minutes ago',
    read: false,
  },
  {
    id: 3,
    type: 'warning' as const,
    title: 'CMP tool calibration overdue',
    description: 'CMP-04 calibration is 2 days overdue. Schedule maintenance to avoid drift.',
    timestamp: '4 hours ago',
    read: false,
  },
  {
    id: 4,
    type: 'warning' as const,
    title: 'Maintenance scheduled',
    description: 'Preventive maintenance for Litho-07 is scheduled for tomorrow 06:00-10:00.',
    timestamp: '1 day ago',
    read: true,
  },
  {
    id: 5,
    type: 'info' as const,
    title: 'Weekly yield report ready',
    description: 'The yield analysis report for Week 12 is now available for review.',
    timestamp: '3 days ago',
    read: true,
  },
]

export function AxNotifyMenu(props: AxNotifyMenuContainerProps): ReactElement {
  const [store] = useState(() => new NotifyMenuStore())

  useEffect(() => {
    store.setTitle(props.title?.value ?? 'Notifications')
  }, [props.title?.value])

  useEffect(() => {
    store.setItems(sampleNotifications)
  }, [])

  useEffect(() => {
    store.setOnNotifyClick(() => executeAction(props.onNotifyClick))
  }, [props.onNotifyClick?.canExecute])

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return (
    <ErrorBoundary>
      <div className={props.class} style={{ ...props.style, display: 'inline-flex' }}>
        <AxThemeProvider>
          <NotifyMenuProvider store={store}>
            <NotifyMenu />
          </NotifyMenuProvider>
        </AxThemeProvider>
      </div>
    </ErrorBoundary>
  )
}
