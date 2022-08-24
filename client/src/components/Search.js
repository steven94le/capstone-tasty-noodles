import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Search = ({ handleSearch, recipeList }) => {
  const recipeIds = recipeList.map((recipe) => {
    return recipe.id;
  });

  const randomRecipe = recipeIds.sort(() => 0.5 - Math.random())[0];

  return (
    <Wrapper>
      <SearchBar>
        <input
          type="search"
          placeholder="Search for a noodle recipe..."
          onChange={handleSearch}
        />
      </SearchBar>
      <StyledButtons>
        <button>Let's Cook!</button>
        <Link to={`/recipe/${randomRecipe}`}>
          <button>Surprise Me!</button>
        </Link>
      </StyledButtons>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.25rem;
  gap: 1rem;

  input {
    width: 40%;
    height: 35px;
    text-align: center;
    font-size: 1rem;

    border-radius: 5px;
    padding: 0.5rem;
    border: none;
    outline: none;
    border: 1px solid lightgrey;
  }

  input:focus {
    box-shadow: 0 0 3px 1px grey;
  }
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
  gap: 1.5rem;

  button {
    background: var(--blue);
    color: white;
    border: none;
    outline: none;
    padding: 10px 25px;
    border-radius: 10px;
    cursor: pointer;
  }

  button:hover,
  button:focus {
    background: lightblue;
  }
`;

export default Search;
