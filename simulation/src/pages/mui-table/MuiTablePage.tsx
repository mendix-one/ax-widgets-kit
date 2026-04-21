import { AxMuiTable } from '@ax/mui-table/src/AxMuiTable'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'

import type { AxMuiTableContainerProps } from '@ax/mui-table/typings/AxMuiTableProps'
import type { DynamicValue, ListAttributeValue, ListValue, ObjectItem } from 'mendix'

// ─── Local types ──────────────────────────────────────────────────────────────

type DataSource = AxMuiTableContainerProps['dataSource']
type Columns = AxMuiTableContainerProps['columns']
type DynamicColumns = AxMuiTableContainerProps['dynamicColumns']

type MockRowItem = ObjectItem & {
  employee: string
  department: string
  cells: string // JSON — keyed by column key
}

type MockColDescriptor = ObjectItem & {
  key: string
  title: string
  order: number
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const rows = [
  makeRow('r1', 'Alice Chen', 'Engineering', { q1: 92, q2: 88, q3: 95, q4: 91 }),
  makeRow('r2', 'Bob Lee', 'Marketing', { q1: 78, q2: 85, q3: 80, q4: 83 }),
  makeRow('r3', 'Carol Park', 'Design', { q1: 88, q2: 90, q3: 87, q4: 92 }),
  makeRow('r4', 'David Kim', 'Engineering', { q1: 95, q2: 93, q3: 97, q4: 94 }),
  makeRow('r5', 'Emma Wang', 'HR', { q1: 82, q2: 79, q3: 84, q4: 86 }),
  makeRow('r6', 'Frank Tan', 'Marketing', { q1: 74, q2: 77, q3: 76, q4: 80 }),
]

// Column descriptors — intentionally shuffled to prove order sorting works
const colDescriptors: MockColDescriptor[] = [
  { id: 'cd_q3', key: 'q3', title: 'Q3 Score', order: 6 },
  { id: 'cd_q1', key: 'q1', title: 'Q1 Score', order: 4 },
  { id: 'cd_q4', key: 'q4', title: 'Q4 Score', order: 7 },
  { id: 'cd_q2', key: 'q2', title: 'Q2 Score', order: 5 },
] as unknown as MockColDescriptor[]

// ─── Mock helpers ─────────────────────────────────────────────────────────────

function makeRow(id: string, employee: string, department: string, scores: Record<string, number>): MockRowItem {
  return { id, employee, department, cells: JSON.stringify(scores) } as unknown as MockRowItem
}

function mockDynamic<T>(value: T): DynamicValue<T> {
  return { status: 'available', value } as DynamicValue<T>
}

function mockStrAttr(key: keyof MockRowItem): ListAttributeValue<string> {
  return {
    id: key,
    sortable: true,
    get: (item: ObjectItem) => {
      const v = String((item as MockRowItem)[key] ?? '')
      return { status: 'available', value: v, displayValue: v }
    },
  } as unknown as ListAttributeValue<string>
}

function mockCellsAttr(): ListAttributeValue<string> {
  return {
    id: 'cells',
    sortable: false,
    get: (item: ObjectItem) => {
      const v = (item as MockRowItem).cells ?? '{}'
      return { status: 'available', value: v, displayValue: v }
    },
  } as unknown as ListAttributeValue<string>
}

function mockListValue(items: ObjectItem[]): ListValue {
  return {
    status: 'available',
    items,
    hasMoreItems: false,
    totalCount: items.length,
    requestTotalCount: () => {},
    setOffset: () => {},
    setLimit: () => {},
    setSortOrder: () => {},
  } as unknown as ListValue
}

/** Returns a mock ListExpressionValue<T> driven by a per-item getter */
function mockExpr<T>(fn: (item: ObjectItem) => T) {
  return {
    get: (item: ObjectItem) => ({ status: 'available' as const, value: fn(item) }),
  }
}

/** Returns a Big-compatible object that satisfies normalizeWidth / normalizeOrder */
function mockBigLike(n: number) {
  return { toString: () => String(n) }
}

function mockDataSource(items: MockRowItem[], status: 'available' | 'unavailable'): DataSource {
  return {
    status,
    items: status === 'available' ? items : undefined,
    hasMoreItems: false,
    totalCount: items.length,
    requestTotalCount: () => {},
    setOffset: () => {},
    setLimit: () => {},
    setSortOrder: () => {},
  } as unknown as DataSource
}

// ─── Column definitions ───────────────────────────────────────────────────────

const fixedColumns: Columns = [
  {
    columnKey: 'employee',
    caption: mockDynamic('Employee'),
    groupKey: '',
    groupCaption: '',
    visible: true,
    renderType: 'attribute',
    attributeValue: mockStrAttr('employee'),
    allowRowEvents: false,
    sortable: true,
    align: 'left',
    width: 200,
    ellipsis: false,
  },
  {
    columnKey: 'department',
    caption: mockDynamic('Department'),
    groupKey: '',
    groupCaption: '',
    visible: true,
    renderType: 'attribute',
    attributeValue: mockStrAttr('department'),
    allowRowEvents: false,
    sortable: true,
    align: 'left',
    width: 160,
    ellipsis: false,
  },
]

// Descriptors are shuffled (Q3, Q1, Q4, Q2) but columnOrder will sort them Q1→Q2→Q3→Q4
const dynamicColumns = [
  {
    columnsSource: mockListValue(colDescriptors as unknown as ObjectItem[]),
    cellsAttribute: mockCellsAttr(),
    columnKey: mockExpr((item) => (item as unknown as MockColDescriptor).key),
    columnTitle: mockExpr((item) => (item as unknown as MockColDescriptor).title),
    columnValueKey: mockExpr((item) => (item as unknown as MockColDescriptor).key),
    columnGroupKey: mockExpr(() => 'scores'),
    columnGroupTitle: mockExpr(() => 'Performance Scores'),
    columnVisible: mockExpr(() => true),
    columnWidth: mockExpr(() => mockBigLike(120)),
    columnAlign: mockExpr(() => 'center'),
    columnOrder: mockExpr((item) => mockBigLike((item as unknown as MockColDescriptor).order)),
  },
] as unknown as DynamicColumns

// ─── Page component ───────────────────────────────────────────────────────────

export default function MuiTablePage() {
  const [dataSource, setDataSource] = useState<DataSource>(() => mockDataSource(rows, 'unavailable'))

  useEffect(() => {
    const t = window.setTimeout(() => setDataSource(mockDataSource(rows, 'available')), 100)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
        Ax MUI Table Simulation
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Fixed columns (Employee, Department) + dynamic columns (Q1–Q4 scores) from a separate column-descriptor
        datasource. Descriptors are intentionally shuffled; <code>columnOrder</code> sorts them Q1→Q2→Q3→Q4.
      </Typography>

      <AxMuiTable
        name="AxMuiTable1"
        class=""
        dataSource={dataSource}
        title={mockDynamic('Employee Performance — 2025')}
        stickyHeader={false}
        tableHeight={480}
        dense={false}
        paginationMode="none"
        defaultPageNumber={1}
        pageSize={20}
        showSizeChanger={false}
        showRowCount={true}
        selectionMethod="checkbox"
        showSelectAll={true}
        keepSelection={false}
        columns={fixedColumns}
        dynamicColumns={dynamicColumns}
      />
    </Box>
  )
}
