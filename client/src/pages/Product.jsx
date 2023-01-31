import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserToken } from "../context/UserContext";
import { useCart } from "../context/CartContext";

const Product = () => {
  const { userToken } = useUserToken();
  const { addToCart, removeFromCart } = useCart();

  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userToken);
    getProduct();
  }, []);

  const addAndNavigateToCart = (product) => {
    addToCart(product);
    navigate("/shoppingcart");
  };

  const getProduct = async () => {
    console.log("sdssd");
    if (userToken) {
      const res = await fetch(
        `http://localhost:8000/products/${productId}/data`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
            headers: { "Content-Type": "application/json" },
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
    <div className="product">
      {product && (
        <div key={Math.random() * Number.MAX_SAFE_INTEGER} className="product">
          <b>price:</b> {product.price}
          <b>amount:</b> {product.amount}
          <img src={`${product.product_picture}`} alt="" />
          <button onClick={() => addAndNavigateToCart(product)}>
            Add to cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
