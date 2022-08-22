import React from "react";
import styled from "styled-components";

const Counter = ({ filteredList, recipeList }) => {
  return (
    <Wrapper>
      <p>
        {filteredList?.length} of {recipeList?.length}
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.25rem;
`;

export default Counter;
