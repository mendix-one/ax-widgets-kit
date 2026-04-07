import { ReactElement } from 'react'

export interface SwitchPreviewProps {
  label: string
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  size: 'small' | 'medium'
  disabled: boolean
  labelPlacement: 'end' | 'start' | 'top' | 'bottom'
}

const COLOR_MAP: Record<string, string> = {
  primary: '#3F51B5',
  secondary: '#009688',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
}

const FLEX_MAP: Record<string, string> = {
  end: 'row',
  start: 'row-reverse',
  top: 'column-reverse',
  bottom: 'column',
}

export function SwitchPreview({
  label,
  color,
  size,
  disabled,
  labelPlacement,
}: SwitchPreviewProps): ReactElement {
  const switchColor = COLOR_MAP[color] ?? COLOR_MAP.primary
  const isMedium = size === 'medium'
  const trackWidth = isMedium ? 34 : 26
  const trackHeight = isMedium ? 14 : 10
  const thumbSize = isMedium ? 20 : 16
  const direction = FLEX_MAP[labelPlacement] ?? 'row'

  const rootClass = [
    'ax-preview-switch',
    `ax-preview-switch--${size}`,
    disabled ? 'ax-preview-switch--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClass} style={{ flexDirection: direction as 'row' }}>
      <div className="ax-preview-switch__control">
        <div
          className="ax-preview-switch__track"
          style={{
            width: trackWidth,
            height: trackHeight,
            backgroundColor: switchColor,
            opacity: 0.5,
          }}
        />
        <div
          className="ax-preview-switch__thumb"
          style={{
            width: thumbSize,
            height: thumbSize,
            backgroundColor: switchColor,
            right: 0,
          }}
        />
      </div>
      {label && <span className="ax-preview-switch__label">{label}</span>}
    </div>
  )
}
