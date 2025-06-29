import React, { useEffect, useState } from 'react';
import {  NavLink, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from '../utils';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  useEffect(() => {
    console.log(loginInfo);
  }, [loginInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if ( !email || !password) {
      return handleError("Name, email, and password are required");
    }

    try {
      const url = "https://auth-mern-app-back.onrender.com";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });

      const result = await response.json();
      const {success, message,jwtToken,name, error} = result
      if(success) {
        handleSuccess(message);
        localStorage.setItem('token',jwtToken)
        localStorage.setItem('loggedInUser', name)
        setTimeout(() => {
          navigate("/home")
        }, 1000)
      }else if (error){
        const details = error?.details[0].message;
        handleError(details)
      }
      else if(!success){
        handleError(message)
      }
      console.log(result);
    } catch (err) {
      handleError(err.message || "Signup failed");
    }
  };

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
       
        <div>
          <label htmlFor='email'>Email</label>
          <input id="email" onChange={handleChange} type="email" name="email" placeholder='Enter your email' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input id="password" onChange={handleChange} type="password" name="password" placeholder='Enter your password' />
        </div>

        <button type="submit">Login</button>
        <span>Does't have an account? </span>
        <NavLink to="/signup" className={({ isActive }) => isActive ? "active-link" : ""}>
          Signup
        </NavLink>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
