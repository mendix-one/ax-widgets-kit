import { ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'

import { AxButtonGroupPreviewProps } from '../typings/AxButtonGroupProps'
import { ButtonGroupPreview } from './preview/ButtonGroupPreview'

export function preview(props: AxButtonGroupPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
    <div className={props.class} style={{ ...props.styleObject, display: "contents" as const }}>
    <ButtonGroupPreview
      content={props.content}
      variant={props.variant}
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
  return require('./styles/AxButtonGroupPreview.scss')
}
