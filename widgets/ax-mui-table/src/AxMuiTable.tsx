import { AxThemeProvider, ErrorBoundary, executeAction } from '@ax/shared'
import { configure } from 'mobx'
import { type ReactElement, useEffect } from 'react'

import { MuiTableProvider, useMuiTableStore } from './main/context'
import { MuiTable } from './main/MuiTable'
import {
  type MuiTableCell,
  type MuiTableColumn,
  type MuiTableSelectionMode,
  type MuiTableStoreConfig,
  MuiTableStore,
} from './main/store'

import type { ObjectItem } from 'mendix'
import type { DynamicValue } from 'mendix'

import type { AxMuiTableContainerProps, ColumnsType, DynamicColumnsType } from '../typings/AxMuiTableProps'

type RuntimeColumn = MuiTableColumn & {
  source: 'fixed' | 'dynamic'
  attributeValue?: ColumnsType['attributeValue']
  dynamicTextValue?: ColumnsType['dynamicTextValue']
  linkCaption?: ColumnsType['linkCaption']
  linkAction?: ColumnsType['linkAction']
  valueKey?: string
  cellsAttribute?: DynamicColumnsType['cellsAttribute']
}

configure({ isolateGlobalState: true })

export function AxMuiTable(props: AxMuiTableContainerProps): ReactElement {
  return (
    <ErrorBoundary>
       <MuiTableProvider createStore={() => createMuiTableStore(props)}>
          <AxMuiTableSync {...props} />
        </MuiTableProvider>
    </ErrorBoundary>
  )
}

function AxMuiTableSync(props: AxMuiTableContainerProps): ReactElement {
  const store = useMuiTableStore()

  useEffect(() => {
    initializeDataSource(props.dataSource, store)
  }, [props.dataSource, store])

  useEffect(() => {
    syncRuntimeState(props, store)
  }, [
    props.columns,
    props.dataSource.hasMoreItems,
    props.dataSource.items,
    props.dataSource.sortOrder,
    props.dataSource.status,
    props.dataSource.totalCount,
    props.selection,
    props.title?.value,
    props.dynamicColumns,
    store,
  ])

  return <MuiTable />
}

// ─── Store factory ────────────────────────────────────────────────────────────

function createMuiTableStore(props: AxMuiTableContainerProps): MuiTableStore {
  const store = new MuiTableStore(buildStoreConfig(props))

  store.setOnPageChange((page) => {
    const safePage = Math.max(1, page)
    store.setCurrentPage(safePage)

    if (store.paginationMode === 'pagingButtons') {
      props.dataSource.setOffset((safePage - 1) * Math.max(1, store.pageSize))
      props.dataSource.setLimit(Math.max(1, store.pageSize))
      return
    }

    if (store.paginationMode === 'loadMore') {
      props.dataSource.setOffset(0)
      props.dataSource.setLimit(Math.max(1, safePage * store.pageSize))
    }
  })

  store.setOnLoadMore(() => {
    const nextPage = store.currentPage + 1
    store.setCurrentPage(nextPage)
    props.dataSource.setOffset(0)
    props.dataSource.setLimit(Math.max(1, nextPage * store.pageSize))
  })

  store.setOnSortChange((columnKey, direction) => {
    const column = (props.columns ?? []).find((item) => item.columnKey === columnKey)
    if (!column?.attributeValue || !column.attributeValue.sortable || !direction) {
      props.dataSource.setSortOrder(undefined)
      store.setSortState(undefined, undefined)
      return
    }

    props.dataSource.setSortOrder([[column.attributeValue.id, direction]])
    store.setSortState(columnKey, direction)
  })

  store.setOnSelectionChange((keys) => {
    applySelection(props.selection, props.dataSource.items ?? [], keys)
    syncSelectedKeysAttribute(props.selectedKeysAttr, keys)
  })

  store.setOnRowClick((item) => {
    executeAction(props.onRowClick?.get(item))
  })

  store.setOnRowDoubleClick((item) => {
    executeAction(props.onRowDoubleClick?.get(item))
  })

  return store
}

function buildStoreConfig(props: AxMuiTableContainerProps): MuiTableStoreConfig {
  const initialPage = Math.max(1, props.defaultPageNumber)

  return {
    title: props.title?.value ?? '',
    stickyHeader: props.stickyHeader,
    tableHeight: props.tableHeight,
    dense: props.dense,
    paginationMode: props.paginationMode,
    defaultPageNumber: initialPage,
    pageSize: props.pageSize,
    showRowCount: props.showRowCount,
    showSizeChanger: props.showSizeChanger,
    selectionMethod: props.selectionMethod,
    showSelectAll: props.showSelectAll,
    keepSelection: props.keepSelection,
    currentPage: initialPage,
  }
}

