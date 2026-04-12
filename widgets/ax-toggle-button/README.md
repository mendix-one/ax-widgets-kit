# AxToggleButton

Toggle button group widget for Mendix. Renders a Material UI `ToggleButtonGroup` sourced from a Mendix object list with exclusive or multi-select modes, horizontal or vertical orientation.

## Mendix Properties

| Property | Type | Required | Default | Description |
|---|---|---|---|---|
| `valueAttr` | EditableValue\<string\> | No | — | Mendix string attribute for two-way binding |
| `options` | object list | No | — | Options list; each item exposes `optValue` and `optLabel` |
| `exclusive` | boolean | No | `true` | Single-select mode when `true`; multi-select when `false` |
| `disabled` | boolean | No | `false` | Disable all buttons |
| `fullWidth` | boolean | No | `false` | Stretch group to container width |
| `color` | enum | No | `primary` | `primary` \| `secondary` \| `success` \| `warning` \| `error` \| `info` |
| `size` | enum | No | `medium` | `small` \| `medium` \| `large` |
| `orientation` | enum | No | `horizontal` | `horizontal` \| `vertical` |
| `onChange` | action | No | — | Nanoflow/microflow triggered after selection changes |

## Architecture

```
AxToggleButton.tsx          ← Mendix entry: wraps with ErrorBoundary, ThemeProvider, StoreProvider
  └─ AxToggleButtonSync     ← Maps Mendix props → MobX store via useEffect
       └─ ToggleButton      ← MUI ToggleButtonGroup render (src/main/ToggleButton.tsx)
```

### Layers

| Layer | File | Purpose |
|---|---|---|
| Widget entry | `src/AxToggleButton.tsx` | Mendix runtime integration, provider setup |
| Sync | `AxToggleButtonSync` (in same file) | Iterates object list into `{ value, label }[]` for store |
| Store | `src/main/store.ts` | MobX state: selected value, options, display props |
| UI | `src/main/ToggleButton.tsx` | Renders MUI `<ToggleButtonGroup>` with a `<ToggleButton>` per option |
| Editor preview | `src/AxToggleButton.editorPreview.tsx` | Design-time preview in Studio Pro |
| Props definition | `src/AxToggleButton.xml` | Mendix widget property schema |

### State Management (MobX `ToggleButtonStore`)

| State | Type | Description |
|---|---|---|
| `value` | `string` | Selected option value, synced from Mendix `EditableValue` |
| `options` | `{ value: string; label: string }[]` | Mapped from Mendix object list |
| `exclusive` | `boolean` | Single-select mode toggle |
| `disabled` | `boolean` | Disabled state |
| `fullWidth` | `boolean` | Full-width expansion |
| `color` | `string` | MUI color token |
| `size` | `string` | Button size |
| `orientation` | `string` | Layout direction |
| `onValueChange` | `function` | Writes selected value back to `EditableValue` |
| `onChangeAction` | `function` | Executes bound Mendix action |

## Mendix Widget Purpose

Use on Mendix pages when users choose between a small distinct set of options that benefit from a visually segmented control (e.g., view mode selection, filter tabs, priority tiers). Particularly useful as a styled alternative to radio groups when options count is 2-5 items.
