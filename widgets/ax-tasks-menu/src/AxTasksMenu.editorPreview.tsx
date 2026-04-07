import { type ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'
import { type AxTasksMenuPreviewProps } from '../typings/AxTasksMenuProps'
import { TasksMenuPreview } from './preview/TasksMenuPreview'

export function preview(props: AxTasksMenuPreviewProps): ReactElement {
  return <ErrorBoundary><TasksMenuPreview title={props.title} /></ErrorBoundary>
}

export function getPreviewCss(): string {
  return require('./styles/AxTasksMenuPreview.scss')
}
