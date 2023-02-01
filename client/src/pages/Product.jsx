import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSessionID } from "../context/UserContext";
import { useCart } from "../context/CartContext";


const Product = () => {
  const { sessionID } = useSessionID();
  const { addToCart, removeFromCart } = useCart();

  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(sessionID);
    getProduct();
  }, []);

  const addAndNavigateToCart = (product) => {
    addToCart(product);
    navigate("/shoppingcart");
  };

  const getProduct = async () => {
    console.log("sdssd");
    if (sessionID) {
      const res = await fetch(
        `http://localhost:8000/products/${productId}/data`,
        {
          method: "GET",
          headers: {
            "x-session-id": sessionID,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      console.log("data: ", data);
      setProduct(data);
      console.log("product ", product);
    }
  };

  return (
    <div >
      {product && (
        <div key={Math.random() * Number.MAX_SAFE_INTEGER} className="product" id="theProduct">
          <img src={`${product.product_picture}`} alt="" />
          <div>
          <p><b> price: </b> {product.price}
          <b> amount: </b> {product.amount} 
          <b>  seller: </b> {product.seller_name} 
          <b> description:</b> {product.description} 
          </p><br/>
        
          <button onClick={() => addAndNavigateToCart(product)}>
            Add to cart
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
