import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserToken } from "../context/UserContext";



const Products = () => {
  const { token } = useUserToken();
  const [products,setProducts]= useState()
  useEffect(() => {
    async function getProducts(){
      if(token){
      const res = await fetch(`http://localhost:8000/products/${token}`);
      const data = res.json();
      console.log('data', data);
      setProducts(data);
      }
    }
    getProducts();
  }, []);
  return (<div><h2>my products</h2>
  <Link to='/home/addProduct'>add product</Link></div>);
};

export default Products;
