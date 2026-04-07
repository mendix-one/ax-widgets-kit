import { type ReactElement, useCallback, useEffect, useState } from 'react'
import { type AxEvent, AxThemeProvider, ErrorBoundary, useWidgetEvents } from '@ax/shared'

import type { AxButtonContainerProps } from '../typings/AxButtonProps'

import { ButtonProvider } from './main/context'
import { Button } from './main/Button'
import { ButtonStore } from './main/store'

export function AxButton(props: AxButtonContainerProps): ReactElement {
  const [store] = useState(() => new ButtonStore())

  // Sync Mendix props to store
  useEffect(() => {
    store.setLabel(props.label?.value ?? '')
  }, [props.label?.value])

  useEffect(() => {
    store.setVariant(props.variant)
  }, [props.variant])

  useEffect(() => {
    store.setColor(props.color)
  }, [props.color])

  useEffect(() => {
    store.setSize(props.size)
  }, [props.size])

  useEffect(() => {
    store.setDisabled(props.disabled)
  }, [props.disabled])

  useEffect(() => {
    store.setFullWidth(props.fullWidth)
  }, [props.fullWidth])

  // Sync callbacks
  useEffect(() => {
    store.onClick = props.onClick?.canExecute ? () => props.onClick!.execute() : undefined
  })

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <ButtonProvider store={store}>
          <Button />
        </ButtonProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}
