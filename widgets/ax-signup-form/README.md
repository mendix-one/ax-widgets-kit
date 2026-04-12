# AxSignupForm

User registration form widget for Mendix. Renders a sign-up form with full name, email, and password fields, optional SSO buttons, and navigation to the sign-in page.

## Mendix Properties

| Property | Type | Required | Default | Description |
|---|---|---|---|---|
| `fullNameAttr` | EditableValue\<string\> | No | — | Mendix string attribute for full name input |
| `emailAttr` | EditableValue\<string\> | No | — | Mendix string attribute for email input |
| `passwordAttr` | EditableValue\<string\> | No | — | Mendix string attribute for password input |
| `showSSO` | boolean | No | `true` | Show/hide SSO provider buttons |
| `onSubmit` | action | No | — | Nanoflow/microflow called on form submit |
| `onNavigateSignIn` | action | No | — | Navigate back to sign-in page |
| `onGoogleSSO` | action | No | — | Trigger Google SSO registration flow |
| `onMicrosoftSSO` | action | No | — | Trigger Microsoft SSO registration flow |

## Architecture

```
AxSignupForm.tsx          ← Mendix entry: wraps with ErrorBoundary, ThemeProvider, StoreProvider
  └─ AxSignupFormSync     ← Maps Mendix props → MobX store via useEffect
       └─ SignupForm      ← Form UI (src/main/SignupForm.tsx)
            ├─ FullNameField      ← Controlled text input
            ├─ EmailField         ← Controlled email input
            ├─ PasswordField      ← Password input with visibility toggle
            ├─ SSOButtons         ← Google / Microsoft buttons (conditional)
            ├─ SubmitButton       ← Create Account button
            └─ SignInLink         ← Navigation link
```

### Layers

| Layer | File | Purpose |
|---|---|---|
| Widget entry | `src/AxSignupForm.tsx` | Mendix runtime integration, provider setup |
| Sync | `AxSignupFormSync` (in same file) | Bridges three `EditableValue<string>` and multiple `ActionValue`s to store |
| Store | `src/main/store.ts` | MobX state: field values, UI flags, all action callbacks |
| UI | `src/main/SignupForm.tsx` | Full registration form layout |
| Editor preview | `src/AxSignupForm.editorPreview.tsx` | Design-time preview in Studio Pro |
| Props definition | `src/AxSignupForm.xml` | Mendix widget property schema |

### State Management (MobX `SignupFormStore`)

| State | Type | Description |
|---|---|---|
| `fullName` | `string` | Full name value, synced from `EditableValue` |
| `email` | `string` | Email value, synced from `EditableValue` |
| `password` | `string` | Password value, synced from `EditableValue` |
| `showPassword` | `boolean` | Controls password field visibility |
| `showSSO` | `boolean` | Shows/hides SSO provider section |
| `readOnly` | `boolean` | Reflects attribute `readOnly` during nanoflow execution |
| `error` | `string \| undefined` | Error message to display |
| `loading` | `boolean` | Loading state during submit |
| `onFullNameChange` | `function` | Writes full name back to `EditableValue` |
| `onEmailChange` | `function` | Writes email back to `EditableValue` |
| `onPasswordChange` | `function` | Writes password back to `EditableValue` |
| `onSubmit` | `function` | Executes submit action |
| `onNavigateSignIn` | `function` | Executes sign-in navigation action |
| `onGoogleSSO` | `function` | Executes Google SSO action |
| `onMicrosoftSSO` | `function` | Executes Microsoft SSO action |

## Mendix Widget Purpose

Place inside `AxAuthLayout` on the Sign Up page. The `onSubmit` nanoflow should create a new Mendix `Account` or custom user entity, hash the password, and commit the object. SSO flows delegate authentication to the identity provider and create/update the user account via callback nanoflows.
