# AxSlider

Numeric range slider widget for Mendix. Renders a Material UI slider with configurable min/max/step range and two-way binding to a Mendix decimal attribute.

## Mendix Properties

| Property | Type | Required | Default | Description |
|---|---|---|---|---|
| `valueAttr` | EditableValue\<Big\> | No | — | Mendix decimal attribute for two-way binding |
| `label` | textTemplate | No | — | Field label |
| `min` | integer | No | `0` | Minimum slider value |
| `max` | integer | No | `100` | Maximum slider value |
| `step` | integer | No | `1` | Step increment |
| `disabled` | boolean | No | `false` | Disable interaction |
| `marks` | boolean | No | `false` | Show tick marks at each step |
| `color` | enum | No | `primary` | `primary` \| `secondary` |
| `size` | enum | No | `medium` | `small` \| `medium` |
| `valueLabelDisplay` | enum | No | `auto` | `auto` \| `on` \| `off` |
| `onChange` | action | No | — | Nanoflow/microflow triggered after value changes |

## Architecture

```
AxSlider.tsx          ← Mendix entry: wraps with ErrorBoundary, ThemeProvider, StoreProvider
  └─ AxSliderSync     ← Maps Mendix props → MobX store via useEffect
       └─ Slider      ← MUI Slider render (src/main/Slider.tsx)
```

### Layers

| Layer | File | Purpose |
|---|---|---|
| Widget entry | `src/AxSlider.tsx` | Mendix runtime integration, provider setup |
| Sync | `AxSliderSync` (in same file) | Converts `Big` decimal from Mendix to `number` for MUI Slider |
| Store | `src/main/store.ts` | MobX state: value, range config, display props, validation |
| UI | `src/main/Slider.tsx` | Renders MUI `<Slider>` with label and optional marks |
| Editor preview | `src/AxSlider.editorPreview.tsx` | Design-time preview in Studio Pro |
| Props definition | `src/AxSlider.xml` | Mendix widget property schema |

### State Management (MobX `SliderStore`)

| State | Type | Description |
|---|---|---|
| `value` | `number` | Current slider value, converted from Mendix `Big` |
| `label` | `string` | Field label |
| `min` | `number` | Minimum range value |
| `max` | `number` | Maximum range value |
| `step` | `number` | Step increment |
| `disabled` | `boolean` | Disabled state |
| `marks` | `boolean` | Show tick marks |
| `color` | `string` | MUI color token |
| `size` | `string` | Slider size |
| `valueLabelDisplay` | `string` | Label display mode |
| `validation` | `string \| undefined` | Validation message from Mendix attribute |
| `loading` | `boolean` | `true` while attribute value is loading |
| `onValueChange` | `function` | Converts number back to `Big` and writes to `EditableValue` |
| `onChangeAction` | `function` | Executes bound Mendix action |

## Mendix Widget Purpose

Use on Mendix pages for numeric range input (e.g., percentage thresholds, priority levels, quantity selectors). The widget handles `Big` decimal conversion transparently and writes back to the bound attribute on every change.
