import { ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'

import { AxSetpswFormPreviewProps } from '../typings/AxSetpswFormProps'
import { SetPasswordFormPreview } from './preview/SetPasswordFormPreview'

export function preview(_props: AxSetpswFormPreviewProps): ReactElement {
  return <ErrorBoundary><SetPasswordFormPreview /></ErrorBoundary>
}

export function getPreviewCss(): string {
  return require('./styles/AxSetpswFormPreview.scss')
}
