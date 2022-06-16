import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../cartContext";
import("./styles/header.css");

const Header = () => {
  const navigate = useNavigate();
  const {cartSize, updateCartSize} = useContext(CartContext)
  const [loginStatus, setLoginStatus] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setLoginStatus(true);
    }
  }, [setLoginStatus]);

  const logoutClick = () => {
    localStorage.removeItem("authToken");
    setLoginStatus(false);
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    updateCartSize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartSize]);


  return (
    <div className="headerContainer">
      <div className="logoContainer">
        <a href="/">
          <img src="images/logo-small.png" alt="logo" className="logo" />
        </a>
      </div>
      <div className="menuContainer">
        <ul className="menu">
          <Link to="/womensclothing" state={{ output: "women_main" }}>
            <li className="women">Women</li>
          </Link>
          <Link to="/mensclothing" state={{ output: "mens_main" }}>
            <li className="men">Men</li>
          </Link>
          <Link to="/sale" state={{ output: "sale" }}>
            <li className="sale">Sale</li>
          </Link>
        </ul>
      </div>
      <div className="profileContainer">
        {!loginStatus ? (
          [
            <a href="./login" key="1">
              Sign In
            </a>,
            <p key="4"> / </p>,
            <a href="./register" key="2">
              Register
            </a>,
          ]
        ) : (
          <p onClick={logoutClick} className="logout">
            Logout
          </p>
        )}
        <div className="shoppingCartIcon">
          <a href="/shoppingcart">
            <i className="fa-solid fa-bag-shopping"></i>
          </a>
          {cartSize > 0 ? <div className="cartSize">{cartSize}</div> : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
