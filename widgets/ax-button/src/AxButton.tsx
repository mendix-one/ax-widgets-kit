import { type AxEvent, AxThemeProvider, ErrorBoundary, useWidgetEvents } from '@ax/shared'
import { configure } from 'mobx'
import { type ReactElement, useCallback, useEffect } from 'react'

import { Button } from './main/Button'
import { ButtonProvider, useButtonStore } from './main/context'
import { ButtonStore } from './main/store'

import type { AxButtonContainerProps } from '../typings/AxButtonProps'

configure({ isolateGlobalState: true })

export function AxButton(props: AxButtonContainerProps): ReactElement {
  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <ButtonProvider createStore={() => new ButtonStore()}>
          <AxButtonSync {...props} />
        </ButtonProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}

function AxButtonSync(props: AxButtonContainerProps): ReactElement {
  const store = useButtonStore()

  // Sync Mendix props to store
  useEffect(() => {
    store.setLabel(props.label?.value ?? '')
  }, [store, props.label?.value])

  useEffect(() => {
    store.setVariant(props.variant)
  }, [store, props.variant])

  useEffect(() => {
    store.setColor(props.color)
  }, [store, props.color])

  useEffect(() => {
    store.setSize(props.size)
  }, [store, props.size])

  useEffect(() => {
    store.setDisabled(props.disabled)
  }, [store, props.disabled])

  useEffect(() => {
    store.setFullWidth(props.fullWidth)
  }, [store, props.fullWidth])

  // Sync callbacks
  useEffect(() => {
    store.setOnClick(props.onClick?.canExecute ? () => props.onClick!.execute() : undefined)
  })

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return <Button />
}
