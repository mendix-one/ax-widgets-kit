import { type ReactElement, useCallback, useEffect, useState } from 'react'
import { type AxEvent, AxThemeProvider, ErrorBoundary, useWidgetEvents, isLoading } from '@ax/shared'

import type { AxSelectContainerProps } from '../typings/AxSelectProps'

import { SelectProvider } from './main/context'
import { Select } from './main/Select'
import { SelectStore } from './main/store'

export function AxSelect(props: AxSelectContainerProps): ReactElement {
  const [store] = useState(() => new SelectStore())

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
    store.setVariant(props.variant)
  }, [props.variant])

  useEffect(() => {
    store.setSize(props.size)
  }, [props.size])

  useEffect(() => {
    store.setDisabled(props.disabled)
  }, [props.disabled])

  useEffect(() => {
    store.setFullWidth(props.fullWidth)
  }, [props.fullWidth])

  useEffect(() => {
    store.setHelperText(props.helperText?.value ?? '')
  }, [props.helperText?.value])

  // Sync callbacks
  useEffect(() => {
    store.onValueChange = (v: string) => props.valueAttr?.setValue(v)
    store.onChangeAction = props.onChange?.canExecute ? () => props.onChange!.execute() : undefined
  })


  // Sync validation + loading state
  useEffect(() => {
    store.setValidation(props.valueAttr?.validation)
  }, [props.valueAttr?.validation])

  useEffect(() => {
    store.setLoading(isLoading(props.valueAttr))
  }, [props.valueAttr?.status])

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <SelectProvider store={store}>
          <Select />
        </SelectProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}
