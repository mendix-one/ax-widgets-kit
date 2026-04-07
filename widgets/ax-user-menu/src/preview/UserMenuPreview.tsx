import { ReactElement } from 'react'

export interface UserMenuPreviewProps {
  userName: string
  userEmail: string
}

export function UserMenuPreview({ userName }: UserMenuPreviewProps): ReactElement {
  const name = userName || 'Operator'
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
    || 'OP'

  return (
    <div className="ax-preview-user-menu">
      <div className="ax-preview-user-menu__trigger">
        <div className="ax-preview-user-menu__avatar">{initials}</div>
      </div>
    </div>
  )
}
