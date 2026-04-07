import { type AxEvent, AxThemeProvider, ErrorBoundary, isLoading, useWidgetEvents } from '@ax/shared'
import { configure } from 'mobx'
import { type ReactElement, useCallback, useEffect } from 'react'

import { SwitchProvider, useSwitchStore } from './main/context'
import { SwitchStore } from './main/store'
import { Switch } from './main/Switch'

import type { AxSwitchContainerProps } from '../typings/AxSwitchProps'

configure({ isolateGlobalState: true })

export function AxSwitch(props: AxSwitchContainerProps): ReactElement {
  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <SwitchProvider createStore={() => new SwitchStore()}>
          <AxSwitchSync {...props} />
        </SwitchProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}

function AxSwitchSync(props: AxSwitchContainerProps): ReactElement {
  const store = useSwitchStore()

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

  useEffect(() => {
    store.setLabelPlacement(props.labelPlacement)
  }, [store, props.labelPlacement])

  // Sync callbacks
  useEffect(() => {
    store.setOnCheckedChange((v: boolean) => props.checkedAttr?.setValue(v))
    store.setOnChangeAction(props.onChange?.canExecute ? () => props.onChange!.execute() : undefined)
  })

  // Sync validation + loading state
  useEffect(() => {
    store.setValidation(props.checkedAttr?.validation)
  }, [store, props.checkedAttr?.validation])

  useEffect(() => {
    store.setLoading(isLoading(props.checkedAttr))
  }, [store, props.checkedAttr?.status])

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return <Switch />
}
