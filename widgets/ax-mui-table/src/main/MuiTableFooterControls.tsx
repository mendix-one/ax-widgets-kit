import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'

import { useMuiTableStore } from './context'

/**
 * MuiTableFooterControls
 *
 * Renders pagination controls and row-count info below (or above) the table.
 * This component is placed outside of <Table> to avoid DOM nesting issues with
 * MUI's TablePagination when used as a standalone footer.
 *
 * Responsibilities:
 *  - Render MUI TablePagination for 'pagingButtons' mode
 *  - Render Load More button for 'loadMore' mode
 *  - Render row-count text when showRowCount is enabled
 *
 * Reads exclusively from MuiTableStore via context.
 */
export const MuiTableFooterControls = observer(function MuiTableFooterControls() {
  const store = useMuiTableStore()

  const showPaging = store.paginationMode === 'pagingButtons'
  const showLoadMore = store.paginationMode === 'loadMore' && store.hasMoreItems
  const showRowCountText = store.showRowCount && store.paginationMode !== 'pagingButtons'

  if (!showPaging && !showLoadMore && !showRowCountText) {
    return null
  }

  if (showPaging) {
    return (
      <TablePagination
        component="div"
        count={store.totalCount ?? -1}
        page={store.currentPage - 1}
        rowsPerPage={store.pageSize}
        rowsPerPageOptions={store.showSizeChanger ? [10, 20, 50, 100] : [store.pageSize]}
        onPageChange={(_e, page) => store.handlePageChange(page + 1)}
        onRowsPerPageChange={(e) => {
          const newSize = parseInt(e.target.value, 10)
          store.setPageSize(newSize)
          store.handlePageChange(1)
        }}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`
        }
      />
    )
  }

  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ px: 1, py: 0.5 }}>
      {showRowCountText && (
        <Typography variant="body2" color="text.secondary">
          {buildRowCountText(store)}
        </Typography>
      )}
      {showLoadMore && (
        <Button
          size="small"
          variant="outlined"
          onClick={() => store.handleLoadMore()}
          disabled={store.loading}
        >
          Load more
        </Button>
      )}
    </Stack>
  )
})

function buildRowCountText(store: ReturnType<typeof useMuiTableStore>): string {
  if (!store.rows.length) return '0 rows'

  const start = store.paginationMode === 'pagingButtons' ? (store.currentPage - 1) * store.pageSize + 1 : 1
  const end =
    store.paginationMode === 'pagingButtons' ? start + store.rows.length - 1 : store.rows.length

  if (typeof store.totalCount === 'number') {
    return `${start}–${end} of ${store.totalCount}`
  }

  return `${store.rows.length} rows`
}
