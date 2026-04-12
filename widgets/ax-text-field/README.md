# AxTextField

Text input widget for Mendix. Renders a Material UI text field with support for single-line, multiline (textarea), and password modes, with full two-way attribute binding and validation display.

## Mendix Properties

| Property | Type | Required | Default | Description |
|---|---|---|---|---|
| `valueAttr` | EditableValue\<string\> | No | — | Mendix string attribute for two-way binding |
| `label` | textTemplate | No | — | Field label |
| `placeholder` | textTemplate | No | — | Placeholder text when empty |
| `helperText` | textTemplate | No | — | Helper/hint text below the field |
| `variant` | enum | No | `outlined` | `outlined` \| `filled` \| `standard` |
| `size` | enum | No | `small` | `small` \| `medium` |
| `fullWidth` | boolean | No | `true` | Stretch to container width |
| `inputType` | enum | No | `text` | `text` \| `email` \| `password` \| `number` \| `tel` \| `url` |
| `multiline` | boolean | No | `false` | Enable textarea mode |
| `rows` | integer | No | `1` | Initial visible rows (multiline only) |
| `maxRows` | integer | No | `4` | Maximum rows before scroll (multiline only) |
| `required` | boolean | No | `false` | Mark field as required |
| `onChange` | action | No | — | Nanoflow/microflow triggered after value changes |

## Architecture

```
AxTextField.tsx          ← Mendix entry: wraps with ErrorBoundary, ThemeProvider, StoreProvider
  └─ AxTextFieldSync     ← Maps Mendix props → MobX store via useEffect
       └─ TextField      ← MUI TextField render (src/main/TextField.tsx)
```

### Layers

| Layer | File | Purpose |
|---|---|---|
| Widget entry | `src/AxTextField.tsx` | Mendix runtime integration, provider setup |
| Sync | `AxTextFieldSync` (in same file) | Bridges `EditableValue<string>`, display props, and `ActionValue` to store |
| Store | `src/main/store.ts` | MobX state: value, all display flags, password visibility, validation |
| UI | `src/main/TextField.tsx` | Renders MUI `<TextField>` with password toggle endAdornment |
| Editor preview | `src/AxTextField.editorPreview.tsx` | Design-time preview in Studio Pro |
| Props definition | `src/AxTextField.xml` | Mendix widget property schema |

### State Management (MobX `TextFieldStore`)

| State | Type | Description |
|---|---|---|
| `value` | `string` | Current field value, synced from Mendix `EditableValue` |
| `label` | `string` | Field label |
| `placeholder` | `string` | Placeholder text |
| `helperText` | `string` | Helper/hint text |
| `variant` | `string` | MUI field variant |
| `size` | `string` | Field size |
| `fullWidth` | `boolean` | Full-width expansion |
| `inputType` | `string` | HTML input type |
| `multiline` | `boolean` | Textarea mode toggle |
| `rows` | `number` | Visible row count |
| `maxRows` | `number` | Maximum rows |
| `required` | `boolean` | Required field marker |
| `showPassword` | `boolean` | Toggles password visibility (when `inputType='password'`) |
| `readOnly` | `boolean` | Reflects `EditableValue.readOnly` |
| `error` | `boolean` | `true` when validation message is present |
| `validation` | `string \| undefined` | Validation message from Mendix attribute |
| `loading` | `boolean` | `true` while attribute value is loading |
| `onValueChange` | `function` | Writes value back to `EditableValue` |
| `onChangeAction` | `function` | Executes bound Mendix action |

## Mendix Widget Purpose

Primary text input widget for Mendix data entry forms. Supports all common input scenarios: plain text, email, phone, URL, multiline notes/comments, and secure password fields. Mendix attribute validation messages are surfaced automatically as MUI error helper text.
