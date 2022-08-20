import React, { useEffect, useState } from "react";
import getRecipes from "../../api/getRecipes";
import Search from "./Search";
import RecipeCards from "./RecipeCards";

const Home = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    getRecipes().then((data) => {
      setRecipeList(data);
      setFilteredList(data);
    });
  }, []);

  return (
    <>
      <Search
        recipeList={recipeList}
        filteredList={filteredList}
        setFilteredList={setFilteredList}
      />
      <RecipeCards filteredList={filteredList} />
    </>
  );
};

export default Home;
