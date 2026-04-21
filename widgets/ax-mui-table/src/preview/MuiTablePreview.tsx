import { type ReactElement } from 'react'

type PreviewColumn = {
  columnKey: string
  caption?: string
  groupCaption?: string
}

interface MuiTablePreviewProps {
  title?: string
  columns: PreviewColumn[]
  stickyHeader: boolean
  paginationMode: string
  pageSize: number
  dense: boolean
}

export function MuiTablePreview({
  title,
  columns,
  stickyHeader,
  paginationMode,
  pageSize,
  dense,
}: MuiTablePreviewProps): ReactElement {
  const displayColumns = columns.length
    ? columns
    : [
        { columnKey: 'column1', caption: 'Column 1' },
        { columnKey: 'column2', caption: 'Column 2' },
        { columnKey: 'column3', caption: 'Column 3' },
      ]

  return (
    <div className="ax-mui-table-preview">
      <div className="ax-mui-table-preview__title">{title || 'Ax MUI Table'}</div>
      <div className="ax-mui-table-preview__meta">
        <span>{displayColumns.length} columns</span>
        <span>{stickyHeader ? 'Sticky header' : 'Static header'}</span>
        <span>{paginationMode}</span>
        <span>{pageSize} rows/page</span>
        {dense && <span>Dense</span>}
      </div>
      <div className="ax-mui-table-preview__table">
        <div className="ax-mui-table-preview__header">
          {displayColumns.map((column) => (
            <div className="ax-mui-table-preview__cell ax-mui-table-preview__cell--header" key={column.columnKey}>
              {column.groupCaption ? `${column.groupCaption} / ` : ''}
              {column.caption || column.columnKey}
            </div>
          ))}
        </div>
        {[1, 2].map((rowIndex) => (
          <div className="ax-mui-table-preview__row" key={rowIndex}>
            {displayColumns.map((column) => (
              <div className="ax-mui-table-preview__cell" key={column.columnKey}>
                Row {rowIndex} value
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
