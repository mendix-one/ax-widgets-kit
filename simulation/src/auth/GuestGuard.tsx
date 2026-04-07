import { observer } from 'mobx-react-lite'
import { Navigate, Outlet } from 'react-router'

import { useStore } from '../core/stores'

export const GuestGuard = observer(function GuestGuard() {
  const { auth } = useStore()

  if (auth.isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
})
