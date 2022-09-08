import React from "react";
import styled from "styled-components";

const Ingredients = ({ recipe }) => {
  return (
    <Wrapper>
      <h1>Ingredients</h1>
      <List>
        {recipe.ingredients?.map((ingredient, index) => {
          return (
            ingredient.Ingredient !== "n/a" && (
              <li key={`${ingredient}-${index}`}>{ingredient.Ingredient}</li>
            )
          );
        })}
      </List>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: var(--off-white);
  border-radius: var(--border-radius);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px;

  li {
    margin: 0.1rem;
  }
`;

export default Ingredients;
