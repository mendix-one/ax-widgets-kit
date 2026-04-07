import { ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'

import { AxSigninFormPreviewProps } from '../typings/AxSigninFormProps'
import { SignInFormPreview } from './preview/SignInFormPreview'

export function preview(props: AxSigninFormPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
      <SignInFormPreview
        showSSO={props.showSSO}
      />
    </ErrorBoundary>
  )
}

export function getPreviewCss(): string {
  return require('./styles/AxSigninFormPreview.scss')
}
