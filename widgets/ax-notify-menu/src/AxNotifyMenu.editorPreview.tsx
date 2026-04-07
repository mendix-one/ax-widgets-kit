import { type ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'
import { type AxNotifyMenuPreviewProps } from '../typings/AxNotifyMenuProps'
import { NotifyMenuPreview } from './preview/NotifyMenuPreview'

export function preview(props: AxNotifyMenuPreviewProps): ReactElement {
  return <ErrorBoundary><NotifyMenuPreview title={props.title} /></ErrorBoundary>
}

export function getPreviewCss(): string {
  return require('./styles/AxNotifyMenuPreview.scss')
}
