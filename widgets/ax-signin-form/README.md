# AxSigninForm

Sign-in form widget for Mendix. Renders a complete login form with email and password fields, an optional SSO button (single alternative), and navigation links to sign-up and forgot-password pages. Includes a bottom-bar with language selector and light/dark/auto theme toggle — both preferences are persisted to `localStorage`.

## Mendix Properties

| Property | Type | Required | Default | Description |
|---|---|---|---|---|
| `emailAttr` | EditableValue\<string\> | No | — | Mendix string attribute for email input |
| `passwordAttr` | EditableValue\<string\> | No | — | Mendix string attribute for password input |
| `showSSO` | boolean | No | `true` | Show/hide the SSO button |
| `ssoLabel` | textTemplate | No | — | Custom label for the SSO button (falls back to locale default) |
| `onSubmit` | action | No | — | Nanoflow/microflow called on form submit |
| `onNavigateSignUp` | action | No | — | Navigate to sign-up page |
| `onNavigateResetPass` | action | No | — | Navigate to forgot password page |
| `onSSO` | action | No | — | Trigger SSO login flow |

## Architecture

```
AxSigninForm.tsx          ← Mendix entry: ErrorBoundary → StoreProvider → ThemedSigninContent → SyncComponent
  └─ ThemedSigninContent  ← observer(); reads store.resolvedMode, re-provides AxThemeProvider dynamically
       └─ AxSigninFormSync ← Maps Mendix props → MobX store via useEffect
            └─ SigninForm ← Form UI (src/main/SigninForm.tsx)
                 ├─ EmailField         ← Controlled email input
                 ├─ PasswordField      ← Password input with visibility toggle
                 ├─ SubmitButton       ← Sign In button
                 ├─ SSOSection         ← Single SSO button with "or continue with" divider (conditional)
                 ├─ ForgotPassword     ← Navigation link
                 ├─ SignUpLink         ← Navigation link
                 └─ OptionsBar         ← Language selector + Light/Dark/Auto theme toggle
```

### Layers

| Layer | File | Purpose |
|---|---|---|
| Widget entry | `src/AxSigninForm.tsx` | Mendix runtime integration, provider setup |
| Theme wrapper | `ThemedSigninContent` (in same file) | observer() that re-provides theme from store.resolvedMode |
| Sync | `AxSigninFormSync` (in same file) | Bridges two `EditableValue<string>` and multiple `ActionValue`s to store |
| Store | `src/main/store.ts` | MobX state: field values, UI flags, locale, displayMode, all action callbacks |
| UI | `src/main/SigninForm.tsx` | Full form layout with inline translations, SSO button, options bar |
| Editor preview | `src/AxSigninForm.editorPreview.tsx` | Design-time preview in Studio Pro |
| Props definition | `src/AxSigninForm.xml` | Mendix widget property schema |

### State Management (MobX `SigninFormStore`)

| State | Type | Description |
|---|---|---|
| `email` | `string` | Email value, synced from `EditableValue` |
| `password` | `string` | Password value, synced from `EditableValue` |
| `showPassword` | `boolean` | Controls password field visibility |
| `showSSO` | `boolean` | Shows/hides SSO button |
| `ssoLabel` | `string` | Custom SSO button label (empty = locale default) |
| `readOnly` | `boolean` | Reflects attribute `readOnly` during nanoflow execution |
| `error` | `string \| undefined` | Error message to display |
| `loading` | `boolean` | Loading state during submit |
| `locale` | `Locale` | Active UI language: `en \| ko \| ja \| vi` (persisted to localStorage) |
| `displayMode` | `DisplayMode` | Theme preference: `light \| dark \| auto` (persisted to localStorage) |
| `resolvedMode` | `'light' \| 'dark'` | Computed — resolves `auto` via `systemPrefersDark` |
| `onEmailChange` | `function` | Writes email back to `EditableValue` |
| `onPasswordChange` | `function` | Writes password back to `EditableValue` |
| `onSubmit` | `function` | Executes submit action |
| `onNavigateSignUp` | `function` | Executes sign-up navigation action |
| `onNavigateResetPass` | `function` | Executes reset password navigation action |
| `onSSO` | `function` | Executes SSO action |

