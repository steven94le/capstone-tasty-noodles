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

const CURRENT_PAGE_DEFAULT = 1;
const RECIPES_PER_PAGE_DEFAULT = 10;

const Home = () => {
  const { recipeList, setRecipeList } = useContext(RecipeListContext);
  const [checkFilters, setCheckFilters] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [isSearchBarToggled, toggle] = useToggle();

  const [currentPage, setCurrentPage] = useState(CURRENT_PAGE_DEFAULT);
  const [recipesPerPage] = useState(RECIPES_PER_PAGE_DEFAULT);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredList.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const recipeIds = recipeList?.map((recipe) => {
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
      try {
        setRecipeList(data);
        setFilteredList(data);
        setTimeout(() => setLoadingStatus("loaded"), 1000);
      } catch (err) {
        console.log(err);
      }
    });
  }, [setRecipeList]);

  return (
    <>
      {loadingStatus === "loaded" ? (
        <Wrapper>
          <LeftSide>
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
            {!isSearchBarToggled && (
              <Checkbox
                handleToggle={handleToggle}
                checkFilters={checkFilters}
              />
            )}

            {isSearchBarToggled && (
              <Search handleSearch={handleSearch} recipeList={recipeList} />
            )}
          </LeftSide>
          <RightSide>
            <RecipeCards currentRecipes={currentRecipes} />
            {filteredList.length === 0 && (
              <NoRecipeMsg>
                <p>No Recipes Currently Available With These Ingredients 😢</p>
              </NoRecipeMsg>
            )}
          </RightSide>
        </Wrapper>
      ) : (
        <Loader />
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding: 1rem 6rem;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 20vw;
  height: max-content;
  gap: 2rem;
  padding: 0.2rem;
  background: var(--off-white);
`;

const RightSide = styled.div`
  width: 80vw;
  height: 75vh;
  overflow: auto;
`;

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

const NoRecipeMsg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default Home;
