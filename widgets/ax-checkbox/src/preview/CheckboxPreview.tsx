import { type ReactElement } from 'react'

interface CheckboxPreviewProps {
  label: string
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'default'
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
  default: '#666',
}

export function CheckboxPreview({ label, color, size, disabled }: CheckboxPreviewProps): ReactElement {
  const boxSize = size === 'small' ? 16 : 18
  const resolvedColor = COLOR_MAP[color] || COLOR_MAP.primary
  const rootClass = [
    'ax-preview-checkbox',
    `ax-preview-checkbox--${size}`,
    disabled ? 'ax-preview-checkbox--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClass}>
      <span
        className="ax-preview-checkbox__box"
        style={{
          width: boxSize,
          height: boxSize,
          backgroundColor: resolvedColor,
          borderColor: resolvedColor,
        }}
      >
        <svg
          className="ax-preview-checkbox__check"
          viewBox="0 0 24 24"
          width={boxSize - 4}
          height={boxSize - 4}
        >
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="#fff" />
        </svg>
      </span>
      {label && <span className="ax-preview-checkbox__label">{label}</span>}
    </div>
  )
}
