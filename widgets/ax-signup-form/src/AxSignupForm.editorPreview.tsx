import { ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'

import { AxSignupFormPreviewProps } from '../typings/AxSignupFormProps'
import { SignUpFormPreview } from './preview/SignUpFormPreview'

export function preview(props: AxSignupFormPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
      <SignUpFormPreview
        showSSO={props.showSSO}
      />
    </ErrorBoundary>
  )
}

export function getPreviewCss(): string {
  return require('./styles/AxSignupFormPreview.scss')
}
