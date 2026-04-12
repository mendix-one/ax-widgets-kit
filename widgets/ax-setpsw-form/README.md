# AxSetpswForm

Password setup/creation form widget for Mendix. Renders a password entry form with confirmation field and visibility toggles, used after a reset link is followed or during initial account setup.

## Mendix Properties

| Property | Type | Required | Description |
|---|---|---|---|
| `passwordAttr` | EditableValue\<string\> | No | Mendix string attribute bound to the password input |
| `onSubmit` | action | No | Nanoflow/microflow triggered on form submission |
| `onNavigateSignIn` | action | No | Nanoflow/microflow to navigate back to sign-in |

## Architecture

```
AxSetpswForm.tsx          ← Mendix entry: wraps with ErrorBoundary, ThemeProvider, StoreProvider
  └─ AxSetpswFormSync     ← Maps Mendix props → MobX store via useEffect
       └─ SetpswForm      ← Form UI (src/main/SetpswForm.tsx)
            ├─ PasswordField      ← Password input with visibility toggle
            ├─ ConfirmField       ← Confirm password field
            ├─ SubmitButton       ← Set password button
            └─ BackToSignIn       ← Navigation link
```

### Layers

| Layer | File | Purpose |
|---|---|---|
| Widget entry | `src/AxSetpswForm.tsx` | Mendix runtime integration, provider setup |
| Sync | `AxSetpswFormSync` (in same file) | Bridges `EditableValue<string>` and actions to store |
| Store | `src/main/store.ts` | MobX state: password value, visibility flags, readOnly, callbacks |
| UI | `src/main/SetpswForm.tsx` | Renders password and confirm input fields |
| Editor preview | `src/AxSetpswForm.editorPreview.tsx` | Design-time preview in Studio Pro |
| Props definition | `src/AxSetpswForm.xml` | Mendix widget property schema |

### State Management (MobX `SetpswFormStore`)

| State | Type | Description |
|---|---|---|
| `password` | `string` | Current password value, synced from Mendix `EditableValue` |
| `readOnly` | `boolean` | Reflects `EditableValue.readOnly` |
| `onPasswordChange` | `function` | Writes password back to `EditableValue` |
| `onSubmit` | `function \| undefined` | Executes bound Mendix submit action |
| `onNavigateSignIn` | `function \| undefined` | Executes navigation action |

## Mendix Widget Purpose

Place inside `AxAuthLayout` on the Set Password page. The Mendix developer uses a deep link or token-based page to reach this widget, binds a transient `password` attribute, and connects a nanoflow that hashes and saves the new password. Typically paired with `AxResetpswForm` as the two-step password reset flow.
