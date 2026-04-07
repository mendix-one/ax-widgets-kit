/**
 * Check if a Mendix DynamicValue/EditableValue has a usable value.
 * Returns true only when status is 'available' and value is defined.
 */
export function isAvailable<T>(value?: {
  status: string
  value: T | undefined
}): value is { status: 'available'; value: T } {
  return value !== undefined && value.status === 'available' && value.value !== undefined
}

/**
 * Check if a Mendix value is still loading.
 */
export function isLoading(value?: { status: string }): boolean {
  return value !== undefined && value.status === 'loading'
}
