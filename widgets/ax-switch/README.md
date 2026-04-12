# AxSwitch

Toggle switch input widget for Mendix. Renders a Material UI switch with optional label placement, two-way binding to a Mendix boolean attribute, and validation support.

## Mendix Properties

| Property | Type | Required | Default | Description |
|---|---|---|---|---|
| `checkedAttr` | EditableValue\<boolean\> | No | — | Mendix boolean attribute for two-way binding |
| `label` | textTemplate | No | — | Label text displayed alongside the switch |
| `color` | enum | No | `primary` | `primary` \| `secondary` \| `success` \| `warning` \| `error` \| `info` |
| `size` | enum | No | `medium` | `small` \| `medium` |
| `labelPlacement` | enum | No | `end` | `end` \| `start` \| `top` \| `bottom` |
| `disabled` | boolean | No | `false` | Disable interaction |
| `onChange` | action | No | — | Nanoflow/microflow triggered after toggle |

## Architecture

```
AxSwitch.tsx          ← Mendix entry: wraps with ErrorBoundary, ThemeProvider, StoreProvider
  └─ AxSwitchSync     ← Maps Mendix props → MobX store via useEffect
       └─ Switch      ← MUI Switch with FormControlLabel (src/main/Switch.tsx)
```

### Layers

| Layer | File | Purpose |
|---|---|---|
| Widget entry | `src/AxSwitch.tsx` | Mendix runtime integration, provider setup |
| Sync | `AxSwitchSync` (in same file) | Bridges `EditableValue<boolean>` and `ActionValue` to store |
| Store | `src/main/store.ts` | MobX state: checked value, placement props, validation |
| UI | `src/main/Switch.tsx` | Renders MUI `<Switch>` wrapped in `<FormControlLabel>` |
| Editor preview | `src/AxSwitch.editorPreview.tsx` | Design-time preview in Studio Pro |
| Props definition | `src/AxSwitch.xml` | Mendix widget property schema |

### State Management (MobX `SwitchStore`)

| State | Type | Description |
|---|---|---|
| `checked` | `boolean` | Current toggle state, synced from Mendix `EditableValue` |
| `label` | `string` | Display label |
| `color` | `string` | MUI color token |
| `size` | `'small' \| 'medium'` | Switch size |
| `labelPlacement` | `string` | Label position relative to switch |
| `disabled` | `boolean` | Disabled state (also driven by `EditableValue.readOnly`) |
| `validation` | `string \| undefined` | Validation message from Mendix attribute |
| `loading` | `boolean` | `true` while attribute value is loading |
| `onCheckedChange` | `function` | Writes new boolean value back to `EditableValue` |
| `onChangeAction` | `function` | Executes bound Mendix action |

## Mendix Widget Purpose

Use on Mendix pages for boolean attribute toggling (e.g., feature flags, active/inactive states, consent checkboxes). Compared to `AxCheckbox`, the switch is better suited for settings-style controls where the on/off metaphor is more intuitive.
