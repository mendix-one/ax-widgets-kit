# AxWebApp

Main application layout widget for Mendix. Orchestrates the full application shell: header bar, sidebar navigation, main content area, and optional right-panel AI agent chat drawer. All other ax-widgets-kit layout widgets plug into this container.

## Mendix Properties

| Property | Type | Required | Description |
|---|---|---|---|
| `logo` | widgets | No | `AxLogo` widget slot rendered in the header left |
| `tasksMenu` | widgets | No | `AxTasksMenu` widget slot rendered in the header |
| `notifyMenu` | widgets | No | `AxNotifyMenu` widget slot rendered in the header |
| `userMenu` | widgets | No | `AxUserMenu` widget slot rendered in the header right |
| `sidebar` | widgets | No | `AxSidebar` widget slot rendered on the left |
| `content` | widgets | No | Main page content slot |
| `agentChat` | widgets | No | `AxAgentChat` widget slot rendered in the right drawer |
| `themeTokens` | string (JSON) | No | JSON object for runtime MUI theme token overrides |

## Architecture

```
AxWebApp.tsx          ← Mendix entry: wraps with ErrorBoundary, ThemeProvider, StoreProvider
  └─ AxWebAppSync     ← Maps Mendix props → MobX store via useEffect; wires event bus
       └─ WebAppLayout     ← Full shell layout (src/main/WebAppLayout.tsx)
            ├─ AppBar              ← Top header: logo, actions, user menu
            │    ├─ {logo}
            │    ├─ HamburgerButton
            │    ├─ {tasksMenu}
            │    ├─ {notifyMenu}
            │    └─ {userMenu}
            ├─ {sidebar}           ← Left navigation drawer
            ├─ MainContent         ← Scrollable content area
            │    └─ {content}
            └─ AgentDrawer         ← Right panel (collapsible)
                 └─ {agentChat}
```

### Layers

| Layer | File | Purpose |
|---|---|---|
| Widget entry | `src/AxWebApp.tsx` | Mendix runtime integration, provider setup, theme parsing |
| Sync | `AxWebAppSync` (in same file) | Bridges `themeTokens` string to MUI theme; publishes/listens to event bus |
| Store | `src/main/store.ts` | MobX state: sidebar open/closed, agent panel open/closed |
| UI | `src/main/WebAppLayout.tsx` | Full layout with AppBar, Drawer, main area and agent panel |
| Editor preview | `src/AxWebApp.editorPreview.tsx` | Design-time preview in Studio Pro |
| Props definition | `src/AxWebApp.xml` | Mendix widget property schema |

### State Management (MobX `WebAppStore`)

| State | Type | Description |
|---|---|---|
| `sidebarOpen` | `boolean` | Sidebar expanded or collapsed state |
| `agentOpen` | `boolean` | Agent chat drawer visible state |
| `toggleSidebar()` | method | Flips `sidebarOpen` and publishes `toggleSidebar` event on event bus |
| `toggleAgent()` | method | Flips `agentOpen` and publishes `toggleAgent` event on event bus |

### Theme Tokens

The `themeTokens` property accepts a JSON string that is parsed and merged into the MUI theme at runtime. Example:

```json
{
  "palette": {
    "primary": { "main": "#1976d2" }
  }
}
```

## Cross-widget Communication

`AxWebApp` publishes `toggleSidebar` and `toggleAgent` events on `@ax/shared/eventbus`. `AxSidebar` and `AxAgentChat` subscribe to these events, keeping layout state decoupled across independently mounted widgets.

## Mendix Widget Purpose

The single root layout widget for application pages. The Mendix developer places `AxWebApp` on the main layout page and fills each slot with the corresponding ax-widget. The `content` slot holds all page-specific widgets. `themeTokens` can be driven from a Mendix app configuration entity to support per-tenant theming at runtime.
