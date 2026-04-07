import { type ReactElement, useCallback, useEffect, useState } from 'react'
import { type AxEvent, AxThemeProvider, ErrorBoundary, useWidgetEvents } from '@ax/shared'

import type { AxTextFieldContainerProps } from '../typings/AxTextFieldProps'

import { TextFieldProvider } from './main/context'
import { TextField } from './main/TextField'
import { TextFieldStore } from './main/store'

export function AxTextField(props: AxTextFieldContainerProps): ReactElement {
  const [store] = useState(() => new TextFieldStore())

  // Sync Mendix EditableValue props to store
  useEffect(() => {
    store.syncValue(props.valueAttr?.value ?? '')
  }, [props.valueAttr?.value])

  useEffect(() => {
    store.setReadOnly(props.valueAttr?.readOnly ?? false)
  }, [props.valueAttr?.readOnly])

  useEffect(() => {
    store.setLabel(props.label?.value ?? '')
  }, [props.label?.value])

  useEffect(() => {
    store.setPlaceholder(props.placeholder?.value ?? '')
  }, [props.placeholder?.value])

  useEffect(() => {
    store.setHelperText(props.helperText?.value ?? '')
  }, [props.helperText?.value])

  useEffect(() => {
    store.setVariant(props.variant)
  }, [props.variant])

  useEffect(() => {
    store.setSize(props.size)
  }, [props.size])

  useEffect(() => {
    store.setInputType(props.inputType)
  }, [props.inputType])

  useEffect(() => {
    store.setMultiline(props.multiline)
  }, [props.multiline])

  useEffect(() => {
    store.setRows(props.rows)
  }, [props.rows])

  useEffect(() => {
    store.setMaxRows(props.maxRows)
  }, [props.maxRows])

  useEffect(() => {
    store.setRequired(props.required)
  }, [props.required])

  useEffect(() => {
    store.setFullWidth(props.fullWidth)
  }, [props.fullWidth])

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
        <TextFieldProvider store={store}>
          <TextField />
        </TextFieldProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}
