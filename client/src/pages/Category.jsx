import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSessionID } from "../context/UserContext";
import "../style/categoryProducts.css";


const Category = () => {
  let { categoryId } = useParams();
  const { sessionID } = useSessionID();

  const [category, setCategory] = useState([]);
  const [visibleCategory, setVisibleCategory] = useState([]);
  const [searchBar, setSearchBar] = useState("");

  const getCategory = async (name) => {
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
    setVisibleCategory(data);
  };

  useEffect(() => {
    getCategory(categoryId);
  }, [categoryId]);
  useEffect(() => searchByName(), [searchBar]);
  const handleChange = ({ target }) => {
    const { value } = target;
    setSearchBar(value);
  };
  function searchByName() {
    let result = category.filter((str) =>
      str.product_name.startsWith(searchBar)
    );
    setVisibleCategory(result);
  }
  return (
    <div>
      <label htmlFor="searchBar">
        Search By Product name
        <input type="text" name="searchBar" id="searchBar" onChange={handleChange} value={searchBar} />
      </label>
      <div id="categoryProducts">
      {visibleCategory.map((item) => {
        return (
          <Link className="product" key={item.product_id} to={`/product/${item.product_id}`}>
              <h4>{item.product_name}</h4>
              <b>seller:</b> {item.seller_name}<br />
              <b>price:</b> {item.price}
              <img src={item.product_picture} />
          </Link>
        );
      })}
      </div>
    </div>
  );
};

export default Category;
