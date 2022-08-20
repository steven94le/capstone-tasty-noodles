import React, { useEffect, useState } from "react";
import getRecipe from "../api/getRecipe";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Recipe = () => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();

  useEffect(() => {
    let ignore = false;

    getRecipe(id).then((data) => {
      if (!ignore) {
        setRecipe(data);
      }
    });

    return () => {
      ignore = true;
    };
  }, [id]);

  console.log("recipe:", recipe);
  return (
    <Wrapper>
      <hr />
      <RecipeName>{recipe.name}</RecipeName>
      <Subinfo>
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
            pariatur.
          </p>
        )}
      </Subinfo>
      <hr />
      <FirstRow>
        <StyledImage src={recipe.thumbnail} alt="thumbnail" />
        <Summary>
          <SummaryTop>
            <p>Score: {recipe.userRatings?.score}</p>
            <p>Upvotes: {recipe.userRatings?.count_positive}</p>
            <p>Downvotes: {recipe.userRatings?.count_negative}</p>
            <p># of Servings: {recipe.numServings}</p>
            <p>Prep Time: {recipe.prepTimeMinutes} mins</p>
            <p>Cooking Time: {recipe.cookTimeMinutes} mins</p>
          </SummaryTop>
          <SummaryBottom>
            <>
              <p>Nutritional Information</p>
              <p>Calories: {recipe.nutrition.calories}</p>
              <p>Carbohydrates: {recipe.nutrition.carbohydrates}g</p>
              <p>Fat: {recipe.nutrition.fat}g</p>
              <p>Protein: {recipe.nutrition.protein}g</p>
              <p>Fiber: {recipe.nutrition.fiber}g</p>
              <p>Sugar: {recipe.nutrition.sugar}g</p>
            </>
          </SummaryBottom>
        </Summary>
      </FirstRow>
      <SecondRow>
        <Ingredients>
          <h1>Ingredients</h1>
          <ul>
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={`${ingredient}-${index}`}>{ingredient.Ingredient}</li>
            ))}
          </ul>
        </Ingredients>
        <Instructions>
          <h1>Instructions</h1>
          <ol>
            {recipe.instructions?.map((instruction, index) => (
              <li key={`${instruction}-${index}`}>{instruction.Step}</li>
            ))}
          </ol>
        </Instructions>
      </SecondRow>
      <hr />
      <RecipeName>Gallery</RecipeName>
      <ThirdRow>
        <StyledImage
          src={recipe.thumbnail}
          alt="thumbnail"
          style={{ transform: "scaleX(-1)", opacity: "0.8" }}
        />
        <StyledImage
          src={recipe.thumbnail}
          alt="thumbnail"
          style={{ transform: "scaleX(-1)", opacity: "0.8" }}
        />
        <StyledImage
          src={recipe.thumbnail}
          alt="thumbnail"
          style={{ transform: "scaleX(-1)", opacity: "0.8" }}
        />
      </ThirdRow>
      <hr />
      <RecipeName>Check Out Similar Recipes</RecipeName>

      <FourthRow>
        <StyledImage
          src={recipe.thumbnail}
          alt="thumbnail"
          style={{ transform: "scaleX(-1)" }}
        />
        <StyledImage
          src={recipe.thumbnail}
          alt="thumbnail"
          style={{ transform: "scaleX(-1)" }}
        />
        <StyledImage
          src={recipe.thumbnail}
          alt="thumbnail"
          style={{ transform: "scaleX(-1)" }}
        />
      </FourthRow>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 5rem;

  > div {
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;

const RecipeName = styled.h1`
  padding: 1rem 0;
  font-size: 24px;
`;

const Subinfo = styled.div`
  display: flex;
  justify-content: space-around;
`;

const FirstRow = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const StyledImage = styled.img`
  width: 20rem;
  height: auto;
  border-radius: var(--border-radius);
`;

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  gap: 1.5rem;
`;

const SummaryTop = styled.div`
  display: flex;
  gap: 1rem;
  p {
    border: 1px black solid;
    border-radius: var(--border-radius);
    padding: 5px;
  }
`;

const SummaryBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  padding: 10px;
`;

const SecondRow = styled.div`
  display: flex;
  gap: 3rem;
`;

const ThirdRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
`;

const FourthRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
`;

const Textbox = styled.div`
  background: var(--off-white);
  border-radius: var(--border-radius);
  padding: 0.5rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);

  > p,
  li {
    margin: 0.5rem;
  }
`;

const Ingredients = styled(Textbox)`
  width: 40rem;
`;

const Instructions = styled(Textbox)`
  display: flex;
  flex-direction: column;
  width: auto;
`;

export default Recipe;
