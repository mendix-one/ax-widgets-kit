# AxUserMenu

User account menu widget for Mendix. Renders a user avatar icon in the application header that opens a dropdown showing the user's name and email with menu actions for Profile, Settings, and Sign Out.

## Mendix Properties

| Property | Type | Required | Description |
|---|---|---|---|
| `userName` | textTemplate | No | Display name shown in the dropdown |
| `userEmail` | textTemplate | No | Email shown below the display name |
| `onSignOut` | action | No | Nanoflow/microflow triggered on Sign Out click |
| `onProfile` | action | No | Nanoflow/microflow triggered on Profile click |
| `onSettings` | action | No | Nanoflow/microflow triggered on Settings click |

## Architecture

```
AxUserMenu.tsx          ← Mendix entry: wraps with ErrorBoundary, ThemeProvider, StoreProvider
  └─ AxUserMenuSync     ← Maps Mendix props → MobX store via useEffect
       └─ UserMenu      ← Avatar button + popover (src/main/UserMenu.tsx)
            ├─ UserAvatar      ← Initials-based MUI Avatar
            └─ MenuItems       ← Profile, Settings, Sign Out items
```

### Layers

| Layer | File | Purpose |
|---|---|---|
| Widget entry | `src/AxUserMenu.tsx` | Mendix runtime integration, provider setup |
| Sync | `AxUserMenuSync` (in same file) | Bridges Mendix text templates and action values to store |
| Store | `src/main/store.ts` | MobX state: user identity strings, action callbacks |
| UI | `src/main/UserMenu.tsx` | Renders avatar button opening dropdown with user info and actions |
| Editor preview | `src/AxUserMenu.editorPreview.tsx` | Design-time preview in Studio Pro |
| Props definition | `src/AxUserMenu.xml` | Mendix widget property schema |

### State Management (MobX `UserMenuStore`)

| State | Type | Description |
|---|---|---|
| `name` | `string` | User display name |
| `email` | `string` | User email address |
| `onSignOut` | `function \| undefined` | Executes Mendix sign-out action |
| `onProfile` | `function \| undefined` | Executes profile navigation action |
| `onSettings` | `function \| undefined` | Executes settings navigation action |

The avatar displays the first letter of the user's name when no profile image is provided.

## Mendix Widget Purpose

Place in the `userMenu` slot of `AxWebApp`. The Mendix developer binds `userName` and `userEmail` to the current user's attributes (e.g., `$currentUser/FullName`) and connects `onSignOut` to the Mendix `Logout` action. `onProfile` and `onSettings` typically navigate to their respective pages.
