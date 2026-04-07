import { ReactElement } from 'react'

export interface SliderPreviewProps {
  label: string
  min: number | null
  max: number | null
  step: number | null
  color: 'primary' | 'secondary'
  size: 'small' | 'medium'
  marks: boolean
  valueLabelDisplay: 'auto' | 'on' | 'off'
  disabled: boolean
}

const COLOR_MAP: Record<string, string> = {
  primary: '#3F51B5',
  secondary: '#009688',
}

export function SliderPreview({
  label,
  min,
  max,
  step,
  color,
  size,
  marks,
  valueLabelDisplay,
  disabled,
}: SliderPreviewProps): ReactElement {
  const trackColor = COLOR_MAP[color] ?? COLOR_MAP.primary
  const thumbSize = size === 'small' ? 16 : 20
  const trackHeight = size === 'small' ? 2 : 4
  const fillPercent = 40
  const minVal = min ?? 0
  const maxVal = max ?? 100
  const currentValue = Math.round(minVal + (maxVal - minVal) * (fillPercent / 100))
  const stepVal = step ?? 10

  const rootClass = [
    'ax-preview-slider',
    `ax-preview-slider--${size}`,
    disabled ? 'ax-preview-slider--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const markCount = Math.floor((maxVal - minVal) / stepVal)
  const markPositions: number[] = []
  if (marks && markCount > 0 && markCount <= 50) {
    for (let i = 0; i <= markCount; i++) {
      markPositions.push((i / markCount) * 100)
    }
  }

  return (
    <div className={rootClass}>
      {label && <div className="ax-preview-slider__label">{label}</div>}

      <div className="ax-preview-slider__container">
        <div className="ax-preview-slider__min-label">{minVal}</div>

        <div className="ax-preview-slider__track-wrapper">
          {valueLabelDisplay === 'on' && (
            <div
              className="ax-preview-slider__value-label"
              style={{ left: `${fillPercent}%`, backgroundColor: trackColor }}
            >
              {currentValue}
            </div>
          )}

          <div className="ax-preview-slider__track" style={{ height: trackHeight }}>
            <div
              className="ax-preview-slider__track-fill"
              style={{ width: `${fillPercent}%`, backgroundColor: trackColor }}
            />
          </div>

          <div
            className="ax-preview-slider__thumb"
            style={{
              left: `${fillPercent}%`,
              width: thumbSize,
              height: thumbSize,
              backgroundColor: trackColor,
              marginTop: -(thumbSize / 2) + trackHeight / 2,
              marginLeft: -(thumbSize / 2),
            }}
          />

          {marks && markPositions.length > 0 && (
            <div className="ax-preview-slider__marks">
              {markPositions.map((pos) => (
                <div
                  key={pos}
                  className="ax-preview-slider__mark"
                  style={{ left: `${pos}%` }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="ax-preview-slider__max-label">{maxVal}</div>
      </div>
    </div>
  )
}
