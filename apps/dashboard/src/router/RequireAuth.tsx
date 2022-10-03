import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/auth'

interface Props {
  children: JSX.Element
  onlyAdmin?: boolean
}

export const RequireAuth: React.FC<Props> = ({ children, onlyAdmin }) => {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  if (typeof onlyAdmin === 'boolean' && onlyAdmin && auth.role !== 'admin') {
    return <Navigate to="/posts/all" replace />
  }

  return children
}
