import { withAuthenticationRequired } from "@auth0/auth0-react";
// import { Loader } from "./loader";

export const ProtectedRoute = ({ component }) => {
  const Component = withAuthenticationRequired(component);

  return <Component />;
};

export default ProtectedRoute