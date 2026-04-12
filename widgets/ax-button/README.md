# AxButton

General-purpose button widget for Mendix. Renders a Material UI button with configurable label, variant, color, size, and click action.

## Mendix Properties

| Property | Type | Required | Default | Description |
|---|---|---|---|---|
| `label` | textTemplate | No | — | Button label text |
| `variant` | enum | No | `contained` | `contained` \| `outlined` \| `text` |
| `color` | enum | No | `primary` | `primary` \| `secondary` \| `success` \| `warning` \| `error` \| `info` |
| `size` | enum | No | `medium` | `small` \| `medium` \| `large` |
| `disabled` | boolean | No | `false` | Disable interaction |
| `fullWidth` | boolean | No | `false` | Stretch to container width |
| `onClick` | action | No | — | Mendix nanoflow/microflow to execute on click |

## Architecture

```
AxButton.tsx          ← Mendix entry: wraps with ErrorBoundary, ThemeProvider, StoreProvider
  └─ AxButtonSync     ← Maps Mendix props → MobX store via useEffect
       └─ Button      ← MUI Button render (src/main/Button.tsx)
```

### Layers

| Layer | File | Purpose |
|---|---|---|
| Widget entry | `src/AxButton.tsx` | Mendix runtime integration, provider setup |
| Sync | `AxButtonSync` (in same file) | Bridges Mendix `DynamicValue`/`ActionValue` to store |
| Store | `src/main/store.ts` | MobX state: label, variant, color, size flags, onClick |
| UI | `src/main/Button.tsx` | Renders MUI `<Button>` from store state |
| Editor preview | `src/AxButton.editorPreview.tsx` | Design-time preview in Studio Pro |
| Props definition | `src/AxButton.xml` | Mendix widget property schema |

### State Management (MobX `ButtonStore`)

| State | Type | Description |
|---|---|---|
| `label` | `string` | Button display text |
| `variant` | `'contained' \| 'outlined' \| 'text'` | MUI button variant |
| `color` | `string` | MUI color token |
| `size` | `'small' \| 'medium' \| 'large'` | Button size |
| `disabled` | `boolean` | Disabled state |
| `fullWidth` | `boolean` | Full-width expansion |
| `onClick` | `(() => void) \| undefined` | Bound Mendix action callback |

## Mendix Widget Purpose

Drop-in replacement for the default Mendix button with full MUI styling support. Useful when design consistency with MUI-based pages is required. Place directly on any Mendix page or inside `AxButtonGroup`.
