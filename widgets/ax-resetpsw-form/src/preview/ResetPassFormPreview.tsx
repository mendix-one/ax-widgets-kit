import { ReactElement } from 'react'

export function ResetPassFormPreview(): ReactElement {
  return (
    <div className="ax-preview-resetpsw">
      <div className="ax-preview-resetpsw-header">
        <span className="ax-preview-resetpsw-back">&#8592;</span>
        <h2 className="ax-preview-resetpsw-title">Reset Password</h2>
      </div>
      <p className="ax-preview-resetpsw-subtitle">Enter your email to receive a reset link</p>

      <div className="ax-preview-resetpsw-field">
        <label>Email</label>
        <div className="ax-preview-resetpsw-field-input">user@example.com</div>
      </div>

      <div className="ax-preview-resetpsw-submit">Send Reset Link</div>

      <p className="ax-preview-resetpsw-footer">
        Remember your password? <span className="ax-preview-resetpsw-link">Sign In</span>
      </p>
    </div>
  )
}
