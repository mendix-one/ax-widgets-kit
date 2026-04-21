import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Radio from '@mui/material/Radio'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { observer } from 'mobx-react-lite'
import type { CSSProperties } from 'react'

import { useMuiTableStore } from './context'

import type { MuiTableCell, MuiTableRow } from './store'

/**
 * MuiTableBodyRow
 *
 * Renders a single <TableRow> with all its <TableCell>s.
 * Responsibilities:
 *  - Render selection checkbox/radio cell when applicable
 *  - Render each data cell by delegating to MuiTableBodyCell
 *  - Handle row click / double-click and propagate to the store
 *
 * Reads exclusively from MuiTableStore via context.
 */
export const MuiTableBodyRow = observer(function MuiTableBodyRow({ row }: { row: MuiTableRow }) {
  const store = useMuiTableStore()

  const isSelected = store.selectedKeys.includes(row.key)
  const showCheckbox = store.selectionMode !== 'none' && store.selectionMethod === 'checkbox'
  const showRadio = store.selectionMode !== 'none' && store.selectionMethod === 'radio'

  function handleRowClick() {
    store.handleRowClick(row.item)
  }

  function handleRowDoubleClick() {
    store.handleRowDoubleClick(row.item)
  }

  function handleCheckboxChange() {
    if (store.selectionMode === 'single') {
      store.handleSelectionChange([row.key])
      return
    }

    const nextKeys = isSelected
      ? store.selectedKeys.filter((k) => k !== row.key)
      : [...store.selectedKeys, row.key]
    store.handleSelectionChange(nextKeys)
  }

  return (
    <TableRow
      hover
      selected={isSelected}
      onClick={handleRowClick}
      onDoubleClick={handleRowDoubleClick}
      style={{ cursor: store.selectionMode !== 'none' || store.onRowClick ? 'pointer' : undefined }}
    >
      {showCheckbox && (
        <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={isSelected}
            onChange={handleCheckboxChange}
            size="small"
            inputProps={{ 'aria-label': `select row ${row.key}` }}
          />
        </TableCell>
      )}

      {showRadio && (
        <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
          <Radio
            checked={isSelected}
            onChange={() => store.handleSelectionChange([row.key])}
            size="small"
            inputProps={{ 'aria-label': `select row ${row.key}` }}
          />
        </TableCell>
      )}

      {store.columns.map((col) => (
        <MuiTableBodyCell
          key={col.key}
          cell={row.cells[col.key]}
          align={col.align}
          width={col.width}
          ellipsis={col.ellipsis}
        />
      ))}
    </TableRow>
  )
})

// ─── Single data cell ─────────────────────────────────────────────────────────

interface MuiTableBodyCellProps {
  cell: MuiTableCell | undefined
  align: 'left' | 'center' | 'right'
  width?: number
  ellipsis: boolean
}

const MuiTableBodyCell = observer(function MuiTableBodyCell({
  cell,
  align,
  width,
  ellipsis,
}: MuiTableBodyCellProps) {
  if (!cell) {
    return <TableCell align={align} style={width ? { width } : undefined} />
  }

  const cellStyle: CSSProperties = {}
  if (width) cellStyle.width = width
  if (ellipsis) {
    cellStyle.maxWidth = width ?? 180
    cellStyle.overflow = 'hidden'
    cellStyle.textOverflow = 'ellipsis'
    cellStyle.whiteSpace = 'nowrap'
  }

  if (cell.kind === 'link') {
    return (
      <TableCell align={align} style={cellStyle}>
        <Button
          variant="text"
          size="small"
          sx={{ p: 0, minWidth: 0, textTransform: 'none' }}
          onClick={(e) => {
            if (!cell.allowRowEvents) {
              e.stopPropagation()
            }
            cell.onClick?.()
          }}
        >
          {cell.text}
        </Button>
      </TableCell>
    )
  }

  return (
    <TableCell align={align} style={cellStyle}>
      {cell.text}
    </TableCell>
  )
})
