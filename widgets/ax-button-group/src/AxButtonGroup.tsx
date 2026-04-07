import { type ReactElement, useCallback, useEffect, useState } from 'react'
import { type AxEvent, AxThemeProvider, ErrorBoundary, useWidgetEvents } from '@ax/shared'

import type { AxButtonGroupContainerProps } from '../typings/AxButtonGroupProps'

import { ButtonGroupProvider } from './main/context'
import { ButtonGroup } from './main/ButtonGroup'
import { ButtonGroupStore } from './main/store'

export function AxButtonGroup(props: AxButtonGroupContainerProps): ReactElement {
  const [store] = useState(() => new ButtonGroupStore())

  // Sync Mendix props to store
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
    store.setOrientation(props.orientation)
  }, [props.orientation])

  useEffect(() => {
    store.setDisabled(props.disabled)
  }, [props.disabled])

  useEffect(() => {
    store.setFullWidth(props.fullWidth)
  }, [props.fullWidth])

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <ButtonGroupProvider store={store}>
          <ButtonGroup>{props.content}</ButtonGroup>
        </ButtonGroupProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}
