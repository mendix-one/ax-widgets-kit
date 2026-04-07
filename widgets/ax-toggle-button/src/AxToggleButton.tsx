import { type AxEvent, AxThemeProvider, ErrorBoundary, useWidgetEvents } from '@ax/shared'
import { configure } from 'mobx'
import { type ReactElement, useCallback, useEffect } from 'react'

import { ToggleButtonProvider, useToggleButtonStore } from './main/context'
import { ToggleButtonStore } from './main/store'
import { ToggleButton } from './main/ToggleButton'

import type { AxToggleButtonContainerProps } from '../typings/AxToggleButtonProps'

configure({ isolateGlobalState: true })

export function AxToggleButton(props: AxToggleButtonContainerProps): ReactElement {
  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <ToggleButtonProvider createStore={() => new ToggleButtonStore()}>
          <AxToggleButtonSync {...props} />
        </ToggleButtonProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}

function AxToggleButtonSync(props: AxToggleButtonContainerProps): ReactElement {
  const store = useToggleButtonStore()

  // Sync Mendix EditableValue props to store
  useEffect(() => {
    store.syncValue(props.valueAttr?.value ?? '')
  }, [store, props.valueAttr?.value])

  useEffect(() => {
    store.setOptions(
      props.options.map((opt) => ({
        value: opt.optValue,
        label: opt.optLabel?.value ?? opt.optValue,
      })),
    )
  }, [store, props.options])

  useEffect(() => {
    store.setExclusive(props.exclusive)
  }, [store, props.exclusive])

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

  // Sync callbacks
  useEffect(() => {
    store.setOnValueChange((v: string) => props.valueAttr?.setValue(v))
    store.setOnChangeAction(props.onChange?.canExecute ? () => props.onChange!.execute() : undefined)
  })

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return <ToggleButton />
}
