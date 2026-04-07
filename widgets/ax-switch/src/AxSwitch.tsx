import { type ReactElement, useCallback, useEffect, useState } from 'react'
import { type AxEvent, AxThemeProvider, ErrorBoundary, useWidgetEvents, isLoading } from '@ax/shared'

import type { AxSwitchContainerProps } from '../typings/AxSwitchProps'

import { SwitchProvider } from './main/context'
import { Switch } from './main/Switch'
import { SwitchStore } from './main/store'

export function AxSwitch(props: AxSwitchContainerProps): ReactElement {
  const [store] = useState(() => new SwitchStore())

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

  useEffect(() => {
    store.setLabelPlacement(props.labelPlacement)
  }, [props.labelPlacement])

  // Sync callbacks
  useEffect(() => {
    store.onCheckedChange = (v: boolean) => props.checkedAttr?.setValue(v)
    store.onChangeAction = props.onChange?.canExecute ? () => props.onChange!.execute() : undefined
  })


  // Sync validation + loading state
  useEffect(() => {
    store.setValidation(props.checkedAttr?.validation)
  }, [props.checkedAttr?.validation])

  useEffect(() => {
    store.setLoading(isLoading(props.checkedAttr))
  }, [props.checkedAttr?.status])

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <SwitchProvider store={store}>
          <Switch />
        </SwitchProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}
