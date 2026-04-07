import { ReactElement, ComponentType, ReactNode } from 'react'

export interface WebAppPreviewProps {
  logo: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> }
  tasksMenu: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> }
  notifyMenu: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> }
  userMenu: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> }
  sidebar: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> }
  content: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> }
  agentChat: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> }
}

function SlotOrFallback({
  slot,
  fallback,
  caption,
}: {
  slot: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> }
  fallback: ReactNode
  caption?: string
}): ReactElement {
  if (slot.widgetCount > 0) {
    const Renderer = slot.renderer
    return (
      <Renderer caption={caption}>
        <div style={{ display: 'contents' }} />
      </Renderer>
    )
  }
  return <>{fallback}</>
}

export function WebAppPreview({
  logo,
  tasksMenu,
  notifyMenu,
  userMenu,
  sidebar,
  content,
  agentChat,
}: WebAppPreviewProps): ReactElement {
  return (
    <div className="ax-preview-webapp">
      {/* Header */}
      <div className="ax-preview-webapp__header">
        <div className="ax-preview-webapp__header-left">
          <div className="ax-preview-webapp__logo">
            <SlotOrFallback
              slot={logo}
              caption="Logo"
              fallback={<span className="ax-preview-webapp__logo-text">Logo</span>}
            />
          </div>
          <span className="ax-preview-webapp__hamburger">&#9776;</span>
        </div>
        <div className="ax-preview-webapp__header-right">
          <SlotOrFallback
            slot={tasksMenu}
            caption="Tasks menu"
            fallback={null}
          />
          <SlotOrFallback
            slot={agentChat}
            caption="Agent chat"
            fallback={<span className="ax-preview-webapp__icon-circle">AI</span>}
          />
          <SlotOrFallback
            slot={notifyMenu}
            caption="Notify menu"
            fallback={<span className="ax-preview-webapp__icon-bell">&#9954;</span>}
          />
          <SlotOrFallback
            slot={userMenu}
            caption="User menu"
            fallback={<span className="ax-preview-webapp__avatar">OP</span>}
          />
        </div>
      </div>

      {/* Body */}
      <div className="ax-preview-webapp__body">
        {/* Sidebar */}
        <div className="ax-preview-webapp__sidebar">
          <SlotOrFallback
            slot={sidebar}
            caption="Sidebar"
            fallback={
              <div className="ax-preview-webapp__nav">
                <div className="ax-preview-webapp__nav-item ax-preview-webapp__nav-item--active">
                  <span className="ax-preview-webapp__nav-icon">&#9642;</span>
                  <span>Dashboard</span>
                </div>
                <div className="ax-preview-webapp__nav-item">
                  <span className="ax-preview-webapp__nav-icon">&#9642;</span>
                  <span>Analytics</span>
                </div>
                <div className="ax-preview-webapp__nav-item">
                  <span className="ax-preview-webapp__nav-icon">&#9642;</span>
                  <span>Settings</span>
                </div>
              </div>
            }
          />
        </div>

        {/* Main content */}
        <div className="ax-preview-webapp__main">
          <SlotOrFallback
            slot={content}
            caption="Content"
            fallback={
              <div className="ax-preview-webapp__content-placeholder">
                Content area
              </div>
            }
          />
        </div>
      </div>
    </div>
  )
}
