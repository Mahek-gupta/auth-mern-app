import React, { useEffect, useState } from 'react';
import {  NavLink, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from '../utils';

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  useEffect(() => {
    console.log(signupInfo);
  }, [signupInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError("Name, email, and password are required");
    }

    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });

      const result = await response.json();
      const {success, message, error} = result
      if(success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login")
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
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor='name'>Name</label>
          <input id="name" onChange={handleChange} type="text" name="name" placeholder='Enter your name' autoFocus />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input id="email" onChange={handleChange} type="email" name="email" placeholder='Enter your email' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input id="password" onChange={handleChange} type="password" name="password" placeholder='Enter your password' />
        </div>

        <button type="submit">Signup</button>
        <span>Already have an account? </span>
        <NavLink to="/login" className={({ isActive }) => isActive ? "active-link" : ""}>
          Login
        </NavLink>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
