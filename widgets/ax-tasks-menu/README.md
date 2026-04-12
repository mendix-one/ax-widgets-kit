# AxTasksMenu

Urgent tasks dropdown widget for Mendix. Renders a badge icon in the application header that opens a panel listing pending tasks with title, description, timestamp, and completion checkbox.

## Mendix Properties

| Property | Type | Required | Description |
|---|---|---|---|
| `title` | textTemplate | No | Panel header title |
| `onTaskClick` | action | No | Nanoflow/microflow triggered when a task item is clicked |

## Architecture

```
AxTasksMenu.tsx          ← Mendix entry: wraps with ErrorBoundary, ThemeProvider, StoreProvider
  └─ AxTasksMenuSync     ← Maps Mendix props → MobX store via useEffect
       └─ TasksMenu      ← Badge icon + popover list (src/main/TasksMenu.tsx)
            ├─ TasksIcon       ← Checklist icon with pending badge count
            └─ TaskList        ← List of TaskItem rows with done toggle
```

### Layers

| Layer | File | Purpose |
|---|---|---|
| Widget entry | `src/AxTasksMenu.tsx` | Mendix runtime integration, provider setup |
| Sync | `AxTasksMenuSync` (in same file) | Bridges Mendix props to MobX store |
| Store | `src/main/store.ts` | MobX state: title, task list, callback |
| UI | `src/main/TasksMenu.tsx` | Popover trigger and task item rendering |
| Editor preview | `src/AxTasksMenu.editorPreview.tsx` | Design-time preview in Studio Pro |
| Props definition | `src/AxTasksMenu.xml` | Mendix widget property schema |

### State Management (MobX `TasksMenuStore`)

| State | Type | Description |
|---|---|---|
| `title` | `string` | Dropdown panel title |
| `items` | `TaskItem[]` | Task list: `{ id, title, description, timestamp, done }` |
| `onTaskClick` | `(() => void) \| undefined` | Bound Mendix action callback |

**Computed:** `pendingCount` — count of items where `done === false`, shown as the badge number.

## Cross-widget Communication

Uses `@ax/shared/eventbus` via `useWidgetEvents`. Tasks can be pushed to the widget from a Mendix nanoflow via event bus messages without a full page refresh.

## Mendix Widget Purpose

Place in the `tasksMenu` slot of `AxWebApp`. The Mendix developer binds `onTaskClick` to a nanoflow that opens the relevant task detail page or marks the task as done. Typically paired with `AxNotifyMenu` in the application header for comprehensive work-item visibility.
