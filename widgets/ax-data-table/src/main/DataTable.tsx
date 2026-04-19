import { Button, Flex, Table, Typography } from 'antd'
import { observer } from 'mobx-react-lite'

import { useDataTableStore } from './context'

import type { TableColumnGroupType, TableColumnsType, TableProps } from 'antd'
import type { DataTableRow } from './store'

export const DataTable = observer(function DataTable() {
  const store = useDataTableStore()

  const columns = buildColumns(store)
  const paginationPosition = buildPaginationPosition(store)

  const pagination = store.paginationMode === 'pagingButtons'
    ? {
        current: store.currentPage,
        pageSize: store.pageSize,
        total: store.totalCount,
        showSizeChanger: store.showSizeChanger,
        position: paginationPosition,
      }
    : false

  const rowSelection: TableProps<DataTableRow>['rowSelection'] = store.selectionMode !== 'none' && store.selectionMethod !== 'row'
    ? {
        type: store.selectionMethod === 'radio' ? 'radio' : 'checkbox',
        selectedRowKeys: store.selectedKeys,
        preserveSelectedRowKeys: store.keepSelection,
        hideSelectAll: store.selectionMethod !== 'checkbox' || !store.showSelectAll,
        onChange: (keys: Array<string | number>) => {
          store.handleSelectionChange(keys.map((key) => String(key)))
        },
      }
    : undefined

  const handleChange: TableProps<DataTableRow>['onChange'] = (nextPagination, _filters, sorter) => {
    if (store.paginationMode === 'pagingButtons' && nextPagination.current) {
      store.handlePageChange(nextPagination.current)
    }

    if (Array.isArray(sorter)) {
      const firstSorter = sorter[0]
      if (!firstSorter?.columnKey) {
        store.handleSortChange('', undefined)
        return
      }

      store.handleSortChange(String(firstSorter.columnKey), mapSorterOrder(firstSorter.order))
      return
    }

    if (!sorter?.columnKey) {
      store.handleSortChange('', undefined)
      return
    }

    store.handleSortChange(String(sorter.columnKey), mapSorterOrder(sorter.order))
  }

  const emptyText = store.unavailable ? 'Datasource unavailable' : 'No rows to display'

  return (
    <Flex vertical gap={12} style={{ width: '100%' }}>
      <Table<DataTableRow>
        rowKey="key"
        dataSource={store.rows}
        columns={columns}
        loading={store.loading}
        pagination={pagination}
        rowSelection={rowSelection}
        bordered={store.bordered}
        sticky={store.stickyHeader}
        scroll={store.stickyHeader || store.paginationMode === 'virtualScroll' ? { y: store.tableHeight } : undefined}
        locale={{ emptyText }}
        title={store.title ? () => <Typography.Title level={5} style={{ margin: 0 }}>{store.title}</Typography.Title> : undefined}
        onChange={handleChange}
        onRow={(row) => ({
          onClick: () => {
            store.handleRowClick(row.item)
          },
          onDoubleClick: () => {
            store.handleRowDoubleClick(row.item)
          },
        })}
        onScroll={
          store.paginationMode === 'virtualScroll'
            ? (event) => {
                const element = event.currentTarget
                if (element.scrollTop + element.clientHeight >= element.scrollHeight - 24 && store.hasMoreItems && !store.loading) {
                  store.handleLoadMore()
                }
              }
            : undefined
        }
      />

      {(store.paginationMode === 'loadMore' || store.showRowCount) && (
        <Flex
          justify={store.paginationHorizontalAlign}
          align="center"
          gap={12}
          style={{ width: '100%' }}
        >
          {store.showRowCount ? <Typography.Text type="secondary">{buildRowCountText(store)}</Typography.Text> : null}
          {store.paginationMode === 'loadMore' && store.hasMoreItems ? (
            <Button onClick={() => store.handleLoadMore()} loading={store.loading}>
              Load more
            </Button>
          ) : null}
        </Flex>
      )}
    </Flex>
  )
})

function buildColumns(store: ReturnType<typeof useDataTableStore>): TableColumnsType<DataTableRow> {
  const groups = new Map<string, TableColumnGroupType<DataTableRow>>()
  const result: TableColumnsType<DataTableRow> = []

  for (const column of store.columns) {
    const leafColumn: NonNullable<TableColumnsType<DataTableRow>[number]> = {
      key: column.key,
      dataIndex: ['cells', column.key],
      title: column.title,
      align: column.align,
      width: column.width,
      fixed: column.fixed,
      ellipsis: column.ellipsis,
      sorter: column.canSort,
      sortOrder: store.sortColumnKey === column.key ? mapStoreOrder(store.sortDirection) : null,
      render: (_value, row) => {
        const cell = row.cells[column.key]
        if (cell.kind === 'link') {
          return (
            <Button
              type="link"
              style={{ padding: 0, height: 'auto' }}
              onClick={(event) => {
                if (!cell.allowRowEvents) {
                  event.preventDefault()
                  event.stopPropagation()
                }

                cell.onClick?.()
              }}
            >
              {cell.text}
            </Button>
          )
        }

        return <span>{cell.text}</span>
      },
    }

    if (column.groupKey && column.groupCaption) {
      const group = groups.get(column.groupKey)
      if (group) {
        group.children.push(leafColumn)
        continue
      }

      const nextGroup: TableColumnGroupType<DataTableRow> = {
        key: column.groupKey,
        title: column.groupCaption,
        children: [leafColumn],
      }
      groups.set(column.groupKey, nextGroup)
      result.push(nextGroup)
      continue
    }

    result.push(leafColumn)
  }

  return result
}

function buildPaginationPosition(store: ReturnType<typeof useDataTableStore>): Array<'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight'> {
  const alignedTop = mapPaginationPosition('top', store.paginationHorizontalAlign)
  const alignedBottom = mapPaginationPosition('bottom', store.paginationHorizontalAlign)

  if (store.paginationVerticalPosition === 'above') {
    return [alignedTop]
  }

  if (store.paginationVerticalPosition === 'both') {
    return [alignedTop, alignedBottom]
  }

  return [alignedBottom]
}

function mapPaginationPosition(prefix: 'top' | 'bottom', align: ReturnType<typeof useDataTableStore>['paginationHorizontalAlign']) {
  if (align === 'left') {
    return `${prefix}Left` as const
  }

  if (align === 'center') {
    return `${prefix}Center` as const
  }

  return `${prefix}Right` as const
}

function mapSorterOrder(order: 'ascend' | 'descend' | null | undefined): 'asc' | 'desc' | undefined {
  if (order === 'ascend') {
    return 'asc'
  }

  if (order === 'descend') {
    return 'desc'
  }

  return undefined
}

function mapStoreOrder(order: 'asc' | 'desc' | undefined): 'ascend' | 'descend' | null {
  if (order === 'asc') {
    return 'ascend'
  }

  if (order === 'desc') {
    return 'descend'
  }

  return null
}

function buildRowCountText(store: ReturnType<typeof useDataTableStore>): string {
  if (!store.rows.length) {
    return '0 rows'
  }

  const start = store.paginationMode === 'pagingButtons' ? (store.currentPage - 1) * store.pageSize + 1 : 1
  const end = store.paginationMode === 'pagingButtons'
    ? start + store.rows.length - 1
    : store.rows.length

  if (typeof store.totalCount === 'number') {
    return `${start}-${end} of ${store.totalCount}`
  }

  return `${store.rows.length} rows`
}