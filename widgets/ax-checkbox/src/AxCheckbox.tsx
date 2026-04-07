import { type AxEvent, AxThemeProvider, ErrorBoundary, useWidgetEvents } from '@ax/shared'
import { type ReactElement, useCallback, useEffect, useState } from 'react'


import { Checkbox } from './main/Checkbox'
import { CheckboxProvider } from './main/context'
import { CheckboxStore } from './main/store'

import type { AxCheckboxContainerProps } from '../typings/AxCheckboxProps'

export function AxCheckbox(props: AxCheckboxContainerProps): ReactElement {
  const [store] = useState(() => new CheckboxStore())

  // Sync Mendix EditableValue props to store
  useEffect(() => {
    store.syncChecked(props.checkedAttr?.value ?? false)
  }, [props.checkedAttr?.value])

  useEffect(() => {
    store.setLabel(props.label?.value ?? '')
  }, [props.label?.value])

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
    store.onCheckedChange = (v: boolean) => props.checkedAttr?.setValue(v)
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
        <CheckboxProvider store={store}>
          <Checkbox />
        </CheckboxProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}
