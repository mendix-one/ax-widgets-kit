import { ReactElement } from 'react'

export interface LogoPreviewProps {
  logoUrl: string
  altText: string
  height: number | null
}

export function LogoPreview({ logoUrl, altText, height }: LogoPreviewProps): ReactElement {
  const effectiveHeight = height ?? 28
  const displayText = altText || 'Logo'

  if (logoUrl) {
    return (
      <div
        className="ax-preview-logo ax-preview-logo--image"
        style={{ height: effectiveHeight }}
      >
        <div className="ax-preview-logo__img-box" style={{ height: effectiveHeight }}>
          <span className="ax-preview-logo__img-icon">&#9633;</span>
          <span className="ax-preview-logo__img-url">{logoUrl}</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className="ax-preview-logo ax-preview-logo--text"
      style={{ height: effectiveHeight, lineHeight: `${effectiveHeight}px` }}
    >
      <span className="ax-preview-logo__label">{displayText}</span>
    </div>
  )
}
