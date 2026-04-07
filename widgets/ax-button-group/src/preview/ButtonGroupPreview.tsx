import { ReactElement, ComponentType, ReactNode } from 'react'

export interface ButtonGroupPreviewProps {
  content: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> } | null
  variant: 'contained' | 'outlined' | 'text'
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

const SIZE_MAP: Record<string, { padding: string; fontSize: number }> = {
  small: { padding: '4px 10px', fontSize: 13 },
  medium: { padding: '6px 16px', fontSize: 14 },
  large: { padding: '8px 22px', fontSize: 15 },
}

function PlaceholderButton({
  label,
  variant,
  colorValue,
  sizeValue,
  position,
  orientation,
}: {
  label: string
  variant: string
  colorValue: string
  sizeValue: { padding: string; fontSize: number }
  position: 'first' | 'middle' | 'last'
  orientation: 'horizontal' | 'vertical'
}): ReactElement {
  const isHorizontal = orientation === 'horizontal'

  const borderRadius = (() => {
    if (position === 'first') return isHorizontal ? '4px 0 0 4px' : '4px 4px 0 0'
    if (position === 'last') return isHorizontal ? '0 4px 4px 0' : '0 0 4px 4px'
    return '0'
  })()

  const baseStyles: React.CSSProperties = {
    padding: sizeValue.padding,
    fontSize: sizeValue.fontSize,
    fontFamily: 'Roboto, Arial, sans-serif',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
    lineHeight: 1.75,
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius,
    boxSizing: 'border-box',
    cursor: 'default',
    flex: '1 1 0',
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    contained: {
      backgroundColor: colorValue,
      color: '#fff',
      border: 'none',
      borderRight: isHorizontal && position !== 'last' ? `1px solid rgba(255,255,255,0.3)` : undefined,
      borderBottom: !isHorizontal && position !== 'last' ? `1px solid rgba(255,255,255,0.3)` : undefined,
      boxShadow: '0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.12)',
    },
    outlined: {
      backgroundColor: 'transparent',
      color: colorValue,
      border: `1px solid ${colorValue}`,
      marginLeft: isHorizontal && position !== 'first' ? '-1px' : undefined,
      marginTop: !isHorizontal && position !== 'first' ? '-1px' : undefined,
    },
    text: {
      backgroundColor: 'transparent',
      color: colorValue,
      border: 'none',
    },
  }

  return (
    <div style={{ ...baseStyles, ...variantStyles[variant] }}>
      {label}
    </div>
  )
}

export function ButtonGroupPreview({
  content,
  variant,
  color,
  size,
  orientation,
  disabled,
  fullWidth,
}: ButtonGroupPreviewProps): ReactElement {
  const colorValue = COLOR_MAP[color] ?? COLOR_MAP.primary
  const sizeValue = SIZE_MAP[size] ?? SIZE_MAP.medium
  const isHorizontal = orientation === 'horizontal'

  const rootClass = [
    'ax-preview-button-group',
    isHorizontal ? 'ax-preview-button-group--horizontal' : 'ax-preview-button-group--vertical',
    fullWidth ? 'ax-preview-button-group--full-width' : '',
    disabled ? 'ax-preview-button-group--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const hasContent = content && content.widgetCount > 0

  if (hasContent) {
    const ContentRenderer = content.renderer
    return (
      <div className={rootClass}>
        <ContentRenderer caption="Button group content">
          <div style={{ display: 'contents' }} />
        </ContentRenderer>
      </div>
    )
  }

  const placeholders = ['One', 'Two', 'Three']

  return (
    <div className={rootClass}>
      {placeholders.map((label, index) => (
        <PlaceholderButton
          key={label}
          label={label}
          variant={variant}
          colorValue={colorValue}
          sizeValue={sizeValue}
          position={index === 0 ? 'first' : index === placeholders.length - 1 ? 'last' : 'middle'}
          orientation={orientation}
        />
      ))}
    </div>
  )
}
