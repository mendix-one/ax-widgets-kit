import { ReactElement } from 'react'

export interface SignUpFormPreviewProps {
  showSSO: boolean
}

export function SignUpFormPreview({ showSSO }: SignUpFormPreviewProps): ReactElement {
  return (
    <div className="ax-preview-signup">
      <h2 className="ax-preview-signup-title">Sign Up</h2>
      <p className="ax-preview-signup-subtitle">Create your account to get started</p>

      {showSSO && (
        <>
          <div className="ax-preview-signup-sso">
            <div className="ax-preview-signup-sso-btn">
              <span className="ax-preview-signup-sso-icon">G</span>
              Google
            </div>
            <div className="ax-preview-signup-sso-btn">
              <span className="ax-preview-signup-sso-icon">M</span>
              Microsoft
            </div>
          </div>
          <div className="ax-preview-signup-divider">or continue with</div>
        </>
      )}

      <div className="ax-preview-signup-field">
        <label>Full Name</label>
        <div className="ax-preview-signup-field-input">John Doe</div>
      </div>

      <div className="ax-preview-signup-field">
        <label>Email</label>
        <div className="ax-preview-signup-field-input">user@example.com</div>
      </div>

      <div className="ax-preview-signup-field">
        <label>Password</label>
        <div className="ax-preview-signup-field-input ax-preview-signup-password-input">
          <span>••••••••</span>
          <span className="ax-preview-signup-eye">&#9673;</span>
        </div>
      </div>

      <div className="ax-preview-signup-field">
        <label>Confirm Password</label>
        <div className="ax-preview-signup-field-input ax-preview-signup-password-input">
          <span>••••••••</span>
          <span className="ax-preview-signup-eye">&#9673;</span>
        </div>
      </div>

      <div className="ax-preview-signup-submit">Sign Up</div>

      <p className="ax-preview-signup-footer">
        Already have an account? <span className="ax-preview-signup-link">Sign In</span>
      </p>
    </div>
  )
}
