import React from "react";
import styled from "styled-components";

const Instructions = ({ recipe }) => {
  return (
    <Wrapper>
      <h1>Instructions</h1>
      <List>
        {recipe.instructions?.map((instruction, index) => (
          <li key={`${instruction}-${index}`}>{instruction.Step}</li>
        ))}
      </List>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  background: var(--off-white);
  border-radius: var(--border-radius);
  padding: 0.5rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);

  > p,
  li {
    list-style-type: decimal;
    margin: 0.5rem;
  }
`;

const List = styled.ol`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 15px;
`;

export default Instructions;
