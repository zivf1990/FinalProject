import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSessionID } from "../context/UserContext";

const Category = () => {
  let { categoryId } = useParams();
  const { sessionID } = useSessionID();

  const [category, setCategory] = useState([]);
  const [visibleCategory, setVisibleCategory] = useState([]);
  const [searchBar, setSearchBar] = useState("");

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
      setVisibleCategory(data)
    }
  };

  useEffect(() => {
    getCategory(categoryId);
  }, [categoryId]);
  useEffect(() => searchByName(), [searchBar])
  const handleChange = ({ target }) => {
    const { value } = target;
    setSearchBar(value)
  };
  function searchByName() {
    let result = category.filter(str => str.seller_name.startsWith(searchBar));
    setVisibleCategory(result);
  }
  return (
    <div>
      <label htmlFor="searchBar">
        Search By Username
        <input type="text" name="searchBar" id="searchBar" onChange={handleChange} value={searchBar} />
      </label>
      {visibleCategory.map((item) => {
        return (
          <Link to={`/product/${item.product_id}`}>
            <div key={item.product_id}>
              <h4>{item.product_name}</h4>
              <b>seller:</b> {item.seller_name}<br />
              <b>price:</b> {item.price}
              <img src={item.product_picture} />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Category;
