import React from "react";
import styled from "styled-components";

const Search = ({ recipeList, filteredList, setFilteredList }) => {
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
  return (
    <>
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
    </>
  );
};

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.25rem;
  > input {
    width: 40%;
    height: 35px;
    text-align: center;
    font-size: 1rem;
    border: 0.25px solid grey;
  }
`;

const SearchCounter = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.25rem;
`;

export default Search;
