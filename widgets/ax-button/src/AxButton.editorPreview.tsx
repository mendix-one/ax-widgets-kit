import { ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'

import { AxButtonPreviewProps } from '../typings/AxButtonProps'
import { ButtonPreview } from './preview/ButtonPreview'

export function preview(props: AxButtonPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
    <div className={props.class} style={props.styleObject}>
    <ButtonPreview
      label={props.label}
      variant={props.variant}
      color={props.color}
      size={props.size}
      disabled={props.readOnly || props.disabled}
      fullWidth={props.fullWidth}
    />
      </div>
    </ErrorBoundary>
)
}

export function getPreviewCss(): string {
  return require('./styles/AxButtonPreview.scss')
}
