import { makeAutoObservable } from 'mobx'

import type { ObjectItem } from 'mendix'

export type MuiTablePaginationMode = 'pagingButtons' | 'loadMore' | 'none'
export type MuiTableSelectionMethod = 'checkbox' | 'radio' | 'row'
export type MuiTableSelectionMode = 'none' | 'single' | 'multi'
export type MuiTableAlign = 'left' | 'center' | 'right'
export type MuiTableSortDirection = 'asc' | 'desc' | undefined

export interface MuiTableCell {
  kind: 'text' | 'link'
  text: string
  allowRowEvents: boolean
  onClick?: () => void
}

export interface MuiTableColumn {
  key: string
  title: string
  groupKey?: string
  groupCaption?: string
  align: MuiTableAlign
  width?: number
  ellipsis: boolean
  renderType: 'attribute' | 'dynamicText' | 'link'
  allowRowEvents: boolean
  canSort: boolean
  order?: number
}

export interface MuiTableRow {
  key: string
  item: ObjectItem
  cells: Record<string, MuiTableCell>
}

export interface MuiTableStoreConfig {
  title: string
  stickyHeader: boolean
  tableHeight: number
  dense: boolean
  paginationMode: MuiTablePaginationMode
  defaultPageNumber: number
  pageSize: number
  showRowCount: boolean
  showSizeChanger: boolean
  selectionMethod: MuiTableSelectionMethod
  showSelectAll: boolean
  keepSelection: boolean
  currentPage: number
}

export class MuiTableStore {
  title = ''
  stickyHeader = false
  tableHeight = 480
  dense = false
  paginationMode: MuiTablePaginationMode = 'pagingButtons'
  defaultPageNumber = 1
  pageSize = 20
  showRowCount = true
  showSizeChanger = false
  selectionMethod: MuiTableSelectionMethod = 'checkbox'
  selectionMode: MuiTableSelectionMode = 'none'
  showSelectAll = true
  keepSelection = false
  loading = false
  unavailable = false
  hasMoreItems = false
  totalCount?: number = undefined
  currentPage = 1
  sortColumnKey?: string = undefined
  sortDirection: MuiTableSortDirection = undefined
  selectedKeys: string[] = []
  columns: MuiTableColumn[] = []
  rows: MuiTableRow[] = []

  onPageChange?: (page: number) => void
  onLoadMore?: () => void
  onSortChange?: (columnKey: string, direction: MuiTableSortDirection) => void
  onSelectionChange?: (keys: string[]) => void
  onRowClick?: (item: ObjectItem) => void
  onRowDoubleClick?: (item: ObjectItem) => void

  constructor(config?: Partial<MuiTableStoreConfig>) {
    if (config) {
      Object.assign(this, config)
    }

    makeAutoObservable(this)
  }

  setTitle(value: string) { this.title = value }
  setStickyHeader(value: boolean) { this.stickyHeader = value }
  setTableHeight(value: number) { this.tableHeight = value }
  setDense(value: boolean) { this.dense = value }
  setPaginationMode(value: MuiTablePaginationMode) { this.paginationMode = value }
  setDefaultPageNumber(value: number) { this.defaultPageNumber = value }
  setPageSize(value: number) { this.pageSize = value }
  setShowRowCount(value: boolean) { this.showRowCount = value }
  setShowSizeChanger(value: boolean) { this.showSizeChanger = value }
  setSelectionMethod(value: MuiTableSelectionMethod) { this.selectionMethod = value }
  setSelectionMode(value: MuiTableSelectionMode) { this.selectionMode = value }
  setShowSelectAll(value: boolean) { this.showSelectAll = value }
  setKeepSelection(value: boolean) { this.keepSelection = value }
  setLoading(value: boolean) { this.loading = value }
  setUnavailable(value: boolean) { this.unavailable = value }
  setHasMoreItems(value: boolean) { this.hasMoreItems = value }
  setTotalCount(value: number | undefined) { this.totalCount = value }
  setCurrentPage(value: number) { this.currentPage = value }
  setSortState(columnKey: string | undefined, direction: MuiTableSortDirection) {
    this.sortColumnKey = columnKey
    this.sortDirection = direction
  }
  setSelectedKeys(keys: string[]) { this.selectedKeys = [...keys] }
  setColumns(columns: MuiTableColumn[]) { this.columns = columns }
  setRows(rows: MuiTableRow[]) { this.rows = rows }

  setOnPageChange(handler: ((page: number) => void) | undefined) { this.onPageChange = handler }
  setOnLoadMore(handler: (() => void) | undefined) { this.onLoadMore = handler }
  setOnSortChange(handler: ((columnKey: string, direction: MuiTableSortDirection) => void) | undefined) {
    this.onSortChange = handler
  }
  setOnSelectionChange(handler: ((keys: string[]) => void) | undefined) { this.onSelectionChange = handler }
  setOnRowClick(handler: ((item: ObjectItem) => void) | undefined) { this.onRowClick = handler }
  setOnRowDoubleClick(handler: ((item: ObjectItem) => void) | undefined) { this.onRowDoubleClick = handler }

  pruneSelection(visibleKeys: string[]) {
    if (this.keepSelection || this.selectedKeys.length === 0) {
      return
    }

    const nextKeys = this.selectedKeys.filter((key) => visibleKeys.includes(key))
    if (nextKeys.length !== this.selectedKeys.length) {
      this.selectedKeys = nextKeys
      this.onSelectionChange?.(nextKeys)
    }
  }

  handlePageChange(page: number) {
    this.onPageChange?.(page)
  }

  handleLoadMore() {
    this.onLoadMore?.()
  }

  handleSortChange(columnKey: string, direction: MuiTableSortDirection) {
    this.onSortChange?.(columnKey, direction)
  }

  handleSelectionChange(keys: string[]) {
    this.selectedKeys = [...keys]
    this.onSelectionChange?.(keys)
  }

  handleRowClick(item: ObjectItem) {
    if (this.selectionMethod === 'row' && this.selectionMode !== 'none') {
      const itemKey = String(item.id)
      const nextKeys =
        this.selectionMode === 'single'
          ? [itemKey]
          : this.selectedKeys.includes(itemKey)
            ? this.selectedKeys.filter((key) => key !== itemKey)
            : [...this.selectedKeys, itemKey]

      this.handleSelectionChange(nextKeys)
    }

    this.onRowClick?.(item)
  }

  handleRowDoubleClick(item: ObjectItem) {
    this.onRowDoubleClick?.(item)
  }

  get isAllSelected(): boolean {
    return this.rows.length > 0 && this.rows.every((row) => this.selectedKeys.includes(row.key))
  }

  get isIndeterminate(): boolean {
    return this.selectedKeys.length > 0 && !this.isAllSelected
  }

  handleSelectAll(checked: boolean) {
    const nextKeys = checked ? this.rows.map((row) => row.key) : []
    this.handleSelectionChange(nextKeys)
  }
}
