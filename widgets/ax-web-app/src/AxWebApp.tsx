import { type ReactElement, useCallback, useEffect, useMemo, useState } from 'react'

import {
  type AxEvent,
  AxThemeProvider,
  ErrorBoundary,
  parseThemeTokens,
  setGlobalThemeTokens,
  useWidgetEvents,
} from '@ax/shared'

import type { AxWebAppContainerProps } from '../typings/AxWebAppProps'

import { WebAppProvider } from './main/context'
import { WebAppStore } from './main/store'
import { WebAppLayout } from './main/WebAppLayout'

export function AxWebApp(props: AxWebAppContainerProps): ReactElement {
  const [store] = useState(() => new WebAppStore())

  const themeOverrides = useMemo(() => parseThemeTokens(props.themeTokens), [props.themeTokens])

  useEffect(() => {
    if (themeOverrides) setGlobalThemeTokens(themeOverrides)
  }, [themeOverrides])

  // Layout widget initializes the event bus and listens
  const handleEvent = useCallback(
    (event: AxEvent) => {
      if (event.action === 'toggleSidebar') store.toggleSidebar(false)
      else if (event.action === 'toggleAgent') store.toggleAgent()
    },
    [store],
  )

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent, isLayout: true })

  return (
    <ErrorBoundary>
      <AxThemeProvider overrides={themeOverrides} isLayout>
        <WebAppProvider store={store}>
          <WebAppLayout
            logo={props.logo}
            tasksMenu={props.tasksMenu}
            notifyMenu={props.notifyMenu}
            userMenu={props.userMenu}
            sidebar={props.sidebar}
            content={props.content}
            agentChat={props.agentChat}
          />
        </WebAppProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}
