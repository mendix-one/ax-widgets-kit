import { type ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'

import { type AxSliderPreviewProps } from '../typings/AxSliderProps'
import { SliderPreview } from './preview/SliderPreview'

export function preview(props: AxSliderPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
    <div className={props.class} style={props.styleObject}>
    <SliderPreview
      label={props.label}
      min={props.min}
      max={props.max}
      step={props.step}
      color={props.color}
      size={props.size}
      marks={props.marks}
      valueLabelDisplay={props.valueLabelDisplay}
      disabled={props.readOnly || props.disabled}
    />
      </div>
    </ErrorBoundary>
)
}

export function getPreviewCss(): string {
  return require('./styles/AxSliderPreview.scss')
}
