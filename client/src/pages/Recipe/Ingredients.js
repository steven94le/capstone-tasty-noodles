import React from "react";
import styled from "styled-components";

const Ingredients = ({ recipe }) => {
  return (
    <Wrapper>
      <StyledImage src={recipe.thumbnail} alt="thumbnail" />
      <Textbox>
        <h1>Ingredients</h1>
        <List>
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={`${ingredient}-${index}`}>{ingredient.Ingredient}</li>
          ))}
        </List>
      </Textbox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledImage = styled.img`
  width: 30rem;
  height: auto;
  border-radius: var(--border-radius);
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space around;
`;

const Textbox = styled.div`
  background: var(--off-white);
  border-radius: var(--border-radius);
  padding: 0.5rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  width: 40rem;
  text-align: center;

  > p,
  li {
    margin: 1rem;
  }
`;

export default Ingredients;
