import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import './styles/registerUser.css'


const RegisterUser = () => {
  const navigate=useNavigate()
  const [error, setError] =useState('')  
  const [user, setUser] = useState({
    firstName: "",
    email: "",
    password: "",
  });

  const { firstName, email, password } = user;

  const onChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, [navigate]);

  //handle submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const {data} = await Axios.post("/api/auth/register", {
            firstName,
            email,
            password}, config)
    localStorage.setItem('authToken', data.token)
    navigate('/login')
          }
    catch (error) { 
      setError(error.response.data.error)
    }

  }



  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   Axios.post("/api/auth/register", {
  //     firstName,
  //     email,
  //     password,
  //   });

  // };

  return (
    <div className='registrationContainer'>
    <h1>Register  </h1>
    {error && <span>{error}</span>}
      <form className='form registerUserForm' onSubmit={handleSubmit}>
        <input
          type="text"
          value={firstName}
          required
          name='firstName'
          className="firstName"
          placeholder="First Name"
          onChange={onChange}
        />
        <input
          type="text"
          value={email}
          required
          name='email'
          className="email"
          placeholder="E-mail"
          onChange={onChange}
        />
        <input
          type="password"
          value={password}
          required
          name='password'
          className="password"
          placeholder="Password"
          onChange={onChange}
        />
        <button className="button registerButton">Submit</button>
      </form>
    </div>
  );
};

export default RegisterUser;
