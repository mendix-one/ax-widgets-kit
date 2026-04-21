import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { observer } from 'mobx-react-lite'

import { useMuiTableStore } from './context'

import type { MuiTableColumn } from './store'

/**
 * MuiTableHead
 *
 * Renders the <TableHead> section of the MUI table.
 * Responsibilities:
 *  - Render grouped header rows when columns share a groupKey
 *  - Render sort labels for sortable columns via TableSortLabel
 *  - Render select-all checkbox when selection mode is multi + checkbox
 *
 * Reads exclusively from MuiTableStore via context.
 */
export const MuiTableHead = observer(function MuiTableHead() {
  const store = useMuiTableStore()

  const showCheckbox =
    store.selectionMode !== 'none' && store.selectionMethod === 'checkbox'

  const showSelectAll = showCheckbox && store.selectionMode === 'multi' && store.showSelectAll
  const showRadioPlaceholder =
    store.selectionMode !== 'none' && store.selectionMethod === 'radio'

  const hasGroups = store.columns.some((col) => col.groupKey)

  if (hasGroups) {
    return (
      <TableHead>
        {renderGroupedHeaderRows(store.columns, showCheckbox, showSelectAll, showRadioPlaceholder, store)}
      </TableHead>
    )
  }

  return (
    <TableHead>
      <TableRow>
        {(showCheckbox || showRadioPlaceholder) && (
          <TableCell padding="checkbox">
            {showSelectAll ? (
              <Checkbox
                indeterminate={store.isIndeterminate}
                checked={store.isAllSelected}
                onChange={(e) => store.handleSelectAll(e.target.checked)}
                inputProps={{ 'aria-label': 'select all rows' }}
                size="small"
              />
            ) : null}
          </TableCell>
        )}
        {store.columns.map((col) => (
          <MuiTableHeadCell key={col.key} column={col} />
        ))}
      </TableRow>
    </TableHead>
  )
})

// ─── Grouped header rendering ────────────────────────────────────────────────

function renderGroupedHeaderRows(
  columns: MuiTableColumn[],
  showCheckbox: boolean,
  showSelectAll: boolean,
  showRadioPlaceholder: boolean,
  store: ReturnType<typeof useMuiTableStore>,
) {
  // Build group spans: consecutive columns sharing the same groupKey merge into one header cell
  type GroupSpan = { key: string; title: string; colSpan: number }

  const groupRow: Array<GroupSpan | { single: true; key: string }> = []
  const leafRow: MuiTableColumn[] = []

  let i = 0
  while (i < columns.length) {
    const col = columns[i]
    if (col.groupKey && col.groupCaption) {
      // Count consecutive columns in the same group
      let span = 1
      while (
        i + span < columns.length &&
        columns[i + span].groupKey === col.groupKey
      ) {
        span++
      }

      groupRow.push({ key: col.groupKey, title: col.groupCaption, colSpan: span })
      for (let j = 0; j < span; j++) {
        leafRow.push(columns[i + j])
      }
      i += span
    } else {
      // Un-grouped column — spans 2 rows via rowSpan=2
      groupRow.push({ single: true, key: col.key })
      leafRow.push(col)
      i++
    }
  }

  const selectionColSpan = showCheckbox || showRadioPlaceholder ? 1 : 0

  return (
    <>
      {/* First row: group headers + un-grouped cells with rowSpan */}
      <TableRow>
        {selectionColSpan > 0 && (
          <TableCell padding="checkbox" rowSpan={2}>
            {showSelectAll ? (
              <Checkbox
                indeterminate={store.isIndeterminate}
                checked={store.isAllSelected}
                onChange={(e) => store.handleSelectAll(e.target.checked)}
                inputProps={{ 'aria-label': 'select all rows' }}
                size="small"
              />
            ) : null}
          </TableCell>
        )}
        {groupRow.map((entry) => {
          if ('single' in entry) {
            const col = columns.find((c) => c.key === entry.key)!
            return (
              <TableCell key={entry.key} align={col.align} rowSpan={2} style={col.width ? { width: col.width } : undefined}>
                <MuiTableHeadCellContent column={col} />
              </TableCell>
            )
          }

          return (
            <TableCell key={entry.key} align="center" colSpan={entry.colSpan}>
              {entry.title}
            </TableCell>
          )
        })}
      </TableRow>

      {/* Second row: leaf column headers under groups */}
      <TableRow>
        {leafRow
          .filter((col) => Boolean(col.groupKey))
          .map((col) => (
            <TableCell key={col.key} align={col.align} style={col.width ? { width: col.width } : undefined}>
              <MuiTableHeadCellContent column={col} />
            </TableCell>
          ))}
      </TableRow>
    </>
  )
}

// ─── Single header cell ───────────────────────────────────────────────────────

const MuiTableHeadCell = observer(function MuiTableHeadCell({ column }: { column: MuiTableColumn }) {
  return (
    <TableCell
      align={column.align}
      style={column.width ? { width: column.width } : undefined}
    >
      <MuiTableHeadCellContent column={column} />
    </TableCell>
  )
})

const MuiTableHeadCellContent = observer(function MuiTableHeadCellContent({
  column,
}: {
  column: MuiTableColumn
}) {
  const store = useMuiTableStore()

  if (!column.canSort) {
    return <>{column.title}</>
  }

  const active = store.sortColumnKey === column.key
  const direction = active && store.sortDirection ? store.sortDirection : 'asc'

  function handleSort() {
    if (!active) {
      store.handleSortChange(column.key, 'asc')
      return
    }

    if (direction === 'asc') {
      store.handleSortChange(column.key, 'desc')
      return
    }

    // Third click: clear sort
    store.handleSortChange('', undefined)
  }

  return (
    <TableSortLabel active={active} direction={direction} onClick={handleSort}>
      {column.title}
    </TableSortLabel>
  )
})
