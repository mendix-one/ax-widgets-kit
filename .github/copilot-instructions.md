# ax-widgets-kit — Copilot Instructions

Mendix pluggable widgets monorepo. 21 custom widgets, a shared library (`@ax/shared`), a React app (`react-app/`), and a simulation/demo app (`simulation/`).

**Stack:** React 19, TypeScript 6, MobX, MUI 7, Emotion, Vite, Turborepo, pnpm workspaces.
**Requirements:** Node ≥ 22, pnpm ≥ 10.33.0

See [CLAUDE.md](../CLAUDE.md) for a high-level overview.

> **When working on a specific widget**, always read `widgets/ax-<name>/README.md` first. Each README documents the widget's Mendix properties, architecture layers, MobX store shape, and intended Mendix usage — this is the authoritative source for that widget's requirements.

---

## Build & Dev Commands

```sh
# Root — all packages via Turbo
pnpm build          # Build everything
pnpm lint           # Lint all
pnpm format         # Format all
pnpm check-types    # Type-check all

# Single widget shortcuts (from root)
pnpm build:logo     # pnpm --filter @ax/logo run build
pnpm build:button   # pnpm --filter @ax/button run build
# (pattern: pnpm build:<widget-name>)

# Apps
pnpm app            # Vite dev server for react-app/
pnpm vite           # Vite dev server for simulation/
```

> ⚠️ Widget builds regenerate `typings/Ax<Name>Props.d.ts` from `Ax<Name>.xml`. **Never edit typings files manually.**

---

## Widget Architecture

Every widget in `widgets/ax-<name>/` follows the same four-layer pattern:

```
Ax<Name>.tsx              ← Entry: ErrorBoundary → AxThemeProvider → StoreProvider → SyncComponent
  └─ Ax<Name>Sync         ← Maps Mendix props → store via useEffect; wires action callbacks
       └─ main/<UI>.tsx   ← observer() component; reads only from store
            main/store.ts ← MobX makeAutoObservable; pure JS state, no Mendix types
            main/context.ts ← createWidgetContext<Store>() from @ax/shared
```

**Key rules:**
- Sync component is the **only** place that touches Mendix `DynamicValue`, `EditableValue`, `ActionValue`.
- UI components read exclusively from the MobX store — they have no knowledge of Mendix.
- Use `observer(function Name() { ... })` (named function, not arrow) for MobX UI components.
- `configure({ isolateGlobalState: true })` at the top of every widget entry file.

### MobX Store Pattern

```ts
// main/store.ts
export class WidgetStore {
  label = ''
  disabled = false
  onClick: (() => void) | undefined = undefined

  constructor() { makeAutoObservable(this) }

  setLabel(v: string) { this.label = v }
  setOnClick(fn: (() => void) | undefined) { this.onClick = fn }
}
```

```ts
// main/context.ts
const { Provider, useStore } = createWidgetContext<WidgetStore>('WidgetName')
export { Provider as WidgetProvider, useStore as useWidgetStore }
```

### Sync Pattern

```tsx
useEffect(() => { store.setLabel(props.label?.value ?? '') }, [store, props.label?.value])
useEffect(() => {
  store.setOnClick(props.onClick?.canExecute ? () => props.onClick?.execute() : undefined)
}, [store, props.onClick?.canExecute])
```

---

## Shared Library (`@ax/shared`)

| Export | Purpose |
|---|---|
| `ErrorBoundary` | Catches render errors; wrap every widget entry |
| `AxThemeProvider` | MUI ThemeProvider + CssBaseline; `isLayout` flag for layout widgets |
| `createAxTheme(...overrides)` | Deep-merges into the default Ax MUI theme |
| `createWidgetContext<T>()` | Returns typed `{Provider, useStore}` pair |
| `useWidgetEvents({ widgetName, onEvent, isLayout? })` | Event bus subscription hook |
| `emitEvent(topic, event)` | Emit an event on the bus |
| `executeAction(action?)` | Safely run Mendix `ActionValue` (checks canExecute + !isExecuting) |
| `isAvailable(obj)` / `isLoading(obj)` | DynamicValue/EditableValue status helpers |

---

## Cross-widget Communication (Event Bus)

