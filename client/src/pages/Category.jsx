import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Category = () => {
  let params = useParams();
  const [category, setCategory] = useState([]);

  const getCategory = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
    );
    const recipes = await data.json();
    setCategory(recipes.results);
    console.log(category);
  };

  useEffect(() => {
    getCategory(params.category);
  }, [params.category]);

  return (
    <div>
      {category.map((item) => {
        return (
          <div key={item.category_id}>
            <Link to={"/category/" + item.category_id}>
              {/* <img src={item.image} alt={item.image} /> */}
              <h4>{item.category_name}</h4>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Category;
