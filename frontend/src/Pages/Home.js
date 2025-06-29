import React, { useEffect, useState } from 'react';
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from '../utils';
import {  useNavigate } from 'react-router-dom';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
const [products, setProducts] = useState("")


  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    setLoggedInUser(user || "Guest");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  const fetchProducts = async () => {
    try {
      const url = 'http://localhost:8080/products';
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const result = await response.json();
      console.log(result);
      setProducts(result)
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
       {
       products && products?.map((item) => {
         return <ul>{item.name} : {item.price}</ul>
        })
       }
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
