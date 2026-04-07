import { ComponentType, ReactElement, ReactNode } from 'react'

export interface AuthLayoutPreviewProps {
  content: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> }
  tagline: string
  brandDescription: string
  showBackground: boolean
}

export function AuthLayoutPreview({
  content,
  tagline,
  brandDescription,
  showBackground,
}: AuthLayoutPreviewProps): ReactElement {
  const Content = content.renderer

  return (
    <div className={`ax-preview-auth-layout ${showBackground ? '' : 'ax-preview-auth-layout--no-bg'}`}>
      <div className="ax-preview-auth-layout-left">
        <div className="ax-preview-auth-layout-tagline">
          {tagline || 'Welcome to\nOur Platform'}
        </div>
        <div className="ax-preview-auth-layout-description">
          {brandDescription || 'Manage your operations with ease.'}
        </div>
      </div>
      <div className="ax-preview-auth-layout-right">
        <div className="ax-preview-auth-layout-card">
          <Content>
            <div className="ax-preview-auth-layout-placeholder">
              Content slot
            </div>
          </Content>
        </div>
      </div>
    </div>
  )
}
