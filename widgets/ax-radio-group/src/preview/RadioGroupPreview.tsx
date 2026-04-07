import { type ReactElement } from 'react'

interface RadioOption {
  optValue: string
  optLabel: string
}

interface RadioGroupPreviewProps {
  label: string
  options: RadioOption[]
  row: boolean
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  size: 'small' | 'medium'
  disabled?: boolean
}

const COLOR_MAP: Record<string, string> = {
  primary: '#3F51B5',
  secondary: '#009688',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
}

const DEFAULT_OPTIONS: RadioOption[] = [
  { optValue: '1', optLabel: 'Option 1' },
  { optValue: '2', optLabel: 'Option 2' },
  { optValue: '3', optLabel: 'Option 3' },
]

export function RadioGroupPreview({
  label,
  options,
  row,
  color,
  size,
  disabled,
}: RadioGroupPreviewProps): ReactElement {
  const resolvedColor = COLOR_MAP[color] || COLOR_MAP.primary
  const items = options.length > 0 ? options : DEFAULT_OPTIONS
  const radioSize = size === 'small' ? 16 : 18
  const dotSize = size === 'small' ? 8 : 10
  const rootClass = [
    'ax-preview-radio',
    disabled ? 'ax-preview-radio--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClass}>
      {label && <span className="ax-preview-radio__group-label">{label}</span>}
      <div className={`ax-preview-radio__options ${row ? 'ax-preview-radio__options--row' : ''}`}>
        {items.map((opt, index) => (
          <label key={opt.optValue} className={`ax-preview-radio__item ax-preview-radio__item--${size}`}>
            <span
              className="ax-preview-radio__circle"
              style={{
                width: radioSize,
                height: radioSize,
                borderColor: index === 0 ? resolvedColor : '#c4c4c4',
              }}
            >
              {index === 0 && (
                <span
                  className="ax-preview-radio__dot"
                  style={{
                    width: dotSize,
                    height: dotSize,
                    backgroundColor: resolvedColor,
                  }}
                />
              )}
            </span>
            <span className="ax-preview-radio__label">{opt.optLabel || opt.optValue}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
