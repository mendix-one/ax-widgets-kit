import { type ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'

import { type AxToggleButtonPreviewProps } from '../typings/AxToggleButtonProps'
import { ToggleButtonPreview } from './preview/ToggleButtonPreview'

export function preview(props: AxToggleButtonPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
    <div className={props.class} style={props.styleObject}>
    <ToggleButtonPreview
      options={props.options as any}
      exclusive={props.exclusive}
      color={props.color}
      size={props.size}
      orientation={props.orientation}
      disabled={props.readOnly || props.disabled}
      fullWidth={props.fullWidth}
    />
      </div>
    </ErrorBoundary>
)
}

export function getPreviewCss(): string {
  return require('./styles/AxToggleButtonPreview.scss')
}
