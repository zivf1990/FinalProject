import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionID } from "../context/UserContext";
import "../style/shop.css";

const Shop = () => {
  const { sessionID } = useSessionID();
  const [categories, setCategories] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(sessionID);
    getCategories();
  }, [sessionID]);

  const getCategories = async () => {
    if (sessionID) {
      const res = await fetch(`http://localhost:8000/categories`, {
        method: "GET",
        headers: {
          "x-session-id": sessionID,
          "Content-Type": "application/json",
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
              onClick={() => {
                navigate("/category/" + item.category_id);
              }}
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
