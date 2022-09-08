import React from "react";
import styled from "styled-components";

const SummaryData = ({ recipe }) => {
  return (
    <Wrapper>
      <Row>
        <>
          {recipe.prepTimeMinutes === null || recipe.prepTimeMinutes === 0 ? (
            <p>Prep: N/A</p>
          ) : (
            <p>Prep: {recipe.prepTimeMinutes} mins</p>
          )}
          {recipe.cookTimeMinutes === null || recipe.cookTimeMinutes === 0 ? (
            <p>Cook: N/A</p>
          ) : (
            <p>Cook: {recipe.cookTimeMinutes} mins</p>
          )}
          <p>Serves: {recipe.numServings}</p>
        </>
        {Object.keys(recipe.nutrition).length !== 0 && (
          <>
            <p>Calories: {recipe.nutrition?.calories}</p>
            <p>Carbs: {recipe.nutrition?.carbohydrates}g</p>
            <p>Fat: {recipe.nutrition?.fat}g</p>
            <p>Protein: {recipe.nutrition?.protein}g</p>
            <p>Fiber: {recipe.nutrition?.fiber}g</p>
            <p>Sugar: {recipe.nutrition?.sugar}g</p>
          </>
        )}
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  div {
    margin: 5px 0 5px 0;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  height: auto;
  background: white;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
`;

export default SummaryData;
