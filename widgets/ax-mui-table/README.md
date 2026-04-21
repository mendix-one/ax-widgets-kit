# AxMuiTable

MUI-based datasource table widget for Mendix. Replaces Ant Design with Material-UI components. Supports fixed and dynamic columns, two-level grouped column headers, sticky header, dense mode, paging buttons / load-more / no-pagination modes, remote sorting, single and multi-row selection, and three built-in cell renderers (attribute, dynamic text, link).

## Mendix Properties

### General › Data

| Property | Type | Required | Default | Description |
|---|---|---|---|---|
| `dataSource` | datasource | Yes | — | List datasource providing the row objects. |
| `selection` | selection | No | None | Mendix selection binding (None / Single / Multi). |
| `selectedKeysAttr` | attribute (String) | No | — | String attribute that receives selected row IDs as a JSON array. |

### General › Header

| Property | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | textTemplate | No | — | Optional title rendered above the table. |
| `stickyHeader` | boolean | No | `false` | Fix the column header while the body scrolls. |
| `tableHeight` | integer | No | `480` | Height in px for sticky-header mode. |
| `dense` | boolean | No | `false` | Use dense cell padding (MUI `size="small"`). |

### General › Pagination

| Property | Type | Required | Default | Description |
|---|---|---|---|---|
| `paginationMode` | enum | No | `pagingButtons` | `pagingButtons` \| `loadMore` \| `none` |
| `defaultPageNumber` | integer | No | `1` | Starting page on first render. |
| `pageSize` | integer | No | `20` | Rows per page / batch. |
| `showSizeChanger` | boolean | No | `false` | Show rows-per-page selector in the MUI TablePagination control. |
| `showRowCount` | boolean | No | `true` | Show current row range and total below the table (non-paging modes). |

### General › Selection

| Property | Type | Required | Default | Description |
|---|---|---|---|---|
| `selectionMethod` | enum | No | `checkbox` | `checkbox` \| `radio` \| `row` |
| `showSelectAll` | boolean | No | `true` | Show select-all checkbox for checkbox multi-select. |
| `keepSelection` | boolean | No | `false` | Preserve selection across page / sort changes. |

### Columns › Fixed columns (`columns` object list)

| Sub-property | Type | Required | Default | Description |
|---|---|---|---|---|
| `columnKey` | string | Yes | — | Stable identifier for this column. |
| `caption` | textTemplate | No | — | Column header label. |
| `groupKey` | string | No | — | Groups this column under a shared header. |
| `groupCaption` | string | No | — | Label shown for the group header. |
| `visible` | boolean | No | `true` | Show or hide the column. |
| `renderType` | enum | No | `attribute` | `attribute` \| `dynamicText` \| `link` |
| `attributeValue` | attribute | No | — | Datasource attribute for cell content and remote sorting. |
| `dynamicTextValue` | textTemplate | No | — | Text template for the `dynamicText` render type. |
| `linkCaption` | textTemplate | No | — | Caption for `link` cells. |
| `linkAction` | action | No | — | Action executed when the link cell is clicked. |
| `allowRowEvents` | boolean | No | `false` | Let row-click / selection fire when the cell is clicked. |
| `sortable` | boolean | No | `false` | Enable remote sorting when the attribute supports it. |
| `align` | enum | No | `left` | `left` \| `center` \| `right` |
| `width` | integer | No | `180` | Preferred column width in px. |
| `ellipsis` | boolean | No | `false` | Truncate overflow with ellipsis. |

### Columns › Dynamic columns

| Property | Type | Required | Default | Description |
|---|---|---|---|---|
| `dynamicColumnsSource` | datasource | No | — | Datasource providing column-descriptor objects. |
| `dynamicCellsAttribute` | attribute (String) | No | — | Row attribute containing a JSON object of cell values. |
| `dynamicColumnKey` | textTemplate | No | — | Unique key per column descriptor item. |
| `dynamicColumnTitle` | textTemplate | No | — | Header title per column descriptor. |
| `dynamicColumnValueKey` | textTemplate | No | — | JSON key used to look up the cell value (defaults to `dynamicColumnKey`). |
| `dynamicColumnGroupKey` | textTemplate | No | — | Group key for the grouped header. |
| `dynamicColumnGroupTitle` | textTemplate | No | — | Group header title. |
| `dynamicColumnVisible` | expression (Boolean) | No | — | Whether the column is shown. |
| `dynamicColumnWidth` | expression (Integer) | No | — | Column width in px. |
| `dynamicColumnAlign` | textTemplate | No | — | `left` \| `center` \| `right` |

### Events

| Property | Type | Required | Description |
|---|---|---|---|
| `onRowClick` | action (dataSource) | No | Fires when a row is single-clicked. |
| `onRowDoubleClick` | action (dataSource) | No | Fires when a row is double-clicked. |
| `onSelectionChanged` | action | No | Fires after the Mendix `selection` property is updated. |

---

## Architecture

```
AxMuiTable.tsx                  ← Entry: ErrorBoundary → AxThemeProvider → MuiTableProvider → AxMuiTableSync
  └─ AxMuiTableSync             ← 2 effects: initializeDataSource + syncRuntimeState
       └─ MuiTable.tsx          ← observer() root; assembles sub-components
            ├─ MuiTableHead.tsx        ← TableHead + grouped rows + TableSortLabel
            ├─ MuiTableBody.tsx        ← TableBody; iterates rows
            │    └─ MuiTableBodyRow.tsx ← TableRow + selection cell + MuiTableBodyCell per column
            └─ MuiTableFooterControls.tsx ← TablePagination / load-more / row-count
            main/store.ts       ← MobX makeAutoObservable; pure JS state, no Mendix types
            main/context.ts     ← MuiTableProvider / useMuiTableStore
```

### Component responsibilities

| Component | File | Renders |
|---|---|---|
| Root | `MuiTable.tsx` | `<Paper>`, title, `<TableContainer>`, `<Table>`, sub-components |
| Header | `MuiTableHead.tsx` | `<TableHead>`, grouped `<TableRow>`s, `<TableSortLabel>`, select-all `<Checkbox>` |
| Body | `MuiTableBody.tsx` | `<TableBody>`, empty/loading state rows |
| Body row | `MuiTableBodyRow.tsx` | `<TableRow>` per data row, selection `<Checkbox>`/`<Radio>`, `<TableCell>` per column |
| Footer | `MuiTableFooterControls.tsx` | MUI `<TablePagination>` or Load More `<Button>` + row-count `<Typography>` |

All components share the same `MuiTableStore` instance through the `MuiTableProvider` context — no props are drilled between them.

### MobX Store (`MuiTableStore`)

All the same fields as `AxDataTable`'s store, minus Ant Design-specific fields (`bordered`, `paginationVerticalPosition`, `paginationHorizontalAlign`, `virtualScroll`). Adds:

| Field | Type | Default |
|---|---|---|
| `dense` | `boolean` | `false` |

Computed getters:

| Getter | Description |
|---|---|
| `isAllSelected` | `true` when every row key is in `selectedKeys` |
| `isIndeterminate` | `true` when some but not all rows are selected |
