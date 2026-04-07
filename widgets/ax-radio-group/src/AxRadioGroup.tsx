import { type AxEvent, AxThemeProvider, ErrorBoundary, useWidgetEvents } from '@ax/shared'
import { configure } from 'mobx'
import { type ReactElement, useCallback, useEffect } from 'react'

import { RadioGroupProvider, useRadioGroupStore } from './main/context'
import { RadioGroup } from './main/RadioGroup'
import { RadioGroupStore } from './main/store'

import type { AxRadioGroupContainerProps } from '../typings/AxRadioGroupProps'

configure({ isolateGlobalState: true })

export function AxRadioGroup(props: AxRadioGroupContainerProps): ReactElement {
  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <RadioGroupProvider createStore={() => new RadioGroupStore()}>
          <AxRadioGroupSync {...props} />
        </RadioGroupProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}

function AxRadioGroupSync(props: AxRadioGroupContainerProps): ReactElement {
  const store = useRadioGroupStore()

  // Sync Mendix EditableValue props to store
  useEffect(() => {
    store.syncValue(props.valueAttr?.value ?? '')
  }, [store, props.valueAttr?.value])

  useEffect(() => {
    store.setLabel(props.label?.value ?? '')
  }, [store, props.label?.value])

  // Map Mendix object list to simple {value, label} array
  useEffect(() => {
    const mapped = props.options.map((opt) => ({
      value: opt.optValue,
      label: opt.optLabel?.value ?? opt.optValue,
    }))
    store.setOptions(mapped)
  }, [store, props.options])

  useEffect(() => {
    store.setRow(props.row)
  }, [store, props.row])

  useEffect(() => {
    store.setColor(props.color)
  }, [store, props.color])

  useEffect(() => {
    store.setSize(props.size)
  }, [store, props.size])

  useEffect(() => {
    store.setDisabled(props.disabled)
  }, [store, props.disabled])

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

  return <RadioGroup />
}
