import { ReactElement } from 'react'

export function SetPasswordFormPreview(): ReactElement {
  return (
    <div className="ax-preview-setpsw">
      <h2 className="ax-preview-setpsw-title">Set New Password</h2>
      <p className="ax-preview-setpsw-subtitle">Enter your new password below</p>

      <div className="ax-preview-setpsw-field">
        <label>New Password</label>
        <div className="ax-preview-setpsw-field-input ax-preview-setpsw-password-input">
          <span>••••••••</span>
          <span className="ax-preview-setpsw-eye">&#9673;</span>
        </div>
      </div>

      <div className="ax-preview-setpsw-field">
        <label>Confirm Password</label>
        <div className="ax-preview-setpsw-field-input ax-preview-setpsw-password-input">
          <span>••••••••</span>
          <span className="ax-preview-setpsw-eye">&#9673;</span>
        </div>
      </div>

      <div className="ax-preview-setpsw-submit">Set Password</div>

      <p className="ax-preview-setpsw-footer">
        <span className="ax-preview-setpsw-link">Back to Sign In</span>
      </p>
    </div>
  )
}
