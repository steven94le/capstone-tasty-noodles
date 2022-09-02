import React, { useEffect, useState, useContext } from "react";
import getRecipes from "../../api/getRecipes";
import Checkbox from "./Checkbox";
import Counter from "./Counter";
import Search from "./Search";
import Loader from "../../components/Loader";
import RecipeCards from "./RecipeCards";
import { useToggle } from "../../components/hooks/Hooks";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { RecipeListContext } from "../../components/provider/RecipeListContext";
import Pagination from "./Pagination";
import DropdownSort from "./DropdownSort";

const Home = () => {
  const { recipeList, setRecipeList } = useContext(RecipeListContext);
  const [checkFilters, setCheckFilters] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [isSearchBarToggled, toggle] = useToggle();

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(10);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredList.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const recipeIds = recipeList.map((recipe) => {
    return recipe.id;
  });

  const randomRecipe = recipeIds.sort(() => 0.5 - Math.random())[0];

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
  }, [setRecipeList]);

  return (
    <>
      {loadingStatus === "loaded" ? (
        <>
          <ButtonArea>
            {isSearchBarToggled ? (
              <StyledButton
                onClick={() => {
                  toggle();
                  setFilteredList(recipeList);
                }}
              >
                Use Filters
              </StyledButton>
            ) : (
              <StyledButton
                onClick={() => {
                  toggle();
                  setFilteredList(recipeList);
                  setCheckFilters([]);
                }}
              >
                Use Search
              </StyledButton>
            )}
            <Link to={`/recipe/${randomRecipe}`}>
              <StyledButton>Surprise Me!</StyledButton>
            </Link>
          </ButtonArea>
          {isSearchBarToggled && (
            <Search handleSearch={handleSearch} recipeList={recipeList} />
          )}
          {!isSearchBarToggled && (
            <Checkbox handleToggle={handleToggle} checkFilters={checkFilters} />
          )}
          <Counter filteredList={filteredList} recipeList={recipeList} />
          <DropdownSort
            filteredList={filteredList}
            setFilteredList={setFilteredList}
            setCurrentPage={setCurrentPage}
          />
          <Pagination
            filteredList={filteredList}
            recipesPerPage={recipesPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <RecipeCards currentRecipes={currentRecipes} />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const StyledButton = styled.button`
  background: var(--blue);
  width: 10em;
  color: white;
  border: none;
  outline: none;
  padding: 10px 25px;
  border-radius: 10px;
  cursor: pointer;

  :hover {
    background: lightblue;
  }
`;

export default Home;
