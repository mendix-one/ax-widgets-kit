import { AxThemeProvider, ErrorBoundary, useWidgetEvents, type AxEvent } from '@ax/shared'
import { configure } from 'mobx'
import { type ReactElement, useCallback, useEffect } from 'react'

import { LogoProvider, useLogoStore } from './main/context'
import { Logo } from './main/Logo'
import { LogoStore } from './main/store'

import type { AxLogoContainerProps } from '../typings/AxLogoProps'

configure({ isolateGlobalState: true })

export function AxLogo(props: AxLogoContainerProps): ReactElement {
  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <LogoProvider createStore={() => new LogoStore()}>
          <AxLogoSync {...props} />
        </LogoProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}

function AxLogoSync(props: AxLogoContainerProps): ReactElement {
  const store = useLogoStore()

  useEffect(() => {
    store.setSrc(props.logoUrl?.value?.uri)
  }, [store, props.logoUrl?.value])

  useEffect(() => {
    store.setAlt(props.altText?.value)
  }, [store, props.altText?.value])

  useEffect(() => {
    store.setHeight(props.height)
  }, [store, props.height])

  useEffect(() => {
    store.setOnClick(props.onClick?.canExecute ? () => props.onClick?.execute() : undefined)
  }, [store, props.onClick?.canExecute])

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return <Logo />
}
