import React from "react";
import styled from "styled-components";

const Search = ({ handleSearch }) => {
  return (
    <Wrapper>
      <SearchBar>
        <input
          type="search"
          placeholder="Quick search for a noodle recipe name..."
          onChange={handleSearch}
        />
      </SearchBar>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
  gap: 0.5rem;

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

export default Search;
