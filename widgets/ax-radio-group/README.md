# AxRadioGroup

Radio group input widget for Mendix. Renders a group of MUI radio buttons sourced from a Mendix object list, with two-way binding to a string attribute.

## Mendix Properties

| Property | Type | Required | Description |
|---|---|---|---|
| `valueAttr` | EditableValue\<string\> | No | Mendix string attribute for two-way binding |
| `label` | textTemplate | No | Group label |
| `options` | object list | No | List of options; each item exposes `optValue` and `optLabel` |
| `row` | boolean | No | Display buttons horizontally when `true` |
| `color` | enum | No | `primary` \| `secondary` \| `success` \| `warning` \| `error` \| `info` |
| `size` | enum | No | `small` \| `medium` |
| `disabled` | boolean | No | Disable all radio buttons |
| `onChange` | action | No | Nanoflow/microflow triggered after selection changes |

## Architecture

```
AxRadioGroup.tsx          ← Mendix entry: wraps with ErrorBoundary, ThemeProvider, StoreProvider
  └─ AxRadioGroupSync     ← Maps Mendix props → MobX store via useEffect
       └─ RadioGroup      ← MUI RadioGroup render (src/main/RadioGroup.tsx)
```

### Layers

| Layer | File | Purpose |
|---|---|---|
| Widget entry | `src/AxRadioGroup.tsx` | Mendix runtime integration, provider setup |
| Sync | `AxRadioGroupSync` (in same file) | Iterates object list into `{ value, label }[]` for store |
| Store | `src/main/store.ts` | MobX state: selected value, options, display props |
| UI | `src/main/RadioGroup.tsx` | Renders MUI `<RadioGroup>` with `<FormControlLabel>` per option |
| Editor preview | `src/AxRadioGroup.editorPreview.tsx` | Design-time preview in Studio Pro |
| Props definition | `src/AxRadioGroup.xml` | Mendix widget property schema |

### State Management (MobX `RadioGroupStore`)

| State | Type | Description |
|---|---|---|
| `value` | `string` | Currently selected option value, synced to Mendix `EditableValue` |
| `options` | `{ value: string; label: string }[]` | Mapped from Mendix object list |
| `label` | `string` | Group-level label |
| `row` | `boolean` | Horizontal layout toggle |
| `color` | `string` | MUI color token |
| `size` | `'small' \| 'medium'` | Radio button size |
| `disabled` | `boolean` | Disabled state |
| `onValueChange` | `function` | Writes selected value back to `EditableValue` |
| `onChangeAction` | `function` | Executes bound Mendix action |

## Mendix Widget Purpose

Use on Mendix data entry pages when users must select exactly one option from a list. Configure the `options` object list from an enumeration helper entity or any Mendix object list. The widget writes the selected string value back to the bound attribute on every change.
