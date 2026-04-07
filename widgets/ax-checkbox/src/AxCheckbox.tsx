import { type AxEvent, AxThemeProvider, ErrorBoundary, useWidgetEvents } from '@ax/shared'
import { configure } from 'mobx'
import { type ReactElement, useCallback, useEffect } from 'react'

import { Checkbox } from './main/Checkbox'
import { CheckboxProvider, useCheckboxStore } from './main/context'
import { CheckboxStore } from './main/store'

import type { AxCheckboxContainerProps } from '../typings/AxCheckboxProps'

configure({ isolateGlobalState: true })

export function AxCheckbox(props: AxCheckboxContainerProps): ReactElement {
  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <CheckboxProvider createStore={() => new CheckboxStore()}>
          <AxCheckboxSync {...props} />
        </CheckboxProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}

function AxCheckboxSync(props: AxCheckboxContainerProps): ReactElement {
  const store = useCheckboxStore()

  // Sync Mendix EditableValue props to store
  useEffect(() => {
    store.syncChecked(props.checkedAttr?.value ?? false)
  }, [store, props.checkedAttr?.value])

  useEffect(() => {
    store.setLabel(props.label?.value ?? '')
  }, [store, props.label?.value])

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
    store.setOnCheckedChange((v: boolean) => props.checkedAttr?.setValue(v))
    store.setOnChangeAction(props.onChange?.canExecute ? () => props.onChange!.execute() : undefined)
  })

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return <Checkbox />
}
