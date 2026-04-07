import { ReactElement, ComponentType, ReactNode } from 'react'

export interface SidebarPreviewProps {
  content: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> }
}

interface NavItem {
  icon: string
  label: string
  active?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { icon: '\u25A6', label: 'Dashboard', active: true },
  { icon: '\u25A4', label: 'Yield Analysis' },
  { icon: '\u25C7', label: 'Defect Analysis' },
  { icon: '\u25A3', label: 'Lot Tracking' },
  { icon: '\u25A8', label: 'Technology Roadmap' },
]

export function SidebarPreview({ content }: SidebarPreviewProps): ReactElement {
  if (content.widgetCount > 0) {
    const ContentRenderer = content.renderer
    return (
      <div className="ax-preview-sidebar">
        <ContentRenderer caption="Sidebar content">
          <div style={{ display: 'contents' }} />
        </ContentRenderer>
      </div>
    )
  }

  return (
    <div className="ax-preview-sidebar">
      <div className="ax-preview-sidebar__nav">
        {NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            className={
              'ax-preview-sidebar__item' +
              (item.active ? ' ax-preview-sidebar__item--active' : '')
            }
          >
            <span className="ax-preview-sidebar__icon">{item.icon}</span>
            <span className="ax-preview-sidebar__label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
