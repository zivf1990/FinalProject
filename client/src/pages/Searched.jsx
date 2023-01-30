import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card2, Grid } from "../styles/styledDivs";

const Searched = () => {
  let params = useParams();
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  const getSearched = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
    );
    const recipes = await data.json();
    setSearchedRecipes(recipes.results);
    console.log(searchedRecipes);
  };

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  return (
    <Grid>
      {searchedRecipes.map((recipe) => {
        return (
          <Card2 key={recipe.id}>
            <Link to={"/recipe/" + recipe.id}>
              <img src={recipe.image} alt={recipe.title} />
              <h4>{recipe.title}</h4>
            </Link>
          </Card2>
        );
      })}
    </Grid>
  );
};

export default Searched;
