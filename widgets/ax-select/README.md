# AxSelect

Dropdown select widget for Mendix. Renders a Material UI Select field with options sourced from a Mendix object list, two-way attribute binding, and validation support.

## Mendix Properties

| Property | Type | Required | Default | Description |
|---|---|---|---|---|
| `valueAttr` | EditableValue\<string\> | No | — | Mendix string attribute for two-way binding |
| `label` | textTemplate | No | — | Field label |
| `options` | object list | No | — | Options list; each item exposes `optValue` and `optLabel` |
| `variant` | enum | No | `outlined` | `outlined` \| `filled` \| `standard` |
| `size` | enum | No | `small` | `small` \| `medium` |
| `disabled` | boolean | No | `false` | Disable interaction |
| `fullWidth` | boolean | No | `true` | Stretch to container width |
| `helperText` | textTemplate | No | — | Helper/hint text below the field |
| `onChange` | action | No | — | Nanoflow/microflow triggered after selection changes |

## Architecture

```
AxSelect.tsx          ← Mendix entry: wraps with ErrorBoundary, ThemeProvider, StoreProvider
  └─ AxSelectSync     ← Maps Mendix props → MobX store via useEffect
       └─ Select      ← MUI Select render (src/main/Select.tsx)
```

### Layers

| Layer | File | Purpose |
|---|---|---|
| Widget entry | `src/AxSelect.tsx` | Mendix runtime integration, provider setup |
| Sync | `AxSelectSync` (in same file) | Iterates Mendix object list into `{ value, label }[]` for store |
| Store | `src/main/store.ts` | MobX state: selected value, options, display props, validation |
| UI | `src/main/Select.tsx` | Renders MUI `<Select>` inside `<FormControl>` with label and helper text |
| Editor preview | `src/AxSelect.editorPreview.tsx` | Design-time preview in Studio Pro |
| Props definition | `src/AxSelect.xml` | Mendix widget property schema |

### State Management (MobX `SelectStore`)

| State | Type | Description |
|---|---|---|
| `value` | `string` | Selected option, synced from Mendix `EditableValue` |
| `options` | `{ value: string; label: string }[]` | Mapped from Mendix object list |
| `label` | `string` | Field label |
| `variant` | `string` | MUI field variant |
| `size` | `string` | Field size |
| `disabled` | `boolean` | Disabled state |
| `fullWidth` | `boolean` | Full-width expansion |
| `helperText` | `string` | Helper/hint text |
| `validation` | `string \| undefined` | Validation message from Mendix attribute |
| `loading` | `boolean` | `true` while attribute value is loading |
| `onValueChange` | `function` | Writes selected value back to `EditableValue` |
| `onChangeAction` | `function` | Executes bound Mendix action |

## Mendix Widget Purpose

Use on Mendix data entry pages when users must pick a value from a finite list. The `options` list is typically backed by a Mendix enumeration or association. The selected string value is written back to the bound attribute, and the `onChange` nanoflow can trigger any downstream business logic (e.g., cascade filters, commit).
