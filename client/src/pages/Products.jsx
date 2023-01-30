import React, { useState, useEffect } from "react";
import { useUserToken } from "../context/UserContext";



const Products = () => {
  const { token } = useUserToken();
  const [products,setProducts]= useState
  useEffect(() => {
    async function getProducts(){
      const res = await fetch(`http://localhost:8000/products/${token}`);
      const data = res.json();
      console.log('data', data);
      setProducts(data);
    }
    getProducts();
  }, []);
  return <div></div>;
};

export default Products;
