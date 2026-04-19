# AxDataTable

Datasource-backed Ant Design table widget for Mendix. Supports fixed and dynamic columns, two-level grouped column headers, sticky header, bordered mode, paging buttons / load-more / virtual-scroll / no-pagination modes, remote sorting, single and multi-row selection with Mendix `selection` binding, row click / double-click actions, and three built-in cell renderers (attribute, dynamic text, link).

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
| `title` | textTemplate | No | — | Optional title rendered inside the Ant Design table header. |
| `stickyHeader` | boolean | No | `false` | Fix the column header while the body scrolls. |
| `tableHeight` | integer | No | `480` | Height in px for sticky-header and virtual-scroll modes. |
| `bordered` | boolean | No | `false` | Show cell and header borders. |

### General › Pagination

| Property | Type | Required | Default | Description |
|---|---|---|---|---|
| `paginationMode` | enum | No | `pagingButtons` | `pagingButtons` \| `virtualScroll` \| `loadMore` \| `none` |
| `defaultPageNumber` | integer | No | `1` | Starting page on first render. |
| `pageSize` | integer | No | `20` | Rows per page / batch. |
| `showSizeChanger` | boolean | No | `false` | Allow the user to pick a page size in the pagination control. |
| `showRowCount` | boolean | No | `true` | Show current row range and total below the table. |
| `paginationVerticalPosition` | enum | No | `below` | `above` \| `below` \| `both` |
| `paginationHorizontalAlign` | enum | No | `right` | `left` \| `center` \| `right` |

### General › Selection

| Property | Type | Required | Default | Description |
|---|---|---|---|---|
| `selectionMethod` | enum | No | `checkbox` | `checkbox` \| `radio` \| `row` |
| `showSelectAll` | boolean | No | `true` | Show select-all checkbox for checkbox multi-select. |
| `keepSelection` | boolean | No | `false` | Preserve selection across page / sort changes. |

### Columns › Fixed columns (`columns` object list)

Each item in the list defines one fixed column bound to the row datasource.

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
| `fixed` | enum | No | `none` | `none` \| `left` \| `right` — freeze column to the side. |
| `ellipsis` | boolean | No | `false` | Truncate overflow with ellipsis. |

### Columns › Dynamic columns

Dynamic columns come from a second datasource whose items each describe one column. Cell values are resolved from a JSON string attribute on the row.

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
| `dynamicColumnFixed` | textTemplate | No | — | `left` \| `right` \| `none` |

### Events

| Property | Type | Required | Description |
|---|---|---|---|
| `onRowClick` | action (dataSource) | No | Fires when a row is single-clicked. |
| `onRowDoubleClick` | action (dataSource) | No | Fires when a row is double-clicked. |
| `onSelectionChanged` | action | No | Fires after the Mendix `selection` property is updated. |

---

## Architecture

```
AxDataTable.tsx             ← Entry: ErrorBoundary → DataTableProvider → AxDataTableSync
  └─ AxDataTableSync        ← 2 effects: initializeDataSource + syncRuntimeState
       └─ DataTable.tsx     ← observer() UI; reads exclusively from DataTableStore
            main/store.ts   ← MobX makeAutoObservable; pure JS state, no Mendix types
            main/context.ts ← createWidgetContext<DataTableStore>('DataTable')
```

### Layers

| Layer | File | Purpose |
|---|---|---|
| Widget entry | `src/AxDataTable.tsx` | Provider setup, creates store via `createDataTableStore(props)` |
| Sync | `AxDataTableSync` (same file) | `initializeDataSource` effect + `syncRuntimeState` effect |
| Store | `src/main/store.ts` | All observable state; no Mendix types except `ObjectItem` |
| UI | `src/main/DataTable.tsx` | `observer()` Ant Design table; reads only from store |
| Context | `src/main/context.ts` | `DataTableProvider` / `useDataTableStore` |
| Props definition | `src/AxDataTable.xml` | Mendix widget property schema |

### MobX Store (`DataTableStore`)

**Static config** (set once at construction from `DataTableStoreConfig`):

