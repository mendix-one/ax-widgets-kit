import { type ReactElement, type ReactNode } from 'react'

interface AlertProps {
  children?: ReactNode
}

/**
 * Validation alert — renders Mendix EditableValue.validation messages.
 * Matches the Mendix Atlas UI danger alert pattern.
 */
export function Alert({ children }: AlertProps): ReactElement | null {
  if (!children) return null

  return (
    <div className="alert alert-danger mx-validation-message" role="alert">
      {children}
    </div>
  )
}
