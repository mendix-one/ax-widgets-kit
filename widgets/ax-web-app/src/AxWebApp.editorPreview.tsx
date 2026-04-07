import { type ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'

import { type AxWebAppPreviewProps } from '../typings/AxWebAppProps'
import { WebAppPreview } from './preview/WebAppPreview'

export function preview(props: AxWebAppPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
      <WebAppPreview
        logo={props.logo}
        tasksMenu={props.tasksMenu}
        notifyMenu={props.notifyMenu}
        userMenu={props.userMenu}
        sidebar={props.sidebar}
        content={props.content}
        agentChat={props.agentChat}
      />
    </ErrorBoundary>
  )
}

export function getPreviewCss(): string {
  return require('./styles/AxWebAppPreview.scss')
}
