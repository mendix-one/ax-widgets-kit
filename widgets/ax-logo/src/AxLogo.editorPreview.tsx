import { type ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'

import { type AxLogoPreviewProps } from '../typings/AxLogoProps'
import { LogoPreview } from './preview/LogoPreview'

export function preview(props: AxLogoPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
      <LogoPreview
        logoUrl={props.logoUrl}
        altText={props.altText}
        height={props.height}
      />
    </ErrorBoundary>
  )
}

export function getPreviewCss(): string {
  return require('./styles/AxLogoPreview.scss')
}
