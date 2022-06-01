import { useAuth0 } from '@auth0/auth0-react';
import './styles/header.css'

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <span className="authenticate" onClick={() => logout()}>
        Log Out
      </span>
    )
  )
}

export default LogoutButton