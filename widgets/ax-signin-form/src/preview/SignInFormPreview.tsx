import { ReactElement } from 'react'

export interface SignInFormPreviewProps {
  showSSO: boolean
}

export function SignInFormPreview({ showSSO }: SignInFormPreviewProps): ReactElement {
  return (
    <div className="ax-preview-signin">
      <h2 className="ax-preview-signin-title">Sign In</h2>
      <p className="ax-preview-signin-subtitle">Welcome back — sign in to continue</p>

      {showSSO && (
        <>
          <div className="ax-preview-signin-sso">
            <div className="ax-preview-signin-sso-btn">
              <span className="ax-preview-signin-sso-icon">G</span>
              Google
            </div>
            <div className="ax-preview-signin-sso-btn">
              <span className="ax-preview-signin-sso-icon">M</span>
              Microsoft
            </div>
          </div>
          <div className="ax-preview-signin-divider">or continue with</div>
        </>
      )}

      <div className="ax-preview-signin-field">
        <label>Email</label>
        <div className="ax-preview-signin-field-input">user@example.com</div>
      </div>

      <div className="ax-preview-signin-field">
        <label>Password</label>
        <div className="ax-preview-signin-field-input ax-preview-signin-password-input">
          <span>••••••••</span>
          <span className="ax-preview-signin-eye">&#9673;</span>
        </div>
      </div>

      <div className="ax-preview-signin-forgot">
        <span className="ax-preview-signin-link">Forgot password?</span>
      </div>

      <div className="ax-preview-signin-submit">Sign In</div>

      <p className="ax-preview-signin-footer">
        Don't have an account? <span className="ax-preview-signin-link">Sign Up</span>
      </p>
    </div>
  )
}
