
import {
  type AxEvent,
  AxThemeProvider,
  ErrorBoundary,
  parseThemeTokens,
  setGlobalThemeTokens,
  useWidgetEvents,
} from '@ax/shared'
import { type ThemeOptions } from '@mui/material/styles'
import { configure } from 'mobx'
import { type ReactElement, useCallback, useEffect, useMemo, useState } from 'react'

import { AuthLayout } from './main/AuthLayout'
import { AuthLayoutProvider, useAuthLayoutStore } from './main/context'
import { AuthLayoutStore } from './main/store'

import type { AxAuthLayoutContainerProps } from '../typings/AxAuthLayoutProps'

configure({ isolateGlobalState: true })

export function AxAuthLayout(props: AxAuthLayoutContainerProps): ReactElement {
  const themeOverrides = useMemo(() => parseThemeTokens(props.themeTokens), [props.themeTokens])
  const [runtimeMode, setRuntimeMode] = useState<'light' | 'dark' | undefined>(undefined)
  const resolvedThemeOverrides = useMemo<ThemeOptions | undefined>(() => {
    if (!runtimeMode) return themeOverrides
    return {
      ...themeOverrides,
      palette: {
        ...themeOverrides?.palette,
        mode: runtimeMode,
      },
    }
  }, [themeOverrides, runtimeMode])

  return (
    <ErrorBoundary>
      <AxThemeProvider overrides={resolvedThemeOverrides} isLayout>
        <AuthLayoutProvider createStore={() => new AuthLayoutStore()}>
          <AxAuthLayoutSync
            {...props}
            themeOverrides={resolvedThemeOverrides}
            onThemeModeChange={setRuntimeMode}
          />
        </AuthLayoutProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}

function AxAuthLayoutSync(
  props: AxAuthLayoutContainerProps & {
    themeOverrides: ReturnType<typeof parseThemeTokens>
    onThemeModeChange: (mode: 'light' | 'dark') => void
  },
): ReactElement {
  const store = useAuthLayoutStore()
  const { onThemeModeChange } = props

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
      if (event.action === 'theme-changed') {
        const payload = event.payload
        const mode =
          payload && typeof payload === 'object' && 'mode' in payload
            ? (payload.mode as unknown)
            : undefined
        if (mode === 'light' || mode === 'dark') {
          onThemeModeChange(mode)
        }
      }
    },
    [onThemeModeChange, store],
  )

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent, isLayout: true })

  return <AuthLayout>{props.content}</AuthLayout>
}
