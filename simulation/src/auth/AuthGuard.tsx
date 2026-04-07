import { observer } from 'mobx-react-lite'
import { Navigate, Outlet } from 'react-router'

import { useStore } from '../core/stores'

export const AuthGuard = observer(function AuthGuard() {
  const { auth } = useStore()

  if (!auth.isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />
  }

  return <Outlet />
})
