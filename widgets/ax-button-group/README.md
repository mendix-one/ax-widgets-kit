# AxButtonGroup

Button group container widget for Mendix. Groups `AxButton` or other button widgets with shared variant, color, size, and orientation styling.

## Mendix Properties

| Property | Type | Required | Default | Description |
|---|---|---|---|---|
| `content` | widgets | No | — | Child button widgets to group |
| `variant` | enum | No | `contained` | `contained` \| `outlined` \| `text` |
| `color` | enum | No | `primary` | `primary` \| `secondary` \| `success` \| `warning` \| `error` \| `info` |
| `size` | enum | No | `medium` | `small` \| `medium` \| `large` |
| `orientation` | enum | No | `horizontal` | `horizontal` \| `vertical` |
| `disabled` | boolean | No | `false` | Disable all child buttons |
| `fullWidth` | boolean | No | `false` | Stretch group to container width |

## Architecture

```
AxButtonGroup.tsx          ← Mendix entry: wraps with ErrorBoundary, ThemeProvider, StoreProvider
  └─ AxButtonGroupSync     ← Maps Mendix props → MobX store via useEffect
       └─ ButtonGroup      ← MUI ButtonGroup container (src/main/ButtonGroup.tsx)
            └─ {content}   ← Injected child Mendix button widgets
```

### Layers

| Layer | File | Purpose |
|---|---|---|
| Widget entry | `src/AxButtonGroup.tsx` | Mendix runtime integration, provider setup |
| Sync | `AxButtonGroupSync` (in same file) | Bridges Mendix props to MobX store |
| Store | `src/main/store.ts` | MobX state: variant, color, size, orientation, flags |
| UI | `src/main/ButtonGroup.tsx` | Renders MUI `<ButtonGroup>` wrapping injected content |
| Editor preview | `src/AxButtonGroup.editorPreview.tsx` | Design-time preview in Studio Pro |
| Props definition | `src/AxButtonGroup.xml` | Mendix widget property schema |

### State Management (MobX `ButtonGroupStore`)

| State | Type | Description |
|---|---|---|
| `variant` | `string` | Shared button variant for all children |
| `color` | `string` | Shared MUI color token |
| `size` | `string` | Shared size for all children |
| `orientation` | `'horizontal' \| 'vertical'` | Layout direction |
| `disabled` | `boolean` | Disables all children |
| `fullWidth` | `boolean` | Expands group to full width |

## Mendix Widget Purpose

Use as a container when multiple related actions should appear as a visually unified group. Place `AxButton` widgets inside the `content` slot. Styling properties set on `AxButtonGroup` override individual child button styles.
