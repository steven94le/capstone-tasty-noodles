import React from "react";
import styled from "styled-components";

const SummaryData = ({ recipe }) => {
  return (
    <Wrapper>
      <Row>
        <>
          {recipe.prepTimeMinutes === null ? (
            <p>PREP: N/A</p>
          ) : (
            <p>PREP: {recipe.prepTimeMinutes} MINS</p>
          )}
          {recipe.cookTimeMinutes === null ? (
            <p>COOK: N/A</p>
          ) : (
            <p>COOK: {recipe.cookTimeMinutes} MINS</p>
          )}
          <p>SERVES: {recipe.numServings}</p>
        </>
      </Row>
      <Row>
        {Object.keys(recipe.nutrition).length !== 0 && (
          <>
            <p>Calories: {recipe.nutrition?.calories}</p>
            <p>Carbohydrates: {recipe.nutrition?.carbohydrates}g</p>
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
    margin: 10px 0 10px 0;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  height: auto;
`;

export default SummaryData;
