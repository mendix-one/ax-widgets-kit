import { type AxEvent, AxThemeProvider, ErrorBoundary, isLoading, useWidgetEvents } from '@ax/shared'
import { configure } from 'mobx'
import { type ReactElement, useCallback, useEffect } from 'react'

import { SelectProvider, useSelectStore } from './main/context'
import { Select } from './main/Select'
import { SelectStore } from './main/store'

import type { AxSelectContainerProps } from '../typings/AxSelectProps'

configure({ isolateGlobalState: true })

export function AxSelect(props: AxSelectContainerProps): ReactElement {
  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <SelectProvider createStore={() => new SelectStore()}>
          <AxSelectSync {...props} />
        </SelectProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}

function AxSelectSync(props: AxSelectContainerProps): ReactElement {
  const store = useSelectStore()

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
    store.setVariant(props.variant)
  }, [store, props.variant])

  useEffect(() => {
    store.setSize(props.size)
  }, [store, props.size])

  useEffect(() => {
    store.setDisabled(props.disabled)
  }, [store, props.disabled])

  useEffect(() => {
    store.setFullWidth(props.fullWidth)
  }, [store, props.fullWidth])

  useEffect(() => {
    store.setHelperText(props.helperText?.value ?? '')
  }, [store, props.helperText?.value])

  // Sync callbacks
  useEffect(() => {
    store.setOnValueChange((v: string) => props.valueAttr?.setValue(v))
    store.setOnChangeAction(props.onChange?.canExecute ? () => props.onChange!.execute() : undefined)
  })

  // Sync validation + loading state
  useEffect(() => {
    store.setValidation(props.valueAttr?.validation)
  }, [store, props.valueAttr?.validation])

  useEffect(() => {
    store.setLoading(isLoading(props.valueAttr))
  }, [store, props.valueAttr?.status])

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return <Select />
}
