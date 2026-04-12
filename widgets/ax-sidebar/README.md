# AxSidebar

Application sidebar navigation widget for Mendix. Renders a collapsible vertical navigation panel with icon and label menu items and a content slot for additional widgets.

## Mendix Properties

| Property | Type | Required | Description |
|---|---|---|---|
| `content` | widgets | No | Additional widgets to render within the sidebar |

## Architecture

```
AxSidebar.tsx          ← Mendix entry: wraps with ErrorBoundary, ThemeProvider, StoreProvider
  └─ AxSidebarSync     ← Maps Mendix props → MobX store via useEffect; listens to event bus for toggle
       └─ Sidebar      ← Navigation panel UI (src/main/Sidebar.tsx)
            ├─ NavItem[]      ← Icon + label menu items
            └─ {content}      ← Injected Mendix widgets
```

### Layers

| Layer | File | Purpose |
|---|---|---|
| Widget entry | `src/AxSidebar.tsx` | Mendix runtime integration, provider setup |
| Sync | `AxSidebarSync` (in same file) | Subscribes to `toggleSidebar` event bus event |
| Store | `src/main/store.ts` | MobX state: nav items, activeId, open/closed state |
| UI | `src/main/Sidebar.tsx` | Renders the collapsible drawer with navigation items |
| Editor preview | `src/AxSidebar.editorPreview.tsx` | Design-time preview in Studio Pro |
| Props definition | `src/AxSidebar.xml` | Mendix widget property schema |

### State Management (MobX `SidebarStore`)

| State | Type | Description |
|---|---|---|
| `items` | `NavItem[]` | Navigation items: `{ id, label, icon }` |
| `activeId` | `string` | Currently selected navigation item id |
| `open` | `boolean` | Sidebar expanded/collapsed state |
| `onItemClick` | `function` | Handles selection and sets `activeId` |

Navigation items are predefined in the store (Dashboard, Yield Analysis, Defect Analysis, Lot Tracking, Technology Roadmap) with MUI icons.

## Cross-widget Communication

Listens for a `toggleSidebar` event on `@ax/shared/eventbus`. `AxWebApp` publishes this event from its hamburger menu button. This keeps sidebar state decoupled from the layout widget.

## Mendix Widget Purpose

Place in the `sidebar` slot of `AxWebApp`. The sidebar provides primary page navigation for the application. Navigation items and their active state are self-managed; clicking an item should be connected to Mendix page navigation via the event bus or by extending the store with an `onClick` action property.