## Mendix Widget Purpose

Place inside `AxAuthLayout` on the Login page. The `onSubmit` nanoflow should validate credentials and call the Mendix `Login` action or a custom authentication REST call. Set attribute `readOnly` during the nanoflow to show a loading state. If authentication fails, write an error message to a transient attribute and display it via the event bus or store.

The SSO button (`onSSO`) appears below the Sign In button as an alternative path, separated by an "or continue with" divider. Only rendered when `showSSO=true` **and** the `onSSO` action is provided.

The bottom options bar (language + theme) is always visible and allows end-users to personalise their experience. Selections are stored in `localStorage` under keys `ax_signin_locale` and `ax_signin_display_mode`.

## Mendix Properties

| Property | Type | Required | Default | Description |
|---|---|---|---|---|
| `emailAttr` | EditableValue\<string\> | No | — | Mendix string attribute for email input |
| `passwordAttr` | EditableValue\<string\> | No | — | Mendix string attribute for password input |
| `showSSO` | boolean | No | `true` | Show/hide SSO provider buttons |
| `onSubmit` | action | No | — | Nanoflow/microflow called on form submit |
| `onNavigateSignUp` | action | No | — | Navigate to sign-up page |
| `onNavigateResetPass` | action | No | — | Navigate to forgot password page |
| `onGoogleSSO` | action | No | — | Trigger Google SSO login flow |
| `onMicrosoftSSO` | action | No | — | Trigger Microsoft SSO login flow |

## Architecture

```
AxSigninForm.tsx          ← Mendix entry: wraps with ErrorBoundary, ThemeProvider, StoreProvider
  └─ AxSigninFormSync     ← Maps Mendix props → MobX store via useEffect
       └─ SigninForm      ← Form UI (src/main/SigninForm.tsx)
            ├─ EmailField         ← Controlled email input
            ├─ PasswordField      ← Password input with visibility toggle
            ├─ SSOButtons         ← Google / Microsoft buttons (conditional)
            ├─ SubmitButton       ← Sign In button
            ├─ ForgotPassword     ← Navigation link
            └─ SignUpLink         ← Navigation link
```

### Layers

| Layer | File | Purpose |
|---|---|---|
| Widget entry | `src/AxSigninForm.tsx` | Mendix runtime integration, provider setup |
| Sync | `AxSigninFormSync` (in same file) | Bridges two `EditableValue<string>` and multiple `ActionValue`s to store |
| Store | `src/main/store.ts` | MobX state: field values, UI flags, all action callbacks |
| UI | `src/main/SigninForm.tsx` | Full form layout with conditionally rendered SSO section |
| Editor preview | `src/AxSigninForm.editorPreview.tsx` | Design-time preview in Studio Pro |
| Props definition | `src/AxSigninForm.xml` | Mendix widget property schema |

### State Management (MobX `SigninFormStore`)

| State | Type | Description |
|---|---|---|
| `email` | `string` | Email value, synced from `EditableValue` |
| `password` | `string` | Password value, synced from `EditableValue` |
| `showPassword` | `boolean` | Controls password field visibility |
| `showSSO` | `boolean` | Shows/hides SSO provider section |
| `readOnly` | `boolean` | Reflects attribute `readOnly` during nanoflow execution |
| `error` | `string \| undefined` | Error message to display |
| `loading` | `boolean` | Loading state during submit |
| `onEmailChange` | `function` | Writes email back to `EditableValue` |
| `onPasswordChange` | `function` | Writes password back to `EditableValue` |
| `onSubmit` | `function` | Executes submit action |
| `onNavigateSignUp` | `function` | Executes sign-up navigation action |
| `onNavigateResetPass` | `function` | Executes reset password navigation action |
| `onGoogleSSO` | `function` | Executes Google SSO action |
| `onMicrosoftSSO` | `function` | Executes Microsoft SSO action |

## Mendix Widget Purpose

Place inside `AxAuthLayout` on the Login page. The `onSubmit` nanoflow should validate credentials and call the Mendix `Login` action or a custom authentication REST call. Set attribute `readOnly` during the nanoflow to show a loading state. If authentication fails, write an error message to a transient attribute and display it via the event bus or store.
