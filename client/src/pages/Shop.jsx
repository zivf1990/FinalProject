import React, { useEffect, useState } from "react";
import { useUserToken } from "../context/UserContext";
import "../style/shop.css";


const Shop = () => {
  const { userToken } = useUserToken();
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    console.log(userToken);
    getCategories();
  }, [userToken]);

  const getCategories = async () => {
    if (userToken) {
      const res = await fetch(`http://localhost:8000/categories`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
          headers: { "Content-Type": "application/json" },
        },
      });

      const data = await res.json();
      console.log("data: ", data);
      setCategories(data);
    }
  };

  return (
    <div className="categories">
      {categories && (
        <>
          {categories.map((item) => (
            <div
              key={Math.random() * Number.MAX_SAFE_INTEGER}
              className="category"
            >
              <h4>{item.category_name}</h4>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Shop;