| Field | Type | Default |
|---|---|---|
| `paginationMode` | `'pagingButtons' \| 'virtualScroll' \| 'loadMore' \| 'none'` | `'pagingButtons'` |
| `defaultPageNumber` | `number` | `1` |
| `pageSize` | `number` | `20` |
| `stickyHeader` | `boolean` | `false` |
| `tableHeight` | `number` | `480` |
| `bordered` | `boolean` | `false` |
| `showSizeChanger` | `boolean` | `false` |
| `showRowCount` | `boolean` | `true` |
| `paginationVerticalPosition` | `'above' \| 'below' \| 'both'` | `'below'` |
| `paginationHorizontalAlign` | `'left' \| 'center' \| 'right'` | `'right'` |
| `selectionMethod` | `'checkbox' \| 'radio' \| 'row'` | `'checkbox'` |
| `showSelectAll` | `boolean` | `true` |
| `keepSelection` | `boolean` | `false` |

**Runtime state** (updated by `syncRuntimeState` on each datasource tick):

| Field | Type | Description |
|---|---|---|
| `title` | `string` | Rendered inside the Ant Design table header. |
| `loading` | `boolean` | Shows Ant Design table spinner. |
| `unavailable` | `boolean` | Shows "Datasource unavailable" empty text. |
| `columns` | `DataTableColumn[]` | Merged fixed + dynamic columns. |
| `rows` | `DataTableRow[]` | Current page of rows with resolved cell values. |
| `hasMoreItems` | `boolean` | Whether the datasource has more items to load. |
| `totalCount` | `number \| undefined` | Total row count from datasource. |
| `currentPage` | `number` | Active page number. |
| `selectionMode` | `'none' \| 'single' \| 'multi'` | Derived from the Mendix selection type. |
| `selectedKeys` | `string[]` | Currently selected row object IDs. |
| `sortColumnKey` | `string \| undefined` | Column key currently sorted on. |
| `sortDirection` | `'asc' \| 'desc' \| undefined` | Active sort direction. |

### Sync Effects

**Effect 1 — `initializeDataSource`** (runs when `props.dataSource` changes):
- Calls `requestTotalCount`, `setOffset`, `setLimit` based on `paginationMode` and `defaultPageNumber`.

**Effect 2 — `syncRuntimeState`** (runs when datasource status / items / sort / selection / dynamic column props change):
- Always: `store.setTitle`, `store.setLoading`, `store.setUnavailable`.
- Only when `status === 'available'`: builds `columns` and `rows`, calls `store.setColumns` / `store.setRows`, syncs sort and selection state.

### Handler Wiring (set once in `createDataTableStore`)

All Mendix interactions are closures over `props` wired in `createDataTableStore`:

| Store handler | What it does |
|---|---|
| `onPageChange` | Calls `dataSource.setOffset` / `setLimit` per pagination mode. |
| `onLoadMore` | Increments page and expands the datasource limit. |
| `onSortChange` | Calls `dataSource.setSortOrder` with the matched attribute ID. |
| `onSelectionChange` | Applies Mendix `selection.setSelection` and writes JSON to `selectedKeysAttr`. |
| `onRowClick` | Calls `executeAction(props.onRowClick?.get(item))`. |
| `onRowDoubleClick` | Calls `executeAction(props.onRowDoubleClick?.get(item))`. |

---

## Mendix Widget Purpose

Use `AxDataTable` when you need a production-ready data grid backed by a Mendix datasource with full sorting, selection binding, and optional dynamic column configuration driven by a second datasource (e.g. columns from a JSON configuration entity). The Ant Design `Table` component handles virtualization, fixed columns, grouped headers, and pagination chrome automatically.

Typical setup:
1. Bind `dataSource` to a list of objects.
2. Add one entry per column in the `Fixed columns` list, referencing the relevant attribute.
3. Optionally bind a `dynamicColumnsSource` datasource and a `dynamicCellsAttribute` JSON string attribute to support columns that change at runtime.
4. Set `selection` to `Single` or `Multi` and wire `onSelectionChanged` if other widgets need to react.

---

## Deferred

- Per-column custom widget slot inside cells
- Column reordering and visibility personalization
- Inline editable cells
- Column-level filter controls