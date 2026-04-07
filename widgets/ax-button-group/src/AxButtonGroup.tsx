import { type AxEvent, AxThemeProvider, ErrorBoundary, useWidgetEvents } from '@ax/shared'
import { configure } from 'mobx'
import { type ReactElement, useCallback, useEffect } from 'react'

import { ButtonGroup } from './main/ButtonGroup'
import { ButtonGroupProvider, useButtonGroupStore } from './main/context'
import { ButtonGroupStore } from './main/store'

import type { AxButtonGroupContainerProps } from '../typings/AxButtonGroupProps'

configure({ isolateGlobalState: true })

export function AxButtonGroup(props: AxButtonGroupContainerProps): ReactElement {
  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <ButtonGroupProvider createStore={() => new ButtonGroupStore()}>
          <AxButtonGroupSync {...props} />
        </ButtonGroupProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}

function AxButtonGroupSync(props: AxButtonGroupContainerProps): ReactElement {
  const store = useButtonGroupStore()

  // Sync Mendix props to store
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
    store.setOrientation(props.orientation)
  }, [store, props.orientation])

  useEffect(() => {
    store.setDisabled(props.disabled)
  }, [store, props.disabled])

  useEffect(() => {
    store.setFullWidth(props.fullWidth)
  }, [store, props.fullWidth])

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return <ButtonGroup>{props.content}</ButtonGroup>
}
