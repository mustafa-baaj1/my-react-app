import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

function ProtectedRoute() {
  const location = useLocation()
  const { isAuthenticated, isInitializing } = useAuth()

  if (isInitializing) {
    return (
      <section className="auth-route-loading" aria-busy="true" aria-live="polite">
        <span className="auth-spinner" aria-hidden="true" />
        <p>جارٍ التحقق من جلستك...</p>
      </section>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute
