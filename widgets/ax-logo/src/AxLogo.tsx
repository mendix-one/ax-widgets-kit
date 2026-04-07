import { type ReactElement, useCallback, useEffect, useState } from 'react'
import { AxThemeProvider, ErrorBoundary, useWidgetEvents, type AxEvent } from '@ax/shared'

import type { AxLogoContainerProps } from '../typings/AxLogoProps'

import { LogoProvider } from './main/context'
import { Logo } from './main/Logo'
import { LogoStore } from './main/store'

export function AxLogo(props: AxLogoContainerProps): ReactElement {
  const [store] = useState(() => new LogoStore())

  useEffect(() => {
    store.src = props.logoUrl?.value
  }, [store, props.logoUrl?.value])

  useEffect(() => {
    store.alt = props.altText?.value
  }, [store, props.altText?.value])

  useEffect(() => {
    store.height = props.height
  }, [store, props.height])

  useEffect(() => {
    store.setOnClick(props.onClick?.canExecute ? () => props.onClick?.execute() : undefined)
  }, [store, props.onClick?.canExecute])

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <LogoProvider store={store}>
          <Logo />
        </LogoProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}
