import { type ReactElement } from 'react'
import { ErrorBoundary } from '@ax/shared'

import { type AxSidebarPreviewProps } from '../typings/AxSidebarProps'
import { SidebarPreview } from './preview/SidebarPreview'

export function preview(props: AxSidebarPreviewProps): ReactElement {
  return (
    <ErrorBoundary>
    <div className={props.class} style={{ ...props.styleObject, display: "contents" as const }}>
    <SidebarPreview
      content={props.content}
    />
      </div>
    </ErrorBoundary>
)
}

export function getPreviewCss(): string {
  return require('./styles/AxSidebarPreview.scss')
}
