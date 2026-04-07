
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

import { AuthLayout } from './main/AuthLayout'
import { AuthLayoutProvider, useAuthLayoutStore } from './main/context'
import { AuthLayoutStore } from './main/store'

import type { AxAuthLayoutContainerProps } from '../typings/AxAuthLayoutProps'

configure({ isolateGlobalState: true })

export function AxAuthLayout(props: AxAuthLayoutContainerProps): ReactElement {
  const themeOverrides = useMemo(() => parseThemeTokens(props.themeTokens), [props.themeTokens])

  return (
    <ErrorBoundary>
      <AxThemeProvider overrides={themeOverrides} isLayout>
        <AuthLayoutProvider createStore={() => new AuthLayoutStore()}>
          <AxAuthLayoutSync {...props} themeOverrides={themeOverrides} />
        </AuthLayoutProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}

function AxAuthLayoutSync(
  props: AxAuthLayoutContainerProps & { themeOverrides: ReturnType<typeof parseThemeTokens> },
): ReactElement {
  const store = useAuthLayoutStore()

  useEffect(() => {
    if (props.themeOverrides) setGlobalThemeTokens(props.themeOverrides)
  }, [props.themeOverrides])

  useEffect(() => {
    store.setTagline(props.tagline?.value)
  }, [store, props.tagline?.value])

  useEffect(() => {
    store.setDescription(props.brandDescription?.value)
  }, [store, props.brandDescription?.value])

  useEffect(() => {
    store.setShowBackground(props.showBackground)
  }, [store, props.showBackground])

  // Layout widget initializes the event bus and listens
  const handleEvent = useCallback(
    (event: AxEvent) => {
      if (event.action === 'toggleBackground') store.setShowBackground(!store.showBackground)
    },
    [store],
  )

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent, isLayout: true })

  return <AuthLayout>{props.content}</AuthLayout>
}
