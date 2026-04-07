import { type ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'
import { type AxUserMenuPreviewProps } from '../typings/AxUserMenuProps'
import { UserMenuPreview } from './preview/UserMenuPreview'

export function preview(props: AxUserMenuPreviewProps): ReactElement {
  return <ErrorBoundary><UserMenuPreview userName={props.userName} userEmail={props.userEmail} /></ErrorBoundary>
}

export function getPreviewCss(): string {
  return require('./styles/AxUserMenuPreview.scss')
}
