import { ErrorBoundary, executeAction } from '@ax/shared'
import { configure } from 'mobx'
import { type ReactElement, useEffect } from 'react'

import { DataTableProvider, useDataTableStore } from './main/context'
import { DataTable } from './main/DataTable'
import {
    type DataTableCell,
    type DataTableColumn,
    type DataTableSelectionMode,
    DataTableStore,
} from './main/store'

import type { ListValue, ObjectItem } from 'mendix'
import type { DynamicValue } from 'mendix'

import type { AxDataTableContainerProps, ColumnsType } from '../typings/AxDataTableProps'

type RuntimeColumn = DataTableColumn & {
    source: 'fixed' | 'dynamic'
    attributeValue?: ColumnsType['attributeValue']
    dynamicTextValue?: ColumnsType['dynamicTextValue']
    linkCaption?: ColumnsType['linkCaption']
    linkAction?: ColumnsType['linkAction']
    valueKey?: string
}

configure({ isolateGlobalState: true })

export function AxDataTable(props: AxDataTableContainerProps): ReactElement {
    return (
        <ErrorBoundary>
            <DataTableProvider createStore={() => new DataTableStore()}>
                <AxDataTableSync {...props} />
            </DataTableProvider>
        </ErrorBoundary>
    )
}

function AxDataTableSync(props: AxDataTableContainerProps): ReactElement {
    const store = useDataTableStore()

    useEffect(() => {
        buildStoreEvent(props, store)
        buildStoreConfig(props, store)
    }, [
        props,
        store,
    ])

    useEffect(() => {
        buildPagination(props.dataSource, store)
        syncRuntimeState(props, store)
    }, [props.dataSource, store])

    return <DataTable />
}

