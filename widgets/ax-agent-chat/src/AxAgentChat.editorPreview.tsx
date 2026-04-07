import { type ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'

import { type AxAgentChatPreviewProps } from '../typings/AxAgentChatProps'
import { AgentChatPreview } from './preview/AgentChatPreview'

export function preview(props: AxAgentChatPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
    <div className={props.class} style={{ ...props.styleObject, display: "flex", flexDirection: "column" as const, height: "100%" }}>
    <AgentChatPreview
      title={props.title}
      welcomeMessage={props.welcomeMessage}
    />
      </div>
    </ErrorBoundary>
)
}

export function getPreviewCss(): string {
  return require('./styles/AxAgentChatPreview.scss')
}
