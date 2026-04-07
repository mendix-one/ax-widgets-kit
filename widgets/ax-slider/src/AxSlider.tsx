import { type ReactElement, useCallback, useEffect, useState } from 'react'
import { type AxEvent, AxThemeProvider, ErrorBoundary, useWidgetEvents } from '@ax/shared'

import type { AxSliderContainerProps } from '../typings/AxSliderProps'

import { SliderProvider } from './main/context'
import { Slider } from './main/Slider'
import { SliderStore } from './main/store'

export function AxSlider(props: AxSliderContainerProps): ReactElement {
  const [store] = useState(() => new SliderStore())

  // Sync Mendix EditableValue props to store
  useEffect(() => {
    store.syncValue(props.valueAttr?.value?.toNumber() ?? 0)
  }, [props.valueAttr?.value])

  useEffect(() => {
    store.setLabel(props.label?.value ?? '')
  }, [props.label?.value])

  useEffect(() => {
    store.setMin(props.min)
  }, [props.min])

  useEffect(() => {
    store.setMax(props.max)
  }, [props.max])

  useEffect(() => {
    store.setStep(props.step)
  }, [props.step])

  useEffect(() => {
    store.setDisabled(props.disabled)
  }, [props.disabled])

  useEffect(() => {
    store.setColor(props.color)
  }, [props.color])

  useEffect(() => {
    store.setSize(props.size)
  }, [props.size])

  useEffect(() => {
    store.setMarks(props.marks)
  }, [props.marks])

  useEffect(() => {
    store.setValueLabelDisplay(props.valueLabelDisplay)
  }, [props.valueLabelDisplay])

  // Sync callbacks
  useEffect(() => {
    store.onValueChange = (v: number) => props.valueAttr?.setValue(new (require('big.js').Big)(v))
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
        <SliderProvider store={store}>
          <Slider />
        </SliderProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}
