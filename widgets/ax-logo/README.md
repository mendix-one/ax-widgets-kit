# AxLogo

Logo display widget for Mendix. Renders a logo image sourced from a Mendix image file, with configurable height, alt text, and click action.

## Mendix Properties

| Property | Type | Required | Default | Description |
|---|---|---|---|---|
| `logoUrl` | image | No | — | Mendix image file or image attribute for the logo |
| `altText` | textTemplate | No | — | Alternative text for accessibility |
| `height` | integer | No | `24` | Logo height in pixels |
| `onClick` | action | No | — | Nanoflow/microflow triggered on logo click |

## Architecture

```
AxLogo.tsx          ← Mendix entry: wraps with ErrorBoundary, ThemeProvider, StoreProvider
  └─ AxLogoSync     ← Maps Mendix props → MobX store via useEffect
       └─ Logo      ← Image or text fallback render (src/main/Logo.tsx)
```

### Layers

| Layer | File | Purpose |
|---|---|---|
| Widget entry | `src/AxLogo.tsx` | Mendix runtime integration, provider setup |
| Sync | `AxLogoSync` (in same file) | Resolves `DynamicValue<WebImage>` to a URL string for the store |
| Store | `src/main/store.ts` | MobX state: `src`, `alt`, `height`, `onClick` |
| UI | `src/main/Logo.tsx` | Renders `<img>` with resolved URL, or text fallback if no image |
| Preview | `src/preview/LogoPreview.tsx` | Renders actual `<img>` in Studio Pro design view |
| Editor preview | `src/AxLogo.editorPreview.tsx` | Entry for Studio Pro preview, resolves static image URL |
| Props definition | `src/AxLogo.xml` | Mendix widget property schema |

### State Management (MobX `LogoStore`)

| State | Type | Description |
|---|---|---|
| `src` | `string \| undefined` | Resolved image URL extracted from the Mendix `WebImage` value |
| `alt` | `string \| undefined` | Alternative text |
| `height` | `number` | Image height in pixels (default `24`) |
| `onClick` | `(() => void) \| undefined` | Bound Mendix action callback |

### Image Resolution (`getLogoSrc`)

The `getLogoSrc` helper in `AxLogo.tsx` handles the Mendix `WebImage` runtime value, which may carry the URL in different properties depending on whether it is a static or dynamic image:

```
string        → used directly
object.src
object.imageUrl
object.url
object.downloadUrl
```

### Preview Rendering

In Studio Pro design view, `AxLogo.editorPreview.tsx` extracts `imageUrl` from the static image object (`{ type: 'static', imageUrl }`) and passes it to `LogoPreview`, which renders an actual `<img>` tag so designers can see the logo at design time.

## Mendix Widget Purpose

Place in the `logo` slot of `AxWebApp` or `AxAuthLayout`. The Mendix developer binds a System.Image or custom image entity attribute to `logoUrl`. The widget resolves the image at runtime and optionally navigates to a home page when clicked via `onClick`.
