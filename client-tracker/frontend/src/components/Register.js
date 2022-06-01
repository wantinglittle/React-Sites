import { useAuth0 } from '@auth0/auth0-react';
import './styles/header.css'

const SignupButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && <span
      className="authenticate"
      onClick={() =>
        loginWithRedirect({
          screen_hint: 'signup',
        })
      }
    >
      Register
    </span>
  );
};

export default SignupButton;