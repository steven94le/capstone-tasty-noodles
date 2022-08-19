import React, { useEffect, useState } from "react";
import getRecipes from "../api/getRecipes";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Home = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.value.toLowerCase();
    const filteredRecipes = recipeList.filter((recipe) => {
      return recipe.name.toLowerCase().includes(value);
    });
    value === ""
      ? setFilteredList(recipeList)
      : setFilteredList(filteredRecipes);
  };

  useEffect(() => {
    getRecipes().then((data) => {
      setRecipeList(data);
      setFilteredList(data);
    });
  }, []);

  return (
    <Wrapper>
      <StyledHeader>Tasty Noodles</StyledHeader>
      <NavBar>
        <p>Recipes</p>
        <p>Blogs</p>
        <p>About</p>
        <p>Profile</p>
      </NavBar>
      <SearchBar>
        <input
          type="search"
          placeholder="Search for a noodle recipe..."
          onChange={handleSearch}
        />
      </SearchBar>
      <SearchCounter>
        {filteredList.length} of {recipeList.length}
      </SearchCounter>
      <RecipeCards>
        {filteredList.map((recipe) => (
          <Card key={`${recipe.id}`} className="recipe">
            <StyledLink to={`/recipe/${recipe.id}`}>
              <p>{recipe.name}</p>
              <Thumbnail src={recipe.thumbnail} alt="thumbnail" />
              <p>Ratings: {recipe.userRatings.score}</p>
              <p>Prep Time: {recipe.prepTimeMinutes} minutes</p>
              <p>Cooking Time: {recipe.cookTimeMinutes} minutes</p>
              <p>Nutrition: {recipe.nutrition.calories} Calories</p>
              <p>Ingredients: {recipe.ingredients.length}</p>
            </StyledLink>
          </Card>
        ))}
      </RecipeCards>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  background-color: var(--yellow);
  height: 100%;
  width: 100%;
  overflow: auto;

  > div {
    margin: 1rem;
  }
`;

const StyledHeader = styled.h1`
  font-size: 48px;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;

  p {
    border: 1px solid black;
    border-radius: var(--border-radius);
    width: 75px;
    height: 20px;
    text-align: center;
  }
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;

  > input {
    width: 40%;
    height: 35px;
    text-align: center;
    font-size: 1rem;
  }
`;

const SearchCounter = styled.div`
  display: flex;
  justify-content: center;
`;

const RecipeCards = styled.div`
  padding: 0.25rem 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const StyledLink = styled(Link)`
  color: black;
`;

const Card = styled.div`
  border: 1px solid black;
  margin: 2rem;
  padding: 1rem;
  width: 250px;
  border-radius: var(--border-radius);

  :hover {
    cursor: pointer;
    border: 2px solid black;
    background-color: var(--off-white);
  }
`;

const Thumbnail = styled.img`
  width: 150px;
  height: 150px;
  border-radius: var(--border-radius);
`;

export default Home;