// ─── Data source initialization ───────────────────────────────────────────────

function initializeDataSource(
  dataSource: AxMuiTableContainerProps['dataSource'],
  store: MuiTableStore,
) {
  dataSource.requestTotalCount(store.showRowCount)

  if (store.paginationMode === 'pagingButtons') {
    dataSource.setOffset((store.defaultPageNumber - 1) * Math.max(1, store.pageSize))
    dataSource.setLimit(Math.max(1, store.pageSize))
  } else if (store.paginationMode === 'loadMore') {
    dataSource.setOffset(0)
    dataSource.setLimit(Math.max(1, store.defaultPageNumber * store.pageSize))
  } else if (store.paginationMode === 'none') {
    dataSource.setOffset(0)
    dataSource.setLimit(undefined)
  }

  store.setCurrentPage(store.defaultPageNumber)
}

// ─── Runtime state sync ───────────────────────────────────────────────────────

function syncRuntimeState(props: AxMuiTableContainerProps, store: MuiTableStore) {
  store.setTitle(props.title?.value ?? '')
  store.setLoading(props.dataSource.status === 'loading')
  store.setUnavailable(props.dataSource.status === 'unavailable')

  if (props.dataSource.status === 'available') {
    store.setHasMoreItems(Boolean(props.dataSource.hasMoreItems))
    store.setTotalCount(props.dataSource.totalCount)

    const columns = [...normalizeColumns(props.columns ?? []), ...normalizeDynamicColumns(props)]
    const rows = (props.dataSource.items ?? []).map((item) => buildRow(item, columns))

    store.setColumns(columns)
    store.setRows(rows)
    store.pruneSelection(rows.map((row) => row.key))

    store.setSelectionMode(getSelectionMode(props.selection))
    store.setSelectedKeys(getSelectionKeys(props.selection))

    const sortInstruction = props.dataSource.sortOrder?.[0]
    if (!sortInstruction) {
      store.setSortState(undefined, undefined)
      return
    }

    const matchedColumn = (props.columns ?? []).find(
      (column) => column.attributeValue?.id === sortInstruction[0],
    )
    store.setSortState(matchedColumn?.columnKey, sortInstruction[1])
  }
}

// ─── Column normalizers ───────────────────────────────────────────────────────

function normalizeColumns(columns: ColumnsType[]): RuntimeColumn[] {
  return columns
    .filter((column) => column.visible)
    .map((column) => ({
      source: 'fixed' as const,
      key: column.columnKey,
      title: column.caption?.value ?? column.columnKey,
      groupKey: column.groupKey || undefined,
      groupCaption: column.groupCaption || undefined,
      align: column.align,
      width: column.width > 0 ? column.width : undefined,
      ellipsis: column.ellipsis,
      renderType: column.renderType,
      allowRowEvents: column.allowRowEvents,
      canSort: Boolean(column.sortable && column.attributeValue?.sortable),
      attributeValue: column.attributeValue,
      dynamicTextValue: column.dynamicTextValue,
      linkCaption: column.linkCaption,
      linkAction: column.linkAction,
    }))
}

function normalizeDynamicColumns(props: AxMuiTableContainerProps): RuntimeColumn[] {
  if (!props.dynamicColumns?.length) return []

  const columns = props.dynamicColumns.flatMap((dynSet) => {
    if (!dynSet.columnsSource?.items?.length || !dynSet.columnKey || !dynSet.columnTitle) {
      return []
    }

    return dynSet.columnsSource.items.flatMap((colItem) => {
      const key = dynSet.columnKey?.get(colItem).value?.trim()
      if (!key) return []

      const visible = dynSet.columnVisible?.get(colItem).value ?? true
      if (!visible) return []

      return [
        {
          source: 'dynamic' as const,
          key,
          title: dynSet.columnTitle?.get(colItem).value ?? key,
          groupKey: dynSet.columnGroupKey?.get(colItem).value || undefined,
          groupCaption: dynSet.columnGroupTitle?.get(colItem).value || undefined,
          align: normalizeAlign(dynSet.columnAlign?.get(colItem).value),
          width: normalizeWidth(dynSet.columnWidth?.get(colItem).value),
          order: normalizeOrder(dynSet.columnOrder?.get(colItem).value),
          ellipsis: true,
          renderType: 'dynamicText' as const,
          allowRowEvents: true,
          canSort: false,
          valueKey: dynSet.columnValueKey?.get(colItem).value || key,
          cellsAttribute: dynSet.cellsAttribute,
        },
      ]
    })
  })

  return columns.some((c) => c.order != null)
    ? [...columns].sort((a, b) => {
        if (a.order == null && b.order == null) return 0
        if (a.order == null) return 1
        if (b.order == null) return -1
        return a.order - b.order
      })
    : columns
}

