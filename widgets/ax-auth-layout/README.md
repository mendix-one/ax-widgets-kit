# AxAuthLayout

Authentication layout widget for Mendix. Provides a branded full-screen container for sign-in, sign-up, and password flow pages with an animated background panel and a content slot for forms.

## Mendix Properties

| Property | Type | Required | Description |
|---|---|---|---|
| `content` | widgets | No | Form widget(s) to render in the right panel |
| `tagline` | textTemplate | No | Brand tagline text displayed in the left panel |
| `brandDescription` | textTemplate | No | Descriptive text below tagline |
| `themeTokens` | string (JSON) | No | JSON object for runtime MUI theme overrides |
| `showBackground` | boolean | No | Toggle animated SVG gradient background effect |

## Architecture

```
AxAuthLayout.tsx         ← Mendix entry: wraps with ErrorBoundary, ThemeProvider, StoreProvider
  └─ AxAuthLayoutSync    ← Maps Mendix props → MobX store via useEffect
       └─ AuthLayout     ← Renders two-panel layout (src/main/AuthLayout.tsx)
            ├─ BrandPanel     ← Left panel: animated background + tagline
            └─ {content}      ← Right panel: injected Mendix form widgets
```

### Layers

| Layer | File | Purpose |
|---|---|---|
| Widget entry | `src/AxAuthLayout.tsx` | Mendix runtime integration, provider setup |
| Sync | `AxAuthLayoutSync` (in same file) | Bridges Mendix props to MobX store |
| Store | `src/main/store.ts` | MobX state: branding text, background toggle |
| UI | `src/main/AuthLayout.tsx` | Two-panel layout rendering |
| Editor preview | `src/AxAuthLayout.editorPreview.tsx` | Design-time preview in Studio Pro |
| Props definition | `src/AxAuthLayout.xml` | Mendix widget property schema |

### State Management (MobX `AuthLayoutStore`)

| State | Type | Description |
|---|---|---|
| `tagline` | `string` | Brand tagline from Mendix text template |
| `description` | `string` | Brand description from Mendix text template |
| `showBackground` | `boolean` | Controls animated SVG gradient background |

## Mendix Widget Purpose

Used as the outer page wrapper for all authentication pages. The Mendix developer places `AxSigninForm`, `AxSignupForm`, `AxResetpswForm`, or `AxSetpswForm` into the `content` slot. Branding text and the theme are configured once on the layout widget to provide consistent appearance across all auth pages.
