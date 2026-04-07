import { ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'

import { AxResetpswFormPreviewProps } from '../typings/AxResetpswFormProps'
import { ResetPassFormPreview } from './preview/ResetPassFormPreview'

export function preview(_props: AxResetpswFormPreviewProps): ReactElement {
  return <ErrorBoundary><ResetPassFormPreview /></ErrorBoundary>
}

export function getPreviewCss(): string {
  return require('./styles/AxResetpswFormPreview.scss')
}
