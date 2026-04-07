import { type ReactElement } from 'react'

interface SelectOption {
  optValue: string
  optLabel: string
}

interface SelectPreviewProps {
  label: string
  options: SelectOption[]
  variant: 'outlined' | 'filled' | 'standard'
  size: 'small' | 'medium'
  disabled?: boolean
  fullWidth?: boolean
  helperText?: string
}

export function SelectPreview({
  label,
  options,
  variant,
  size,
  disabled,
  fullWidth,
  helperText,
}: SelectPreviewProps): ReactElement {
  const selectedLabel = options.length > 0 ? (options[0].optLabel || options[0].optValue) : ''
  const hasValue = selectedLabel.length > 0
  const rootClass = [
    'ax-preview-select',
    `ax-preview-select--${variant}`,
    `ax-preview-select--${size}`,
    fullWidth ? 'ax-preview-select--full-width' : '',
    disabled ? 'ax-preview-select--disabled' : '',
    hasValue ? 'ax-preview-select--has-value' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClass}>
      <div className="ax-preview-select__control">
        <span className="ax-preview-select__label">{label}</span>
        <span className="ax-preview-select__value">{selectedLabel}</span>
        <span className="ax-preview-select__arrow">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1l4 4 4-4" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      {helperText && <span className="ax-preview-select__helper">{helperText}</span>}
    </div>
  )
}
