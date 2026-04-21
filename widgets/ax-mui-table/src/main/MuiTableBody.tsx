import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { observer } from 'mobx-react-lite'

import { useMuiTableStore } from './context'
import { MuiTableBodyRow } from './MuiTableBodyRow'

/**
 * MuiTableBody
 *
 * Renders the <TableBody> section of the MUI table.
 * Responsibilities:
 *  - Iterate over rows from the store and render a MuiTableBodyRow for each
 *  - Render an empty state row when no data is available
 *  - Show a loading skeleton placeholder while data is being fetched
 *
 * Reads exclusively from MuiTableStore via context.
 */
export const MuiTableBody = observer(function MuiTableBody() {
  const store = useMuiTableStore()

  if (store.loading && store.rows.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={store.columns.length + (store.selectionMode !== 'none' ? 1 : 0)}
            align="center"
            sx={{ py: 4, color: 'text.secondary' }}
          >
            Loading…
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  if (store.rows.length === 0) {
    const emptyText = store.unavailable ? 'Datasource unavailable' : 'No rows to display'

    return (
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={store.columns.length + (store.selectionMode !== 'none' ? 1 : 0)}
            align="center"
            sx={{ py: 4, color: 'text.secondary' }}
          >
            {emptyText}
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  return (
    <TableBody>
      {store.rows.map((row) => (
        <MuiTableBodyRow key={row.key} row={row} />
      ))}
    </TableBody>
  )
})
