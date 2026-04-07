import { type ReactElement, useCallback, useEffect, useMemo, useState } from 'react'

import {
  type AxEvent,
  AxThemeProvider,
  ErrorBoundary,
  parseThemeTokens,
  setGlobalThemeTokens,
  useWidgetEvents,
} from '@ax/shared'

import type { AxAuthLayoutContainerProps } from '../typings/AxAuthLayoutProps'

import { AuthLayout } from './main/AuthLayout'
import { AuthLayoutProvider } from './main/context'
import { AuthLayoutStore } from './main/store'

export function AxAuthLayout(props: AxAuthLayoutContainerProps): ReactElement {
  const [store] = useState(() => new AuthLayoutStore())

  const themeOverrides = useMemo(() => parseThemeTokens(props.themeTokens), [props.themeTokens])

  useEffect(() => {
    if (themeOverrides) setGlobalThemeTokens(themeOverrides)
  }, [themeOverrides])

  useEffect(() => {
    store.tagline = props.tagline?.value
  }, [store, props.tagline?.value])

  useEffect(() => {
    store.description = props.brandDescription?.value
  }, [store, props.brandDescription?.value])

  useEffect(() => {
    store.showBackground = props.showBackground
  }, [store, props.showBackground])

  // Layout widget initializes the event bus and listens
  const handleEvent = useCallback(
    (event: AxEvent) => {
      if (event.action === 'toggleBackground') store.showBackground = !store.showBackground
    },
    [store],
  )

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent, isLayout: true })

  return (
    <ErrorBoundary>
      <AxThemeProvider overrides={themeOverrides} isLayout>
        <AuthLayoutProvider store={store}>
          <AuthLayout>{props.content}</AuthLayout>
        </AuthLayoutProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}
