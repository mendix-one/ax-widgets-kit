import { type ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'

import { type AxCheckboxPreviewProps } from '../typings/AxCheckboxProps'
import { CheckboxPreview } from './preview/CheckboxPreview'

export function preview(props: AxCheckboxPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
    <div className={props.class} style={props.styleObject}>
    <CheckboxPreview
      label={props.label || 'Checkbox'}
      color={props.color}
      size={props.size}
      disabled={props.readOnly}
    />
      </div>
    </ErrorBoundary>
)
}

export function getPreviewCss(): string {
  return require('./styles/AxCheckboxPreview.scss')
}