function buildStoreEvent(props: AxDataTableContainerProps, store: DataTableStore) {

    store.setOnPageChange((page) => {
        const safePage = Math.max(1, page)
        store.setCurrentPage(safePage)

        if (store.paginationMode === 'pagingButtons') {
            props.dataSource.setOffset((safePage - 1) * Math.max(1, store.pageSize))
            props.dataSource.setLimit(Math.max(1, store.pageSize))
            return
        }

        if (store.paginationMode === 'loadMore' || store.paginationMode === 'virtualScroll') {
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

function buildStoreConfig(props: AxDataTableContainerProps, store: DataTableStore) {
    const initialPage = Math.max(1, props.defaultPageNumber)
    store.setTitle(props.title?.value ?? '')
    store.setStickyHeader(props.stickyHeader)
    store.setTableHeight(props.tableHeight || 0)
    store.setPaginationMode(props.paginationMode)
    store.setDefaultPageNumber(initialPage)
    store.setPageSize(props.pageSize)
    store.setShowRowCount(props.showRowCount)
    store.setPaginationVerticalPosition(props.paginationVerticalPosition)
    store.setPaginationHorizontalAlign(props.paginationHorizontalAlign)
    store.setSelectionMethod(props.selectionMethod)
    store.setShowSelectAll(props.showSelectAll)
    store.setKeepSelection(props.keepSelection)
    store.setBordered(props.bordered)
    store.setShowSizeChanger(props.showSizeChanger)
}

function buildPagination(dataSource: ListValue, store: DataTableStore) {
    // always need total count to render pagination correctly, even if pagination mode is 'none'
    dataSource.requestTotalCount(true)

    const dsPageNo = dataSource.offset && dataSource.limit ? Math.floor(dataSource.offset / dataSource.limit) + 1 : 1
    if (dsPageNo !== store.currentPage) {
        if (store.paginationMode === 'pagingButtons') {
            const pageSize = Math.max(1, store.pageSize)
            dataSource.setOffset((store.defaultPageNumber - 1) * pageSize)
            dataSource.setLimit(pageSize)
        } else if (store.paginationMode === 'loadMore' || store.paginationMode === 'virtualScroll') {
            dataSource.setOffset(0)
            dataSource.setLimit(Math.max(1, store.defaultPageNumber * store.pageSize))
        } else if (store.paginationMode === 'none') {
            dataSource.setOffset(0)
            dataSource.setLimit(undefined)
        }
        store.setCurrentPage(store.defaultPageNumber)
    }
}

function syncRuntimeState(props: AxDataTableContainerProps, store: DataTableStore) {
    store.setLoading(props.dataSource.status.toString().toLocaleLowerCase() === 'loading')
    store.setUnavailable(props.dataSource.status.toString().toLocaleLowerCase() === 'unavailable')

    if (props.dataSource.status.toString().toLocaleLowerCase() === 'available') {
        store.setHasMoreItems(Boolean(props.dataSource.hasMoreItems))
        store.setTotalCount(props.dataSource.totalCount)
        const columns = [...normalizeColumns(props.columns ?? []), ...normalizeDynamicColumns(props)]
        const rows = (props.dataSource.items ?? []).map((item) => buildRow(item, columns, props.dynamicCellsAttribute))
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

        const matchedColumn = (props.columns ?? []).find((column) => column.attributeValue?.id === sortInstruction[0])
        store.setSortState(matchedColumn?.columnKey, sortInstruction[1])
    }
}

function normalizeColumns(columns: ColumnsType[]): RuntimeColumn[] {
    return columns
        .filter((column) => column.visible)
        .map((column) => ({
            source: 'fixed',
            key: column.columnKey,
            title: column.caption?.value ?? column.columnKey,
            groupKey: column.groupKey || undefined,
            groupCaption: column.groupCaption || undefined,
            align: column.align,
            width: column.width > 0 ? column.width : undefined,
            fixed: column.fixed === 'none' ? undefined : column.fixed,
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

function normalizeDynamicColumns(props: AxDataTableContainerProps): RuntimeColumn[] {
    if (!props.dynamicColumnsSource?.items?.length || !props.dynamicColumnKey || !props.dynamicColumnTitle) {
        return []
    }

    return props.dynamicColumnsSource.items.flatMap((item) => {
        const key = props.dynamicColumnKey?.get(item).value?.trim()
        if (!key) {
            return []
        }

        const visible = props.dynamicColumnVisible?.get(item).value ?? true
        if (!visible) {
            return []
        }

        return [{
            source: 'dynamic',
            key,
            title: props.dynamicColumnTitle?.get(item).value ?? key,
            groupKey: props.dynamicColumnGroupKey?.get(item).value || undefined,
            groupCaption: props.dynamicColumnGroupTitle?.get(item).value || undefined,
            align: normalizeAlign(props.dynamicColumnAlign?.get(item).value),
            width: normalizeWidth(props.dynamicColumnWidth?.get(item).value),
            fixed: normalizeFixed(props.dynamicColumnFixed?.get(item).value),
            ellipsis: true,
            renderType: 'dynamicText',
            allowRowEvents: true,
            canSort: false,
            valueKey: props.dynamicColumnValueKey?.get(item).value || key,
        }]
    })
}

function buildRow(
    item: ObjectItem,
    columns: RuntimeColumn[],
    dynamicCellsAttribute?: AxDataTableContainerProps['dynamicCellsAttribute'],
): { key: string; item: ObjectItem; cells: Record<string, DataTableCell> } {
    const dynamicCells = parseDynamicCells(item, dynamicCellsAttribute)
    const cells = columns.reduce<Record<string, DataTableCell>>((accumulator, column) => {
        accumulator[column.key] = buildCell(item, column, dynamicCells)
        return accumulator
    }, {})

    return {
        key: String(item.id),
        item,
        cells,
    }
}

function buildCell(item: ObjectItem, column: RuntimeColumn, dynamicCells: Record<string, unknown>): DataTableCell {
    if (column.source === 'dynamic') {
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
        if (value.value) {
            return value.value
        }
    }

    if (template) {
        const value = template.get(item)
        if (value.value) {
            return value.value
        }
    }

    if (attribute) {
        const value = attribute.get(item)
        return value.displayValue ?? ''
    }

    return ''
}

function parseDynamicCells(
    item: ObjectItem,
    dynamicCellsAttribute?: AxDataTableContainerProps['dynamicCellsAttribute'],
): Record<string, unknown> {
    if (!dynamicCellsAttribute) {
        return {}
    }

    const value = dynamicCellsAttribute.get(item).value
    if (!value) {
        return {}
    }

    try {
        const parsed = JSON.parse(value) as unknown
        return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed as Record<string, unknown> : {}
    } catch {
        return {}
    }
}

function getDynamicCellText(dynamicCells: Record<string, unknown>, key: string): string {
    const value = dynamicCells[key]
    if (value === null || value === undefined) {
        return ''
    }

    if (typeof value === 'string') {
        return value
    }

    if (typeof value === 'number' || typeof value === 'boolean') {
        return String(value)
    }

    return JSON.stringify(value)
}

function normalizeAlign(value?: string): DataTableColumn['align'] {
    if (value === 'center' || value === 'right') {
        return value
    }

    return 'left'
}

function normalizeFixed(value?: string): DataTableColumn['fixed'] {
    if (value === 'left' || value === 'right') {
        return value
    }

    return undefined
}

function normalizeWidth(value: unknown): number | undefined {
    if (typeof value === 'number' && value > 0) {
        return value
    }

    if (value && typeof value === 'object' && 'toString' in value) {
        const parsed = Number(value.toString())
        return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined
    }

    return undefined
}

function getSelectionMode(selection: AxDataTableContainerProps['selection']): DataTableSelectionMode {
    if (!selection) {
        return 'none'
    }

    return selection.type === 'Multi' ? 'multi' : 'single'
}

function getSelectionKeys(selection: AxDataTableContainerProps['selection']): string[] {
    if (!selection) {
        return []
    }

    if (selection.type === 'Single') {
        return selection.selection ? [String(selection.selection.id)] : []
    }

    return selection.selection.map((item) => String(item.id))
}

function applySelection(selection: AxDataTableContainerProps['selection'], items: ObjectItem[], keys: string[]) {
    if (!selection) {
        return
    }

    const selectedItems = items.filter((item) => keys.includes(String(item.id)))

    if (selection.type === 'Single') {
        selection.setSelection(selectedItems[0])
        return
    }

    selection.setSelection(selectedItems)
}

function syncSelectedKeysAttribute(attribute: AxDataTableContainerProps['selectedKeysAttr'], keys: string[]) {
    if (!attribute || attribute.readOnly) {
        return
    }

    attribute.setValue(JSON.stringify(keys))
}