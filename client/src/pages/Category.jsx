import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUserToken } from "../context/UserContext";

const Category = () => {
  let { categoryId } = useParams();
  const { userToken } = useUserToken();

  const [category, setCategory] = useState([]);

  const getCategory = async (name) => {
    if (userToken) {
      const res = await fetch(
        `http://localhost:8000/products/category/${categoryId}`,
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
      setCategory(data);
    }
  };

  useEffect(() => {
    getCategory(categoryId);
  }, [categoryId]);

  return (
    <div>
      {category.map((item) => {
        return (
          <Link to={`/product/${item.product_id}`}>
            <div key={item.product_id}>
              <b>price:</b> {item.price}
              <h4>{item.product_name}</h4>
              <img src={item.product_picture} />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Category;
