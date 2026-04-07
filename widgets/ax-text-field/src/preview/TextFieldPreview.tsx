import { ReactElement } from 'react'

export interface TextFieldPreviewProps {
  label: string
  placeholder: string
  variant: 'outlined' | 'filled' | 'standard'
  size: 'small' | 'medium'
  inputType: string
  multiline: boolean
  rows: number | null
  required: boolean
  fullWidth: boolean
  helperText: string
  disabled: boolean
}

export function TextFieldPreview({
  label,
  placeholder,
  variant,
  size,
  multiline,
  rows,
  required,
  fullWidth,
  helperText,
  disabled,
}: TextFieldPreviewProps): ReactElement {
  const height = size === 'small' ? 32 : 40
  const padding = size === 'small' ? '6px 12px' : '10px 12px'
  const rowCount = multiline ? Math.max(rows ?? 3, 2) : 1
  const inputHeight = multiline ? rowCount * 20 + (size === 'small' ? 12 : 20) : height
  const displayLabel = label || 'Label'
  const labelText = required ? `${displayLabel} *` : displayLabel

  const rootClass = [
    'ax-preview-textfield',
    `ax-preview-textfield--${variant}`,
    fullWidth ? 'ax-preview-textfield--full-width' : '',
    disabled ? 'ax-preview-textfield--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClass}>
      {variant === 'outlined' && (
        <div className="ax-preview-textfield__wrapper ax-preview-textfield-outlined" style={{ minHeight: inputHeight }}>
          <span className="ax-preview-textfield-label">{labelText}</span>
          <span className="ax-preview-textfield__placeholder" style={{ padding }}>
            {placeholder || ''}
          </span>
        </div>
      )}
      {variant === 'filled' && (
        <div className="ax-preview-textfield__wrapper ax-preview-textfield-filled" style={{ minHeight: inputHeight }}>
          <span className="ax-preview-textfield-filled__label">{labelText}</span>
          <span className="ax-preview-textfield__placeholder" style={{ padding, paddingTop: size === 'small' ? 18 : 22 }}>
            {placeholder || ''}
          </span>
        </div>
      )}
      {variant === 'standard' && (
        <div className="ax-preview-textfield__wrapper ax-preview-textfield-standard" style={{ minHeight: inputHeight }}>
          <span className="ax-preview-textfield-standard__label">{labelText}</span>
          <span className="ax-preview-textfield__placeholder" style={{ padding: `${size === 'small' ? 18 : 22}px 0 4px` }}>
            {placeholder || ''}
          </span>
        </div>
      )}
      {helperText && <div className="ax-preview-textfield__helper">{helperText}</div>}
    </div>
  )
}
