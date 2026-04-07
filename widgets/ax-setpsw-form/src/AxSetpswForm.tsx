import { type ReactElement, useCallback, useEffect, useState } from 'react'
import { AxThemeProvider, ErrorBoundary, useWidgetEvents, type AxEvent } from '@ax/shared'

import type { AxSetpswFormContainerProps } from '../typings/AxSetpswFormProps'

import { SetPasswordFormProvider } from './main/context'
import { SetPasswordForm } from './main/SetPasswordForm'
import { SetPasswordFormStore } from './main/store'

export function AxSetpswForm(props: AxSetpswFormContainerProps): ReactElement {
  const [store] = useState(() => new SetPasswordFormStore())

  // Sync Mendix EditableValue props to store
  useEffect(() => {
    store.syncPassword(props.passwordAttr?.value ?? '')
  }, [props.passwordAttr?.value])

  useEffect(() => {
    store.setReadOnly(props.passwordAttr?.readOnly ?? false)
  }, [props.passwordAttr?.readOnly])

  // Sync callbacks
  useEffect(() => {
    store.onPasswordChange = (v: string) => props.passwordAttr?.setValue(v)
    store.onSubmit = props.onSubmit?.canExecute ? () => props.onSubmit!.execute() : undefined
    store.onNavigateSignIn = props.onNavigateSignIn?.canExecute ? () => props.onNavigateSignIn!.execute() : undefined
  })

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <SetPasswordFormProvider store={store}>
          <SetPasswordForm />
        </SetPasswordFormProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}
