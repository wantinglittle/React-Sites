import { useAuth0 } from "@auth0/auth0-react";
import "./styles/header.css";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <span className="authenticate" onClick={() => loginWithRedirect()}>
        Log In
      </span>
    )
  );
};

export default LoginButton;
