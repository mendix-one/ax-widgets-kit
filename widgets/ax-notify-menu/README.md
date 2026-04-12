# AxNotifyMenu

Notifications dropdown widget for Mendix. Renders a badge icon in the application header that opens a panel listing recent notifications with type, description, timestamp, and read status.

## Mendix Properties

| Property | Type | Required | Description |
|---|---|---|---|
| `title` | textTemplate | No | Panel header title |
| `onNotifyClick` | action | No | Nanoflow/microflow triggered when a notification item is clicked |

## Architecture

```
AxNotifyMenu.tsx          ← Mendix entry: wraps with ErrorBoundary, ThemeProvider, StoreProvider
  └─ AxNotifyMenuSync     ← Maps Mendix props → MobX store via useEffect
       └─ NotifyMenu      ← Badge icon + popover list (src/main/NotifyMenu.tsx)
            ├─ NotifyIcon       ← Bell icon with unread badge count
            └─ NotifyList       ← List of NotifyItem rows
```

### Layers

| Layer | File | Purpose |
|---|---|---|
| Widget entry | `src/AxNotifyMenu.tsx` | Mendix runtime integration, provider setup |
| Sync | `AxNotifyMenuSync` (in same file) | Bridges Mendix props to MobX store |
| Store | `src/main/store.ts` | MobX state: title, notifications list, callback |
| UI | `src/main/NotifyMenu.tsx` | Popover trigger and notification item rendering |
| Editor preview | `src/AxNotifyMenu.editorPreview.tsx` | Design-time preview in Studio Pro |
| Props definition | `src/AxNotifyMenu.xml` | Mendix widget property schema |

### State Management (MobX `NotifyMenuStore`)

| State | Type | Description |
|---|---|---|
| `title` | `string` | Dropdown panel title |
| `items` | `NotifyItem[]` | Notification list: `{ id, type, title, description, timestamp, read }` |
| `onNotifyClick` | `(() => void) \| undefined` | Bound Mendix action callback |

**Notification types:** `danger` \| `warning` \| `info` — each maps to a distinct MUI color and icon.

## Mendix Widget Purpose

Place in the `notifyMenu` slot of `AxWebApp`. The Mendix developer binds `onNotifyClick` to a nanoflow that reads new notifications from the database and pushes them to the store via the event bus, or uses a committed object list to update the widget state. Unread count is shown as a badge on the bell icon.
