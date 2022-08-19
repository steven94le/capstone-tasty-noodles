import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const RecipeCards = ({ filteredList }) => {
  return (
    <Wrapper>
      {filteredList.map((recipe) => (
        <StyledLink to={`/recipe/${recipe.id}`} key={`${recipe.id}`}>
          <Card>
            <Thumbnail src={recipe.thumbnail} alt="thumbnail" />
            <div>
              <RecipeHeader>
                <p>{recipe.name}</p>
              </RecipeHeader>
              <RecipeDescription>
                <p>Ratings: {recipe.userRatings.score}</p>
                <InfoRow>
                  <p>Prep: {recipe.prepTimeMinutes} mins</p>
                  <p>Cook: {recipe.cookTimeMinutes} mins</p>
                </InfoRow>
                <InfoRow>
                  <p>{recipe.nutrition.calories} Calories</p>
                  <p>{recipe.ingredients.length} Ingredients</p>
                </InfoRow>
              </RecipeDescription>
            </div>
          </Card>
        </StyledLink>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const StyledLink = styled(Link)`
  color: black;
`;

const Card = styled.div`
  display: flex;
  margin: 2rem;
  padding: 1rem;
  width: 500px;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  transition: 300ms transform ease-in-out;
  background-color: white;
  gap: 1rem;

  :hover {
    cursor: pointer;
    border: 0.5px solid lightgrey;
    transform: scale(1.1);
  }
`;

const RecipeHeader = styled.div`
  p {
    font-weight: bold;
    font-size: 18px;
  }
`;

const RecipeDescription = styled.div`
  font-size: 16px;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 0.25rem;
`;

const InfoRow = styled.div`
  display: flex;
  p {
    border: 1px grey solid;
    border-radius: var(--border-radius);
    padding: 0.5rem 0;
    width: 9rem;
    text-align: center;
    background-color: var(--off-white);
  }

  p + p {
    margin-left: 1rem;
  }
`;

const Thumbnail = styled.img`
  width: 150px;
  height: 150px;
  border-radius: var(--border-radius);
`;

export default RecipeCards;
