import { AxDataTable } from '@ax/data-table/src/AxDataTable'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import type { AxDataTableContainerProps } from '@ax/data-table/typings/AxDataTableProps'
import type { DynamicValue, ListAttributeValue, ObjectItem } from 'mendix'
import { useState, useEffect } from 'react'

type TableColumn = AxDataTableContainerProps['columns'][number]
type TableAttributeValue = NonNullable<TableColumn['attributeValue']>
type TableDataSource = NonNullable<AxDataTableContainerProps['dataSource']>

type MockRowItem = ObjectItem & {
  values: Record<string, string>
}

type MockStatus = 'available' | 'unavailable' | 'loading'

const rows: MockRowItem[] = [
  createRow('1001', {
    orderNo: 'SO-1001',
    customer: 'Applied Materials',
    status: 'Scheduled',
    region: 'Singapore',
  }),
  createRow('1002', {
    orderNo: 'SO-1002',
    customer: 'Lam Research',
    status: 'In Production',
    region: 'Malaysia',
  }),
  createRow('1003', {
    orderNo: 'SO-1003',
    customer: 'KLA',
    status: 'Quality Review',
    region: 'Taiwan',
  }),
  createRow('1004', {
    orderNo: 'SO-1004',
    customer: 'Tokyo Electron',
    status: 'Ready to Ship',
    region: 'Japan',
  }),
]

function createMockDataSource(status: MockStatus): TableDataSource {
  return {
    status,
    items: rows,
    hasMoreItems: false,
    totalCount: rows.length,
    sortOrder: undefined,
    requestTotalCount: () => {},
    setOffset: () => {},
    setLimit: () => {},
    setSortOrder: () => {},
  } as unknown as TableDataSource
}

const columns: AxDataTableContainerProps['columns'] = [
  {
    columnKey: 'orderNo',
    caption: mockDynamic('Order No'),
    groupKey: '',
    groupCaption: '',
    visible: true,
    renderType: 'attribute',
    attributeValue: mockTableAttributeValue('orderNo'),
    allowRowEvents: false,
    sortable: true,
    align: 'left',
    width: 160,
    fixed: 'none',
    ellipsis: false,
  },
  {
    columnKey: 'customer',
    caption: mockDynamic('Customer'),
    groupKey: '',
    groupCaption: '',
    visible: true,
    renderType: 'attribute',
    attributeValue: mockTableAttributeValue('customer'),
    allowRowEvents: false,
    sortable: true,
    align: 'left',
    width: 220,
    fixed: 'none',
    ellipsis: true,
  },
  {
    columnKey: 'status',
    caption: mockDynamic('Status'),
    groupKey: 'shipment',
    groupCaption: 'Shipment',
    visible: true,
    renderType: 'attribute',
    attributeValue: mockTableAttributeValue('status'),
    allowRowEvents: false,
    sortable: true,
    align: 'left',
    width: 180,
    fixed: 'none',
    ellipsis: false,
  },
  {
    columnKey: 'region',
    caption: mockDynamic('Region'),
    groupKey: 'shipment',
    groupCaption: 'Shipment',
    visible: true,
    renderType: 'attribute',
    attributeValue: mockTableAttributeValue('region'),
    allowRowEvents: false,
    sortable: true,
    align: 'left',
    width: 160,
    fixed: 'none',
    ellipsis: false,
  },
]


function createRow(id: string, values: Record<string, string>): MockRowItem {
  return { id, values } as unknown as MockRowItem
}

function mockDynamic<T>(value: T): DynamicValue<T> {
  return { status: 'available', value } as DynamicValue<T>
}

function mockTableAttributeValue(key: string): TableAttributeValue {
  return mockListAttributeValue(key) as unknown as TableAttributeValue
}

function mockListAttributeValue(key: string): ListAttributeValue<string> {
  return {
    id: key,
    sortable: true,
    get: (item: ObjectItem) => {
      const value = (item as MockRowItem).values[key] ?? ''
      return {
        status: 'available',
        value,
        displayValue: value,
      }
    },
  } as unknown as ListAttributeValue<string>
}

export default function DataTablePage() {
  const [dataSource, setDataSource] = useState<TableDataSource>(() => createMockDataSource('unavailable'))

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDataSource(createMockDataSource('available'))
    }, 100)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
        Ax Data Table Simulation
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Static simulation of a normal table with fixed columns, no selection binding, and no row events.
      </Typography>

      <AxDataTable
        name="AxDataTable1"
        class=""
        dataSource={dataSource}
        title={mockDynamic('Order Fulfillment Snapshot')}
        stickyHeader={false}
        tableHeight={420}
        paginationMode="none"
        defaultPageNumber={1}
        pageSize={20}
        showRowCount={false}
        paginationVerticalPosition="below"
        paginationHorizontalAlign="right"
        selectionMethod="checkbox"
        showSelectAll={false}
        keepSelection={false}
        columns={columns}
      />
    </Box>
  )
}
