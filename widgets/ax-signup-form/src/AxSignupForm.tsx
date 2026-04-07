import { type ReactElement, useCallback, useEffect, useState } from 'react'
import { AxThemeProvider, ErrorBoundary, useWidgetEvents, type AxEvent } from '@ax/shared'

import type { AxSignupFormContainerProps } from '../typings/AxSignupFormProps'

import { SignUpFormProvider } from './main/context'
import { SignUpForm } from './main/SignUpForm'
import { SignUpFormStore } from './main/store'

export function AxSignupForm(props: AxSignupFormContainerProps): ReactElement {
  const [store] = useState(() => new SignUpFormStore())

  // Sync Mendix EditableValue props to store
  useEffect(() => {
    store.syncFullName(props.fullNameAttr?.value ?? '')
  }, [props.fullNameAttr?.value])

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
    store.onFullNameChange = (v: string) => props.fullNameAttr?.setValue(v)
    store.onEmailChange = (v: string) => props.emailAttr?.setValue(v)
    store.onPasswordChange = (v: string) => props.passwordAttr?.setValue(v)
    store.onSubmit = props.onSubmit?.canExecute ? () => props.onSubmit!.execute() : undefined
    store.onNavigateSignIn = props.onNavigateSignIn?.canExecute ? () => props.onNavigateSignIn!.execute() : undefined
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
        <SignUpFormProvider store={store}>
          <SignUpForm />
        </SignUpFormProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}
