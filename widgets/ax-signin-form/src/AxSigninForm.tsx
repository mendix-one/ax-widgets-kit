import { type ReactElement, useCallback, useEffect, useState } from 'react'
import { AxThemeProvider, ErrorBoundary, useWidgetEvents, type AxEvent } from '@ax/shared'

import type { AxSigninFormContainerProps } from '../typings/AxSigninFormProps'

import { SignInFormProvider } from './main/context'
import { SignInForm } from './main/SignInForm'
import { SignInFormStore } from './main/store'

export function AxSigninForm(props: AxSigninFormContainerProps): ReactElement {
  const [store] = useState(() => new SignInFormStore())

  // Sync Mendix EditableValue props to store
  useEffect(() => {
    store.syncEmail(props.emailAttr?.value ?? '')
  }, [props.emailAttr?.value])

  useEffect(() => {
    store.syncPassword(props.passwordAttr?.value ?? '')
  }, [props.passwordAttr?.value])

  useEffect(() => {
    store.setReadOnly(props.emailAttr?.readOnly ?? false)
  }, [props.emailAttr?.readOnly])

  useEffect(() => {
    store.setShowSSO(props.showSSO)
  }, [props.showSSO])

  // Sync callbacks
  useEffect(() => {
    store.onEmailChange = (v: string) => props.emailAttr?.setValue(v)
    store.onPasswordChange = (v: string) => props.passwordAttr?.setValue(v)
    store.onSubmit = props.onSubmit?.canExecute ? () => props.onSubmit!.execute() : undefined
    store.onNavigateSignUp = props.onNavigateSignUp?.canExecute ? () => props.onNavigateSignUp!.execute() : undefined
    store.onNavigateResetPass = props.onNavigateResetPass?.canExecute
      ? () => props.onNavigateResetPass!.execute()
      : undefined
    store.onGoogleSSO = props.onGoogleSSO?.canExecute ? () => props.onGoogleSSO!.execute() : undefined
    store.onMicrosoftSSO = props.onMicrosoftSSO?.canExecute ? () => props.onMicrosoftSSO!.execute() : undefined
  })

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <SignInFormProvider store={store}>
          <SignInForm />
        </SignInFormProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}
