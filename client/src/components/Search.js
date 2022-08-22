import React from "react";
import styled from "styled-components";

const Search = ({ handleSearch }) => {
  return (
    <>
      <SearchBar>
        <input
          type="search"
          placeholder="Search for a noodle recipe..."
          onChange={handleSearch}
        />
      </SearchBar>
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

export default Search;
