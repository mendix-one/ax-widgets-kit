# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mendix pluggable widgets monorepo (`ax-widgets-kit`) containing 21 custom widgets, a shared library, a web application, and a simulation/demo app.

**Stack:** React 19, TypeScript 6, MobX, Material-UI (MUI) 7, Emotion CSS-in-JS, Vite, Turborepo, pnpm workspaces.

**Requirements:** Node >= 22, pnpm >= 10.33.0

## Commands

### Root (all packages)

```sh
pnpm build          # Build everything via Turbo
pnpm dev            # Dev servers for all packages
pnpm lint           # Lint all packages
pnpm format         # Format all packages
pnpm check-types    # Type-check all packages
```

### Targeting a single package

```sh
pnpm build --filter=@ax/button       # Build one widget
pnpm dev --filter=@ax/web-app        # Dev server for web-app only
pnpm lint --filter=@ax/shared        # Lint shared package only
```

### Per-widget scripts (run from widget directory)

```sh
pnpm dev            # Start web dev server (pluggable-widgets-tools)
pnpm build          # Production build
pnpm lint           # Lint
pnpm lint:fix       # Lint with auto-fix
```

### Web-app / Simulation (Vite-based)

```sh
pnpm app            # Start Vite dev server (in web-app/)
```

### Shared package

```sh
pnpm build          # Compile with tsc (outputs to dist/)
```

## Architecture

### Workspace layout

- **`packages/ax-shared`** (`@ax/shared`) — Shared library exporting components, types, utils, context, theme, eventbus, and platform modules. All widgets depend on this.
- **`widgets/*`** — 21 Mendix pluggable widgets, each built with `@mendix/pluggable-widgets-tools`. Every widget is an independent package (`@ax/<name>`).
- **`web-app/`** (`@ax/web-app`) — Main Vite-based React application with MobX stores, React Router, i18next, and ECharts.
- **`simulation/`** — Vite demo app for testing widgets outside Mendix.

### Widget structure convention

Each widget in `widgets/` follows this layout:

```
ax-<name>/
├── src/
│   ├── Ax<Name>.tsx              # Main widget component
│   ├── Ax<Name>.editorConfig.ts  # Mendix Studio Pro editor config
│   ├── Ax<Name>.editorPreview.tsx # Design-time preview
│   ├── Ax<Name>.xml              # Widget metadata/properties definition
│   ├── main/                     # Runtime implementation
│   ├── preview/                  # Design-time implementation
│   ├── styles/                   # Widget-specific styles
│   └── package.xml               # Mendix package manifest
└── package.json                  # Has widgetName, packagePath, developmentPort
```

The `widgetName` field in each widget's `package.json` is the PascalCase identifier (e.g., `AxButton`). Each widget has a unique `developmentPort` (range 3005-3028).

### State management

The web-app uses a MobX `RootStore` pattern with `StoreProvider` context. Widgets use `mobx-react-lite` for reactive rendering.

### Styling

All UI components use MUI 7 with Emotion. The shared package provides a centralized theme configuration via `@ax/shared/theme`.

### Cross-component communication

`@ax/shared/eventbus` provides a nanobus-based event bus for widget-to-widget communication.

## Code Style

- **Formatter:** Prettier — no semicolons, single quotes, trailing commas, 100 char width, LF line endings
- **Linter:** ESLint 9 flat config with TypeScript type-aware rules, React Hooks/DOM/X, JSX a11y, import-x sorting
- **Indentation:** 2 spaces
