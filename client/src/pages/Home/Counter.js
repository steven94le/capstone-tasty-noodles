import React from "react";
import styled from "styled-components";

const Counter = ({ filteredList, recipeList }) => {
  return (
    <Wrapper>
      <p>
        🍜
        {filteredList?.length} of {recipeList?.length} recipes 🍜
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default Counter;
