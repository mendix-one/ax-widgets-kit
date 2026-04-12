# AxResetpswForm

Password reset request form widget for Mendix. Renders an email input form that initiates the password reset flow, with a success state and back-to-sign-in navigation.

## Mendix Properties

| Property | Type | Required | Description |
|---|---|---|---|
| `emailAttr` | EditableValue\<string\> | No | Mendix string attribute bound to the email input |
| `onSubmit` | action | No | Nanoflow/microflow triggered on form submission |
| `onNavigateSignIn` | action | No | Nanoflow/microflow to navigate back to sign-in page |

## Architecture

```
AxResetpswForm.tsx          ← Mendix entry: wraps with ErrorBoundary, ThemeProvider, StoreProvider
  └─ AxResetpswFormSync     ← Maps Mendix props → MobX store via useEffect
       └─ ResetpswForm      ← Form UI (src/main/ResetpswForm.tsx)
            ├─ EmailField         ← Controlled email input
            ├─ SubmitButton       ← Reset password button
            ├─ BackToSignIn       ← Navigation link
            └─ SuccessState       ← Rendered after successful submission
```

### Layers

| Layer | File | Purpose |
|---|---|---|
| Widget entry | `src/AxResetpswForm.tsx` | Mendix runtime integration, provider setup |
| Sync | `AxResetpswFormSync` (in same file) | Bridges `EditableValue<string>` and actions to store |
| Store | `src/main/store.ts` | MobX state: email value, readOnly flag, callbacks |
| UI | `src/main/ResetpswForm.tsx` | Renders the two-state form (input / success) |
| Editor preview | `src/AxResetpswForm.editorPreview.tsx` | Design-time preview in Studio Pro |
| Props definition | `src/AxResetpswForm.xml` | Mendix widget property schema |

### State Management (MobX `ResetpswFormStore`)

| State | Type | Description |
|---|---|---|
| `email` | `string` | Current email value, synced from Mendix `EditableValue` |
| `readOnly` | `boolean` | Reflects `EditableValue.readOnly` (e.g., during nanoflow execution) |
| `onEmailChange` | `function` | Writes email back to `EditableValue` |
| `onSubmit` | `function \| undefined` | Executes bound Mendix submit action |
| `onNavigateSignIn` | `function \| undefined` | Executes navigation action |

## Mendix Widget Purpose

Place inside `AxAuthLayout` on the Forgot Password page. The Mendix developer binds a transient `email` attribute and a nanoflow that calls the Mendix `SendEmailMessage` activity or a custom REST endpoint to dispatch the reset email. After the nanoflow completes, set the `emailAttr` to `readOnly` to trigger the success state.
