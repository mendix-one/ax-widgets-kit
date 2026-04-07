import { type AxEvent, AxThemeProvider, ErrorBoundary, useWidgetEvents } from '@ax/shared'
import { configure } from 'mobx'
import { type ReactElement, useCallback, useEffect } from 'react'

import { TextFieldProvider, useTextFieldStore } from './main/context'
import { TextFieldStore } from './main/store'
import { TextField } from './main/TextField'

import type { AxTextFieldContainerProps } from '../typings/AxTextFieldProps'

configure({ isolateGlobalState: true })

export function AxTextField(props: AxTextFieldContainerProps): ReactElement {
  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <TextFieldProvider createStore={() => new TextFieldStore()}>
          <AxTextFieldSync {...props} />
        </TextFieldProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}

function AxTextFieldSync(props: AxTextFieldContainerProps): ReactElement {
  const store = useTextFieldStore()

  // Sync Mendix EditableValue props to store
  useEffect(() => {
    store.syncValue(props.valueAttr?.value ?? '')
  }, [store, props.valueAttr?.value])

  useEffect(() => {
    store.setReadOnly(props.valueAttr?.readOnly ?? false)
  }, [store, props.valueAttr?.readOnly])

  useEffect(() => {
    store.setLabel(props.label?.value ?? '')
  }, [store, props.label?.value])

  useEffect(() => {
    store.setPlaceholder(props.placeholder?.value ?? '')
  }, [store, props.placeholder?.value])

  useEffect(() => {
    store.setHelperText(props.helperText?.value ?? '')
  }, [store, props.helperText?.value])

  useEffect(() => {
    store.setVariant(props.variant)
  }, [store, props.variant])

  useEffect(() => {
    store.setSize(props.size)
  }, [store, props.size])

  useEffect(() => {
    store.setInputType(props.inputType)
  }, [store, props.inputType])

  useEffect(() => {
    store.setMultiline(props.multiline)
  }, [store, props.multiline])

  useEffect(() => {
    store.setRows(props.rows)
  }, [store, props.rows])

  useEffect(() => {
    store.setMaxRows(props.maxRows)
  }, [store, props.maxRows])

  useEffect(() => {
    store.setRequired(props.required)
  }, [store, props.required])

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

  return <TextField />
}
