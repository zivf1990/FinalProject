import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserToken } from "../context/UserContext";
import { useCart } from "../context/CartContext";

const Product = () => {
  const { userToken } = useUserToken();

  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, removeFromCart } = useCart();

  useEffect(() => {
    console.log(userToken);
    getProduct();
  }, []);

  const getProduct = async () => {
    console.log("sdssd");
    if (userToken) {
      const res = await fetch(`http://localhost:8000/products/${productId}/data`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
          headers: { "Content-Type": "application/json" },
        },
      });

      const data = await res.json();
      console.log("data: ", data);
       setProduct(data);
      console.log("product ", product);
    }
  };
  console.log(product, "weweweew");
  return (
    <div className="product">
      {product && (
        <>
          <b>price:</b> {product.price}
          <b>amount:</b> {product.amount}
          <img src={`${product.product_picture}`} />
          <button onClick={() => addToCart(product.product_id)}>
            Add to cart
          </button>
          <button onClick={() => removeFromCart(product.product_id)}>
            Buy
          </button>
        </>
      )}
    </div>
  );
};

export default Product;
