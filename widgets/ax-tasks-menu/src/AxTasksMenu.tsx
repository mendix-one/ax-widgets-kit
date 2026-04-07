import { AxThemeProvider, ErrorBoundary, executeAction, useWidgetEvents, type AxEvent } from '@ax/shared'
import { configure } from 'mobx'
import { type ReactElement, useCallback, useEffect } from 'react'

import { TasksMenuProvider, useTasksMenuStore } from './main/context'
import { TasksMenuStore } from './main/store'
import { TasksMenu } from './main/TasksMenu'

import type { AxTasksMenuContainerProps } from '../typings/AxTasksMenuProps'

configure({ isolateGlobalState: true })

const sampleTasks = [
  {
    id: 1,
    title: 'Yield drop on Line 3',
    description: 'Overall yield dropped below 90% — investigate root cause and escalate.',
    timestamp: '15 minutes ago',
    done: false,
  },
  {
    id: 2,
    title: 'CMP tool calibration overdue',
    description: 'CMP-04 calibration is 2 days overdue. Schedule maintenance immediately.',
    timestamp: '2 hours ago',
    done: false,
  },
  {
    id: 3,
    title: 'Lot #W-4821 hold review',
    description: 'Lot placed on hold due to contamination flag — review and disposition.',
    timestamp: '5 hours ago',
    done: false,
  },
]

export function AxTasksMenu(props: AxTasksMenuContainerProps): ReactElement {
  return (
    <ErrorBoundary>
      <div className={props.class} style={{ ...props.style, display: 'inline-flex' }}>
        <AxThemeProvider>
          <TasksMenuProvider createStore={() => new TasksMenuStore()}>
            <AxTasksMenuSync {...props} />
          </TasksMenuProvider>
        </AxThemeProvider>
      </div>
    </ErrorBoundary>
  )
}

function AxTasksMenuSync(props: AxTasksMenuContainerProps): ReactElement {
  const store = useTasksMenuStore()

  useEffect(() => {
    store.setTitle(props.title?.value ?? 'Urgent tasks')
  }, [store, props.title?.value])

  useEffect(() => {
    store.setItems(sampleTasks)
  }, [store])

  useEffect(() => {
    store.setOnTaskClick(() => executeAction(props.onTaskClick))
  }, [store, props.onTaskClick?.canExecute])

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return <TasksMenu />
}