```ts
// Layout widget initializes the bus
useWidgetEvents({ widgetName: props.name, onEvent: handleEvent, isLayout: true })

// Child widget subscribes
useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

// Emitting from any widget
const bus = getEventBus()
bus.emit('ax:broadcast', { action: 'theme-changed', payload: { mode: 'dark' } })
bus.emit('ax:AxSigninForm1', { action: 'reset' })  // private, by widget name
```

Topics: `ax:broadcast` (all) and `ax:{widgetName}` (targeted).

---

## Widget XML Properties

```xml
type="textTemplate"   → DynamicValue<string>         (read-only dynamic text)
type="attribute"      → EditableValue<string|boolean> (two-way form binding)
type="image"          → DynamicValue<WebImage>        (Mendix image file/attribute)
type="action"         → ActionValue                   (nanoflow/microflow)
type="boolean"        → boolean                       (Studio Pro checkbox)
type="integer"        → number                        (Studio Pro number input)
type="enumeration"    → string union                  (Studio Pro dropdown)
type="widgets"        → ReactNode                     (child widget slot)
```

When adding a new `image` property, resolve the URL in the sync component:

```ts
function getImageSrc(v: unknown): string | undefined {
  if (typeof v === 'string') return v
  if (v && typeof v === 'object') {
    const o = v as Record<string, unknown>
    return (typeof o.src === 'string' && o.src)
      || (typeof o.imageUrl === 'string' && o.imageUrl)
      || (typeof o.url === 'string' && o.url)
      || undefined
  }
  return undefined
}
```

---

## Simulation App (Testing Outside Mendix)

`simulation/` contains a Vite React app with mock helpers. Use these when adding widgets to simulation pages:

```ts
// DynamicValue<string>  (read-only text, images)
mockDynamic('Hello')

// ActionValue (button click, submit)
const mockAction = { canExecute: true, isExecuting: false, execute: () => {} }

// EditableValue<string> (form binding) — use the useMockAttr() hook in each simulation page
```

Simulation pages live in `simulation/src/pages/<page-name>/`.

---

## Code Style

Formatting and linting are fully automated — always run `pnpm format` and `pnpm lint` before finishing.

- **Prettier config:** `widgets/ax-<name>/prettier.config.js` (each widget) — extends `@mendix/pluggable-widgets-tools/configs/prettier.base.json`. Key settings: no semicolons, single quotes, 120-char print width, 2-space indent, trailing commas everywhere, LF line endings, JSX double quotes.
- **ESLint config:** `eslint.config.js` (root) — ESLint 9 flat config with TypeScript type-aware rules, React Hooks, React X, React DOM, JSX a11y, and import-x sorting.

Non-obvious rules not caught automatically:
- **`import type`** for type-only imports (`@typescript-eslint/consistent-type-imports`)
- **Unused params/vars:** prefix with `_` (`_unused`) to suppress the lint error
- **Import order** (eslint-plugin-import-x): `builtin → external → internal → parent → sibling → index → type`

---

## Adding a New Widget

1. Copy an existing widget folder (`ax-button` is the simplest reference).
2. Define properties in `Ax<Name>.xml` — typings are auto-generated on build.
3. Implement the four layers: entry, store, context, UI component.
4. Add a `build:<name>` shortcut to the root `package.json`.
5. Add a page in `simulation/src/pages/` for local testing.
6. Update `pnpm-workspace.yaml` if the folder name doesn't match the glob.
7. Each widget needs a unique `developmentPort` (3005–3028 range; check existing widgets).
8. Write a `README.md` following the pattern in existing widgets (see `widgets/ax-button/README.md`).

---

## Common Pitfalls

| Pitfall | Rule |
|---|---|
| Editing `typings/*.d.ts` | Auto-generated from XML — changes are overwritten on next build |
| `mobx` global state collisions | Always add `configure({ isolateGlobalState: true })` in every widget entry |
| Using `executeAction` vs calling `.execute()` directly | Always use `executeAction(action)` from `@ax/shared/platform` — it guards canExecute + isExecuting |
| Layout widget vs regular widget | Layout widgets pass `isLayout: true` to `AxThemeProvider` and `useWidgetEvents` |
| React 19 `ref` | Use `ref` as a prop directly (no `forwardRef` needed in React 19) |
| `EditableValue` write-back | Always check `.readOnly` before calling `.setValue()` |
