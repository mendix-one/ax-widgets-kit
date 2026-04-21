import { ErrorBoundary } from '@ax/shared'
import { type ReactElement } from 'react'

import { type AxMuiTablePreviewProps } from '../typings/AxMuiTableProps'

import { MuiTablePreview } from './preview/MuiTablePreview'

export function preview(props: AxMuiTablePreviewProps): ReactElement {
  return (
    <ErrorBoundary>
      <div className={props.class} style={props.styleObject}>
        <MuiTablePreview
          title={props.title}
          columns={props.columns ?? []}
          stickyHeader={props.stickyHeader}
          paginationMode={props.paginationMode}
          pageSize={props.pageSize ?? 20}
          dense={props.dense}
        />
      </div>
    </ErrorBoundary>
  )
}

export function getPreviewCss(): string {
  return require('./styles/AxMuiTablePreview.scss')
}
