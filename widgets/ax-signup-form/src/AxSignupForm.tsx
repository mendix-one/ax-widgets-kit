import { AxThemeProvider, ErrorBoundary, useWidgetEvents, type AxEvent } from '@ax/shared'
import { configure } from 'mobx'
import { type ReactElement, useCallback, useEffect } from 'react'

import { SignUpFormProvider, useSignUpFormStore } from './main/context'
import { SignUpForm } from './main/SignUpForm'
import { SignUpFormStore } from './main/store'

import type { AxSignupFormContainerProps } from '../typings/AxSignupFormProps'

configure({ isolateGlobalState: true })

export function AxSignupForm(props: AxSignupFormContainerProps): ReactElement {
  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <SignUpFormProvider createStore={() => new SignUpFormStore()}>
          <AxSignupFormSync {...props} />
        </SignUpFormProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}

function AxSignupFormSync(props: AxSignupFormContainerProps): ReactElement {
  const store = useSignUpFormStore()

  // Sync Mendix EditableValue props to store
  useEffect(() => {
    store.syncFullName(props.fullNameAttr?.value ?? '')
  }, [store, props.fullNameAttr?.value])

  useEffect(() => {
    store.syncEmail(props.emailAttr?.value ?? '')
  }, [store, props.emailAttr?.value])

  useEffect(() => {
    store.syncPassword(props.passwordAttr?.value ?? '')
  }, [store, props.passwordAttr?.value])

  useEffect(() => {
    store.setReadOnly(props.emailAttr?.readOnly ?? false)
  }, [store, props.emailAttr?.readOnly])

  useEffect(() => {
    store.setShowSSO(props.showSSO)
  }, [store, props.showSSO])

  // Sync callbacks
  useEffect(() => {
    store.setOnFullNameChange((v: string) => props.fullNameAttr?.setValue(v))
    store.setOnEmailChange((v: string) => props.emailAttr?.setValue(v))
    store.setOnPasswordChange((v: string) => props.passwordAttr?.setValue(v))
    store.setOnSubmit(props.onSubmit?.canExecute ? () => props.onSubmit!.execute() : undefined)
    store.setOnNavigateSignIn(props.onNavigateSignIn?.canExecute ? () => props.onNavigateSignIn!.execute() : undefined)
    store.setOnGoogleSSO(props.onGoogleSSO?.canExecute ? () => props.onGoogleSSO!.execute() : undefined)
    store.setOnMicrosoftSSO(props.onMicrosoftSSO?.canExecute ? () => props.onMicrosoftSSO!.execute() : undefined)
  })

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return <SignUpForm />
}
