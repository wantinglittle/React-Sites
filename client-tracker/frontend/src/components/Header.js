import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import RegisterButton from "./Register";
import { useAuth0 } from "@auth0/auth0-react";
import "./styles/header.css";

const Header = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="headerContainer">
      <section className="topContainer">
        <div className="logoContainer">
          <a href="/">
            <img src="images/logo2.png" alt="logo" className="logo" />
          </a>
        </div>
        <section className="authContainer">
          <LoginButton />
          <LogoutButton />
          {!isAuthenticated && <span>/</span>}
          <RegisterButton />
        </section>
      </section>
      <section className="menu">
          <p className="searchLink">
            <a href="/">Search</a>
          </p>
          <p className="dueDateLink">
            <a href="duedatereport">Due Date Report</a>
          </p>
          <p className="addClientLink">
            <a href="/addclient">Add a Client</a>
          </p>
      </section>
    </div>
  );
};

export default Header;
