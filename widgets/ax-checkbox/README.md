# AxCheckbox

Checkbox input widget for Mendix. Renders a Material UI checkbox with optional label, two-way binding to a Mendix boolean attribute, and validation support.

## Mendix Properties

| Property | Type | Required | Default | Description |
|---|---|---|---|---|
| `checkedAttr` | EditableValue\<boolean\> | No | — | Mendix boolean attribute for two-way binding |
| `label` | textTemplate | No | — | Label displayed beside the checkbox |
| `color` | enum | No | `primary` | `primary` \| `secondary` \| `success` \| `warning` \| `error` \| `info` \| `default` |
| `size` | enum | No | `medium` | `small` \| `medium` |
| `disabled` | boolean | No | `false` | Disable interaction |
| `onChange` | action | No | — | Nanoflow/microflow triggered after value changes |

## Architecture

```
AxCheckbox.tsx          ← Mendix entry: wraps with ErrorBoundary, ThemeProvider, StoreProvider
  └─ AxCheckboxSync     ← Maps Mendix props → MobX store via useEffect
       └─ Checkbox      ← MUI Checkbox with FormControlLabel (src/main/Checkbox.tsx)
```

### Layers

| Layer | File | Purpose |
|---|---|---|
| Widget entry | `src/AxCheckbox.tsx` | Mendix runtime integration, provider setup |
| Sync | `AxCheckboxSync` (in same file) | Bridges `EditableValue<boolean>` and `ActionValue` to store |
| Store | `src/main/store.ts` | MobX state: checked value, display props, validation |
| UI | `src/main/Checkbox.tsx` | Renders MUI `<Checkbox>` with optional label |
| Editor preview | `src/AxCheckbox.editorPreview.tsx` | Design-time preview in Studio Pro |
| Props definition | `src/AxCheckbox.xml` | Mendix widget property schema |

### State Management (MobX `CheckboxStore`)

| State | Type | Description |
|---|---|---|
| `checked` | `boolean` | Current checkbox state, synced from Mendix `EditableValue` |
| `label` | `string` | Display label |
| `color` | `string` | MUI color token |
| `size` | `'small' \| 'medium'` | Checkbox size |
| `disabled` | `boolean` | Disabled state (also driven by `EditableValue.readOnly`) |
| `validation` | `string \| undefined` | Validation message from Mendix attribute |
| `loading` | `boolean` | `true` while attribute value is loading |
| `onCheckedChange` | `function` | Writes new value back to `EditableValue` |
| `onChangeAction` | `function` | Executes bound Mendix action |

## Mendix Widget Purpose

Use on Mendix pages when a boolean attribute needs a styled MUI checkbox. The widget writes back to the bound `checkedAttr` on every toggle and calls `onChange` to trigger any required nanoflow logic (e.g., saving the object).
