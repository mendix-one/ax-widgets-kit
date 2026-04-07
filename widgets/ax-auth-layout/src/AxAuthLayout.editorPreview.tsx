import { ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'

import { AxAuthLayoutPreviewProps } from '../typings/AxAuthLayoutProps'
import { AuthLayoutPreview } from './preview/AuthLayoutPreview'

export function preview(props: AxAuthLayoutPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
      <AuthLayoutPreview
        content={props.content}
        tagline={props.tagline}
        brandDescription={props.brandDescription}
        showBackground={props.showBackground}
      />
    </ErrorBoundary>
  )
}

export function getPreviewCss(): string {
  return require('./styles/AxAuthLayoutPreview.scss')
}
