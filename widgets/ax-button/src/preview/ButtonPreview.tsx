import { ReactElement } from 'react'

export interface ButtonPreviewProps {
  label: string
  variant: 'contained' | 'outlined' | 'text'
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  size: 'small' | 'medium' | 'large'
  disabled: boolean
  fullWidth: boolean
}

const COLOR_MAP: Record<ButtonPreviewProps['color'], string> = {
  primary: '#3F51B5',
  secondary: '#009688',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
}

const SIZE_MAP: Record<ButtonPreviewProps['size'], { padding: string; fontSize: number }> = {
  small: { padding: '4px 10px', fontSize: 13 },
  medium: { padding: '6px 16px', fontSize: 14 },
  large: { padding: '8px 22px', fontSize: 15 },
}

export function ButtonPreview({
  label,
  variant,
  color,
  size,
  disabled,
  fullWidth,
}: ButtonPreviewProps): ReactElement {
  const colorValue = COLOR_MAP[color] ?? COLOR_MAP.primary
  const sizeValue = SIZE_MAP[size] ?? SIZE_MAP.medium
  const displayLabel = label || 'Button'

  const rootClass = [
    'ax-preview-button',
    `ax-preview-button--${variant}`,
    `ax-preview-button--${size}`,
    fullWidth ? 'ax-preview-button--full-width' : '',
    disabled ? 'ax-preview-button--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const variantStyles: Record<string, React.CSSProperties> = {
    contained: {
      backgroundColor: colorValue,
      color: '#fff',
      border: 'none',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.12)',
    },
    outlined: {
      backgroundColor: 'transparent',
      color: colorValue,
      border: `1px solid ${colorValue}`,
    },
    text: {
      backgroundColor: 'transparent',
      color: colorValue,
      border: 'none',
    },
  }

  return (
    <div
      className={rootClass}
      style={{
        ...variantStyles[variant],
        padding: sizeValue.padding,
        fontSize: sizeValue.fontSize,
      }}
    >
      {displayLabel}
    </div>
  )
}
