import { ErrorBoundary } from '@ax/shared'
import { type ReactElement } from 'react'

import { type AxLogoPreviewProps } from '../typings/AxLogoProps'

import { LogoPreview } from './preview/LogoPreview'

function getPreviewImageUrl(logoUrl: AxLogoPreviewProps['logoUrl']): string | undefined {
  if (!logoUrl || logoUrl.type !== 'static') {
    return undefined
  }

  return logoUrl.imageUrl
}

export function preview(props: AxLogoPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
      <LogoPreview
        logoUrl={getPreviewImageUrl(props.logoUrl)}
        altText={props.altText}
        height={props.height}
      />
    </ErrorBoundary>
  )
}

export function getPreviewCss(): string {
  return require('./styles/AxLogoPreview.scss')
}
