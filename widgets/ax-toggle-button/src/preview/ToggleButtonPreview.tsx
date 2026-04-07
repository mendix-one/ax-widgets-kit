import { ReactElement } from 'react'

export interface ToggleButtonOption {
  optValue: string
  optLabel: string
}

export interface ToggleButtonPreviewProps {
  options: ToggleButtonOption[]
  exclusive: boolean
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  size: 'small' | 'medium' | 'large'
  orientation: 'horizontal' | 'vertical'
  disabled: boolean
  fullWidth: boolean
}

const COLOR_MAP: Record<string, string> = {
  primary: '#3F51B5',
  secondary: '#009688',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
}

const PADDING_MAP: Record<string, string> = {
  small: '4px 8px',
  medium: '6px 12px',
  large: '8px 16px',
}

const FONT_SIZE_MAP: Record<string, number> = {
  small: 12,
  medium: 13,
  large: 14,
}

const DEFAULT_OPTIONS: ToggleButtonOption[] = [
  { optValue: 'left', optLabel: 'Left' },
  { optValue: 'center', optLabel: 'Center' },
  { optValue: 'right', optLabel: 'Right' },
]

export function ToggleButtonPreview({
  options,
  color,
  size,
  orientation,
  disabled,
  fullWidth,
}: ToggleButtonPreviewProps): ReactElement {
  const btnColor = COLOR_MAP[color] ?? COLOR_MAP.primary
  const isVertical = orientation === 'vertical'
  const items = options.length > 0 ? options : DEFAULT_OPTIONS
  const padding = PADDING_MAP[size] ?? PADDING_MAP.medium
  const fontSize = FONT_SIZE_MAP[size] ?? 13

  const rootClass = [
    'ax-preview-toggle',
    `ax-preview-toggle--${orientation}`,
    `ax-preview-toggle--${size}`,
    fullWidth ? 'ax-preview-toggle--full-width' : '',
    disabled ? 'ax-preview-toggle--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClass}>
      {items.map((item, index) => {
        const isSelected = index === 0
        const isFirst = index === 0
        const isLast = index === items.length - 1

        const borderRadius = getBorderRadius(isFirst, isLast, isVertical)

        const style: Record<string, string | number> = {
          padding,
          fontSize,
          borderRadius,
          color: isSelected ? btnColor : '#666',
          backgroundColor: isSelected ? hexToRgba(btnColor, 0.12) : 'transparent',
          borderColor: isSelected ? btnColor : '#c4c4c4',
        }

        return (
          <div
            key={item.optValue || index}
            className={[
              'ax-preview-toggle__button',
              isSelected ? 'ax-preview-toggle__button--selected' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={style}
          >
            {item.optLabel || item.optValue}
          </div>
        )
      })}
    </div>
  )
}

function getBorderRadius(isFirst: boolean, isLast: boolean, isVertical: boolean): string {
  if (isFirst && isLast) return '4px'
  if (isVertical) {
    if (isFirst) return '4px 4px 0 0'
    if (isLast) return '0 0 4px 4px'
  } else {
    if (isFirst) return '4px 0 0 4px'
    if (isLast) return '0 4px 4px 0'
  }
  return '0'
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
