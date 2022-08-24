import React, { useEffect, useState } from "react";
import getRecipes from "../../api/getRecipes";
import Checkbox from "../../components/Checkbox";
import Counter from "../../components/Counter";
import Search from "../../components/Search";
import Loader from "../../components/Loader";
import RecipeCards from "./RecipeCards";

const Home = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [checkFilters, setCheckFilters] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading");

  const handleSearch = (ev) => {
    ev.preventDefault();
    const value = ev.target.value.toLowerCase();

    const searchKeys = value.split(" ").filter((searchKey) => {
      return searchKey !== "";
    });

    const filteredRecipes = recipeList.filter((recipe) => {
      return searchKeys.every((searchKey) => {
        return recipe.name.toLowerCase().includes(searchKey);
      });
    });
    value === ""
      ? setFilteredList(recipeList)
      : setFilteredList(filteredRecipes);
  };

  const handleToggle = (ev) => {
    const value = ev.target.value;

    const idx = checkFilters.indexOf(value);
    const newFilters = [...checkFilters];

    if (idx === -1) {
      newFilters.push(value);
    } else {
      newFilters.splice(idx, 1);
    }

    setCheckFilters(newFilters);
    handleCheckedFilters(newFilters);
  };

  const handleCheckedFilters = (filters) => {
    const filteredRecipes = recipeList.filter((recipe) => {
      return filters.every((filter) => {
        let ingredientsText = "";

        const ingredientsArr = recipe.ingredients.map((ingredient) => {
          return ingredient.Ingredient;
        });

        ingredientsArr.forEach((ingredient) => {
          ingredientsText = ingredientsText + " " + ingredient.toLowerCase();
        });

        return ingredientsText.includes(filter.toLowerCase());
      });
    });

    filters.length === 0
      ? setFilteredList(recipeList)
      : setFilteredList(filteredRecipes);
  };

  useEffect(() => {
    getRecipes().then((data) => {
      setRecipeList(data);
      setFilteredList(data);
      setTimeout(() => setLoadingStatus("loaded"), 1000);
    });
  }, []);

  return (
    <>
      {loadingStatus === "loaded" ? (
        <>
          <Search handleSearch={handleSearch} />
          <Checkbox handleToggle={handleToggle} checkFilters={checkFilters} />
          <Counter filteredList={filteredList} recipeList={recipeList} />
          <RecipeCards filteredList={filteredList} />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Home;
