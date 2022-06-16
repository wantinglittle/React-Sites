import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/registerUser.css";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
      
    }
  }, [navigate]);

  const { email, password } = user;

  const onChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await Axios.post(
        "/api/auth/login",
        {
          email,
          password,
        },
        config
      );
      localStorage.setItem("authToken", data.token);
      navigate("/");
      window.location.reload();
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <section className="registrationContainer">
      <h1>Login</h1>
      {error && <span>{error}</span>}
      <form className="form registerUserForm" onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          required
          name="email"
          className="email"
          placeholder="E-mail"
          onChange={onChange}
        />
        <input
          type="password"
          value={password}
          required
          name="password"
          className="password"
          placeholder="Password"
          onChange={onChange}
        />
        <button className="button registerButton">Login</button>
      </form>
    </section>
  );
};

export default Login;
