import React, { useEffect, useState } from "react";
import getRecipes from "../../api/getRecipes";
import styled from "styled-components";
import Search from "./Search";
import RecipeCards from "./RecipeCards";
import NavBar from "../../components/NavBar";

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
    <Wrapper>
      <StyledHeader>Tasty Noodles</StyledHeader>
      <NavBar />
      <Search
        recipeList={recipeList}
        filteredList={filteredList}
        setFilteredList={setFilteredList}
      />
      <RecipeCards filteredList={filteredList} />
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
`;

const StyledHeader = styled.h1`
  font-size: 48px;
`;

export default Home;
