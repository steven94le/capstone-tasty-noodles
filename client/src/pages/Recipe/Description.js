import React from "react";
import styled from "styled-components";

const Description = ({ recipe }) => {
  return (
    <div>
      <RecipeInfo>
        {recipe.description ? (
          <>
            <p>{recipe.description}</p>
          </>
        ) : (
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        )}
      </RecipeInfo>
    </div>
  );
};

const RecipeInfo = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 18px;
`;

export default Description;