// ─── Row / cell builders ──────────────────────────────────────────────────────

function buildRow(
  item: ObjectItem,
  columns: RuntimeColumn[],
): { key: string; item: ObjectItem; cells: Record<string, MuiTableCell> } {
  const cells = columns.reduce<Record<string, MuiTableCell>>((acc, column) => {
    acc[column.key] = buildCell(item, column)
    return acc
  }, {})

  return { key: String(item.id), item, cells }
}

function buildCell(item: ObjectItem, column: RuntimeColumn): MuiTableCell {
  if (column.source === 'dynamic') {
    const dynamicCells = parseDynamicCells(item, column.cellsAttribute)
    return {
      kind: 'text',
      text: getDynamicCellText(dynamicCells, column.valueKey ?? column.key),
      allowRowEvents: true,
    }
  }

  if (column.renderType === 'link') {
    const caption = getCellText(item, column.linkCaption, column.dynamicTextValue, column.attributeValue)
    return {
      kind: 'link',
      text: caption,
      allowRowEvents: column.allowRowEvents,
      onClick: () => {
        if ('linkAction' in column && column.linkAction) {
          executeAction(column.linkAction.get(item))
        }
      },
    }
  }

  return {
    kind: 'text',
    text: getCellText(item, undefined, column.dynamicTextValue, column.attributeValue),
    allowRowEvents: column.allowRowEvents,
  }
}

function getCellText(
  item: ObjectItem,
  preferred?: { get: (item: ObjectItem) => DynamicValue<string> },
  template?: { get: (item: ObjectItem) => DynamicValue<string> },
  attribute?: ColumnsType['attributeValue'],
): string {
  if (preferred) {
    const value = preferred.get(item)
    if (value.value) return value.value
  }

  if (template) {
    const value = template.get(item)
    if (value.value) return value.value
  }

  if (attribute) {
    const value = attribute.get(item)
    return value.displayValue ?? ''
  }

  return ''
}

function parseDynamicCells(
  item: ObjectItem,
  cellsAttribute?: DynamicColumnsType['cellsAttribute'],
): Record<string, unknown> {
  if (!cellsAttribute) return {}

  const value = cellsAttribute.get(item).value
  if (!value) return {}

  try {
    const parsed = JSON.parse(value) as unknown
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : {}
  } catch {
    return {}
  }
}

function getDynamicCellText(cells: Record<string, unknown>, key: string): string {
  const value = cells[key]
  return value != null ? String(value) : ''
}

// ─── Selection helpers ────────────────────────────────────────────────────────

function getSelectionMode(
  selection: AxMuiTableContainerProps['selection'],
): MuiTableSelectionMode {
  if (!selection) return 'none'
  const type = selection.type
  if (type === 'Single') return 'single'
  if (type === 'Multi') return 'multi'
  return 'none'
}

function getSelectionKeys(selection: AxMuiTableContainerProps['selection']): string[] {
  if (!selection) return []
  if (selection.type === 'Single') {
    return selection.selection ? [String(selection.selection.id)] : []
  }
  return selection.selection.map((item) => String(item.id))
}

function applySelection(
  selection: AxMuiTableContainerProps['selection'],
  items: ObjectItem[],
  keys: string[],
) {
  if (!selection) return
  const selected = items.filter((item) => keys.includes(String(item.id)))
  if (selection.type === 'Single') {
    selection.setSelection(selected[0])
    return
  }
  selection.setSelection(selected)
}

function syncSelectedKeysAttribute(
  attr: AxMuiTableContainerProps['selectedKeysAttr'],
  keys: string[],
) {
  if (!attr || attr.readOnly) return
  attr.setValue(JSON.stringify(keys))
}

// ─── Normalize helpers ────────────────────────────────────────────────────────

function normalizeAlign(value: string | undefined): MuiTableColumn['align'] {
  if (value === 'center' || value === 'right') return value
  return 'left'
}

function normalizeWidth(value: unknown): number | undefined {
  if (typeof value === 'number' && value > 0) return value
  if (value && typeof value === 'object' && 'toString' in value) {
    const parsed = Number(value.toString())
    return parsed > 0 ? parsed : undefined
  }
  return undefined
}

function normalizeOrder(value: unknown): number | undefined {
  if (typeof value === 'number') return value
  if (value && typeof value === 'object' && 'toString' in value) {
    const parsed = Number((value as { toString(): string }).toString())
    return Number.isFinite(parsed) ? parsed : undefined
  }
  return undefined
}
