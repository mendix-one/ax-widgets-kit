import { type AxEvent, AxThemeProvider, ErrorBoundary, useWidgetEvents } from '@ax/shared'
import { configure } from 'mobx'
import { type ReactElement, useCallback, useEffect } from 'react'

import { SliderProvider, useSliderStore } from './main/context'
import { Slider } from './main/Slider'
import { SliderStore } from './main/store'

import type { AxSliderContainerProps } from '../typings/AxSliderProps'

configure({ isolateGlobalState: true })

export function AxSlider(props: AxSliderContainerProps): ReactElement {
  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <SliderProvider createStore={() => new SliderStore()}>
          <AxSliderSync {...props} />
        </SliderProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}

function AxSliderSync(props: AxSliderContainerProps): ReactElement {
  const store = useSliderStore()

  // Sync Mendix EditableValue props to store
  useEffect(() => {
    store.syncValue(props.valueAttr?.value?.toNumber() ?? 0)
  }, [store, props.valueAttr?.value])

  useEffect(() => {
    store.setLabel(props.label?.value ?? '')
  }, [store, props.label?.value])

  useEffect(() => {
    store.setMin(props.min)
  }, [store, props.min])

  useEffect(() => {
    store.setMax(props.max)
  }, [store, props.max])

  useEffect(() => {
    store.setStep(props.step)
  }, [store, props.step])

  useEffect(() => {
    store.setDisabled(props.disabled)
  }, [store, props.disabled])

  useEffect(() => {
    store.setColor(props.color)
  }, [store, props.color])

  useEffect(() => {
    store.setSize(props.size)
  }, [store, props.size])

  useEffect(() => {
    store.setMarks(props.marks)
  }, [store, props.marks])

  useEffect(() => {
    store.setValueLabelDisplay(props.valueLabelDisplay)
  }, [store, props.valueLabelDisplay])

  // Sync callbacks
  useEffect(() => {
    store.setOnValueChange((v: number) => props.valueAttr?.setValue(new (require('big.js').Big)(v)))
    store.setOnChangeAction(props.onChange?.canExecute ? () => props.onChange!.execute() : undefined)
  })

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return <Slider />
}
