import React, { useEffect, useState } from "react";
import getRecipes from "../api/getRecipes";

const Home = () => {
  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    getRecipes().then(setRecipeList);
  }, []);

  return (
    <div>
      <p>Home</p>
      {recipeList.map((recipe, index) => (
        <div key={`${recipe}-${index + 1}`}>
          <p>Name: {recipe.name}</p>
          <p>Ratings: {recipe.userRatings.score}</p>
          <p>Prep Time: {recipe.prepTimeMinutes} minutes</p>
          <p>Cooking Time: {recipe.cookTimeMinutes} minutes</p>
          <p>Nutrition: {recipe.nutrition.calories} Calories</p>
          <p>Ingredients: {recipe.ingredients.length}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
