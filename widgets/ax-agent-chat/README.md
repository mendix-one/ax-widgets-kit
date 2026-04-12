# AxAgentChat

AI chat panel widget for Mendix. Displays a conversational interface between the user and an AI agent, with message history, real-time input, and send actions.

## Mendix Properties

| Property | Type | Required | Description |
|---|---|---|---|
| `title` | textTemplate | No | Panel title label |
| `welcomeMessage` | textTemplate | No | Initial message shown before any conversation |
| `onSendMessage` | action | No | Nanoflow/microflow called when user sends a message |

## Architecture

```
AxAgentChat.tsx          ← Mendix entry: wraps with ErrorBoundary, ThemeProvider, StoreProvider
  └─ AxAgentChatSync     ← Maps Mendix props → MobX store via useEffect
       └─ AgentChat      ← Renders chat panel UI (src/main/AgentChat.tsx)
            ├─ MessageList    ← Scrollable history of messages
            └─ ChatInput      ← Text input + send button
```

### Layers

| Layer | File | Purpose |
|---|---|---|
| Widget entry | `src/AxAgentChat.tsx` | Mendix runtime integration, provider setup |
| Sync | `AxAgentChatSync` (in same file) | Bridges Mendix `DynamicValue`/`ActionValue` to store |
| Store | `src/main/store.ts` | MobX state: messages, input, callbacks |
| UI | `src/main/AgentChat.tsx` | Renders conversation list and input form |
| Editor preview | `src/AxAgentChat.editorPreview.tsx` | Design-time preview in Studio Pro |
| Props definition | `src/AxAgentChat.xml` | Mendix widget property schema |

### State Management (MobX `AgentChatStore`)

| State | Type | Description |
|---|---|---|
| `title` | `string` | Panel title |
| `messages` | `Message[]` | Chat history. Each message has `id`, `role` (`user`\|`agent`), `text`, `timestamp` |
| `input` | `string` | Current value of the text input |
| `onSendMessage` | `(() => void) \| undefined` | Callback linked to Mendix action |

**Computed:** `canSend` — `true` when `input` is non-empty and `onSendMessage` is available.

## Cross-widget Communication

Uses `@ax/shared/eventbus` via `useWidgetEvents`. Can receive events from other widgets or Mendix nanoflows.

## Mendix Widget Purpose

Provides an embedded AI assistant chat panel within a Mendix page. The Mendix developer binds `onSendMessage` to a nanoflow that calls the AI backend. The widget manages its own message history locally and the nanoflow can push response messages back via the event bus or attribute updates.
