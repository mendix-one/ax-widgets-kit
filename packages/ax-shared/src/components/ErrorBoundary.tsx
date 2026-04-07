import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  /** Custom fallback UI. Receives the error. */
  fallback?: (error: Error) => ReactNode
  children: ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
}

/**
 * Error boundary that catches render errors in widget trees.
 * Shows a danger alert by default, or a custom fallback.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[Ax Widget Error]', error, info.componentStack)
  }

  render(): ReactNode {
    if (this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error)
      }
      return (
        <div
          className="alert alert-danger"
          role="alert"
          style={{ padding: 8, fontSize: 12, color: '#d32f2f' }}
        >
          {this.state.error.message}
        </div>
      )
    }
    return this.props.children
  }
}
