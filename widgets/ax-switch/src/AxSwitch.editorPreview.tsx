import { type ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'

import { type AxSwitchPreviewProps } from '../typings/AxSwitchProps'
import { SwitchPreview } from './preview/SwitchPreview'

export function preview(props: AxSwitchPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
    <div className={props.class} style={props.styleObject}>
    <SwitchPreview
      label={props.label}
      color={props.color}
      size={props.size}
      disabled={props.readOnly || props.disabled}
      labelPlacement={props.labelPlacement}
    />
      </div>
    </ErrorBoundary>
)
}

export function getPreviewCss(): string {
  return require('./styles/AxSwitchPreview.scss')
}
