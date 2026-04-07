
import {
  type AxEvent,
  AxThemeProvider,
  ErrorBoundary,
  parseThemeTokens,
  setGlobalThemeTokens,
  useWidgetEvents,
} from '@ax/shared'
import { configure } from 'mobx'
import { type ReactElement, useCallback, useEffect, useMemo } from 'react'

import { WebAppProvider, useWebAppStore } from './main/context'
import { WebAppStore } from './main/store'
import { WebAppLayout } from './main/WebAppLayout'

import type { AxWebAppContainerProps } from '../typings/AxWebAppProps'

configure({ isolateGlobalState: true })

export function AxWebApp(props: AxWebAppContainerProps): ReactElement {
  const themeOverrides = useMemo(() => parseThemeTokens(props.themeTokens), [props.themeTokens])

  return (
    <ErrorBoundary>
      <AxThemeProvider overrides={themeOverrides} isLayout>
        <WebAppProvider createStore={() => new WebAppStore()}>
          <AxWebAppSync {...props} themeOverrides={themeOverrides} />
        </WebAppProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}

function AxWebAppSync(
  props: AxWebAppContainerProps & { themeOverrides: ReturnType<typeof parseThemeTokens> },
): ReactElement {
  const store = useWebAppStore()

  useEffect(() => {
    if (props.themeOverrides) setGlobalThemeTokens(props.themeOverrides)
  }, [props.themeOverrides])

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
    <WebAppLayout
      logo={props.logo}
      tasksMenu={props.tasksMenu}
      notifyMenu={props.notifyMenu}
      userMenu={props.userMenu}
      sidebar={props.sidebar}
      content={props.content}
      agentChat={props.agentChat}
    />
  )
}
