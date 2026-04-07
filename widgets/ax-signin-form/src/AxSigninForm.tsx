import { AxThemeProvider, ErrorBoundary, useWidgetEvents, type AxEvent } from '@ax/shared'
import { configure } from 'mobx'
import { type ReactElement, useCallback, useEffect } from 'react'

import { SignInFormProvider, useSignInFormStore } from './main/context'
import { SignInForm } from './main/SignInForm'
import { SignInFormStore } from './main/store'

import type { AxSigninFormContainerProps } from '../typings/AxSigninFormProps'

configure({ isolateGlobalState: true })

export function AxSigninForm(props: AxSigninFormContainerProps): ReactElement {
  return (
    <ErrorBoundary>
      <AxThemeProvider>
        <SignInFormProvider createStore={() => new SignInFormStore()}>
          <AxSigninFormSync {...props} />
        </SignInFormProvider>
      </AxThemeProvider>
    </ErrorBoundary>
  )
}

function AxSigninFormSync(props: AxSigninFormContainerProps): ReactElement {
  const store = useSignInFormStore()

  // Sync Mendix EditableValue props to store
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
    store.setOnEmailChange((v: string) => props.emailAttr?.setValue(v))
    store.setOnPasswordChange((v: string) => props.passwordAttr?.setValue(v))
    store.setOnSubmit(props.onSubmit?.canExecute ? () => props.onSubmit!.execute() : undefined)
    store.setOnNavigateSignUp(props.onNavigateSignUp?.canExecute ? () => props.onNavigateSignUp!.execute() : undefined)
    store.setOnNavigateResetPass(
      props.onNavigateResetPass?.canExecute ? () => props.onNavigateResetPass!.execute() : undefined,
    )
    store.setOnGoogleSSO(props.onGoogleSSO?.canExecute ? () => props.onGoogleSSO!.execute() : undefined)
    store.setOnMicrosoftSSO(props.onMicrosoftSSO?.canExecute ? () => props.onMicrosoftSSO!.execute() : undefined)
  })

  // Subscribe to event bus (broadcast + private topic)
  const handleEvent = useCallback((_event: AxEvent) => {
    // Handle events from other widgets or Mendix nanoflows
  }, [])

  useWidgetEvents({ widgetName: props.name, onEvent: handleEvent })

  return <SignInForm />
}
