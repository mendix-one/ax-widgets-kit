import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'

import { useMuiTableStore } from './context'
import { MuiTableBody } from './MuiTableBody'
import { MuiTableFooterControls } from './MuiTableFooterControls'
import { MuiTableHead } from './MuiTableHead'

/**
 * MuiTable
 *
 * Root observer component that assembles all sub-components into a complete
 * MUI table. Reads shared state from MuiTableStore via context.
 *
 * Structure:
 *   <Paper>
 *     [title]
 *     <TableContainer>        ← scroll + sticky-header container
 *       <Table>
 *         <MuiTableHead />   ← grouped headers + sort labels
 *         <MuiTableBody />   ← rows via MuiTableBodyRow + MuiTableBodyCell
 *       </Table>
 *     </TableContainer>
 *     <MuiTableFooterControls /> ← pagination / load-more / row-count
 *   </Paper>
 */
export const MuiTable = observer(function MuiTable() {
  const store = useMuiTableStore()

  const containerStyle = store.stickyHeader ? { maxHeight: store.tableHeight } : undefined

  return (
    <Paper variant="outlined" sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Optional table title */}
      {store.title ? (
        <Typography variant="h6" sx={{ px: 2, pt: 1.5, pb: 0.5 }}>
          {store.title}
        </Typography>
      ) : null}

      {/* Loading overlay */}
      {store.loading && store.rows.length > 0 && (
        <Stack alignItems="center" sx={{ py: 0.5 }}>
          <CircularProgress size={20} />
        </Stack>
      )}

      <TableContainer style={containerStyle}>
        <Table stickyHeader={store.stickyHeader} size={store.dense ? 'small' : 'medium'}>
          <MuiTableHead />
          <MuiTableBody />
        </Table>
      </TableContainer>

      <MuiTableFooterControls />
    </Paper>
  )
})
