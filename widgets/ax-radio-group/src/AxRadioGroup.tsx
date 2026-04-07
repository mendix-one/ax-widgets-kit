import { type ReactElement, useCallback, useEffect, useState } from 'react'
import { type AxEvent, AxThemeProvider, ErrorBoundary, useWidgetEvents } from '@ax/shared'

import type { AxRadioGroupContainerProps } from '../typings/AxRadioGroupProps'

import { RadioGroupProvider } from './main/context'
import { RadioGroup } from './main/RadioGroup'
import { RadioGroupStore } from './main/store'

export function AxRadioGroup(props: AxRadioGroupContainerProps): ReactElement {
  const [store] = useState(() => new RadioGroupStore())

  // Sync Mendix EditableValue props to store
  useEffect(() => {
    store.syncValue(props.valueAttr?.value ?? '')
  }, [props.valueAttr?.value])

  useEffect(() => {
    store.setLabel(props.label?.value ?? '')
  }, [props.label?.value])

  // Map Mendix object list to simple {value, label} array
  useEffect(() => {
    const mapped = props.options.map((opt) => ({
      value: opt.optValue,
      label: opt.optLabel?.value ?? opt.optValue,
    }))
    store.setOptions(mapped)
  }, [props.options])

  useEffect(() => {
    store.setRow(props.row)
  }, [props.row])

  useEffect(() => {
    store.setColor(props.color)
  }, [props.color])

  useEffect(() => {
    store.setSize(props.size)
  }, [props.size])

  useEffect(() => {
    store.setDisabled(props.disabled)
  }, [props.disabled])

  // Sync callbacks
  useEffect(() => {
    store.onValueChange = (v: string) => props.valueAttr?.setValue(v)
    store.onChangeAction = props.onChange?.canExecute ? () => props.onChange!.execute() : undefined
  })

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <RadioGroupProvider store={store}>
          <RadioGroup />
        </RadioGroupProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}
