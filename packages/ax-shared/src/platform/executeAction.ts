/**
 * Safely execute a Mendix ActionValue.
 * Checks both canExecute and isExecuting to prevent double-execution.
 */
export function executeAction(action?: {
  canExecute: boolean
  isExecuting: boolean
  execute(): void
}): void {
  if (action && action.canExecute && !action.isExecuting) {
    action.execute()
  }
}
