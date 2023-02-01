import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSessionID } from "../context/UserContext";

const Searched = () => {
  let { categoryId } = useParams();
  const { sessionID } = useSessionID();

  const [category, setCategory] = useState([]);

  const getCategory = async (name) => {
    if (sessionID) {
      const res = await fetch(
        `http://localhost:8000/products/category/${categoryId}`,
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
          <div key={item.category_id}>
            <Link to={"/category/" + item.category_id}>
              {/* <img src={item.image} alt={item.image} /> */}
              <h4>{item.product_name}</h4>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Searched;
