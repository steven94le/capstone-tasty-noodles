import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import {
  IoRestaurantOutline,
  IoFastFoodOutline,
  IoTimerOutline,
  IoList,
  IoHappyOutline,
  IoSadOutline,
  IoMedalOutline,
} from "react-icons/io5";

const RecipeCards = ({ currentRecipes }) => {
  return (
    <Wrapper>
      {currentRecipes.map((recipe) => {
        const {
          id,
          thumbnail,
          name,
          userRatings,
          prepTimeMinutes,
          cookTimeMinutes,
          nutrition,
          ingredients,
        } = recipe;

        return (
          <Card to={`/recipe/${id}`} key={id}>
            <Thumbnail src={thumbnail} alt="thumbnail" />
            <div>
              <RecipeHeader>
                <p>{name}</p>
              </RecipeHeader>
              <RecipeDescription>
                {userRatings.score ? (
                  userRatings.score >= 0.9 ? (
                    <Rating>
                      <span>
                        Rating: {Math.round(userRatings.score * 100) + "%"}
                      </span>
                      <IoHappyOutline />
                      <IoMedalOutline />
                    </Rating>
                  ) : (
                    <Rating>
                      <span>
                        Rating: {Math.round(userRatings.score * 100) + "%"}
                      </span>
                    </Rating>
                  )
                ) : (
                  <Rating>
                    <span>Rating: N/A</span>
                    <IoSadOutline />
                  </Rating>
                )}
                <InfoGroup>
                  <Info>
                    <IoRestaurantOutline />
                    {prepTimeMinutes ? (
                      <p>Prep: {prepTimeMinutes} mins</p>
                    ) : (
                      <p>Prep: N/A</p>
                    )}
                  </Info>
                  <Info>
                    <IoTimerOutline />
                    {cookTimeMinutes ? (
                      <p>Cook: {cookTimeMinutes} mins</p>
                    ) : (
                      <p>Cook: N/A</p>
                    )}
                  </Info>
                </InfoGroup>
                <InfoGroup>
                  <Info>
                    <IoFastFoodOutline />
                    {nutrition.calories ? (
                      <p>{nutrition.calories} Calories</p>
                    ) : (
                      <p>N/A Calories</p>
                    )}
                  </Info>
                  <Info>
                    <IoList />
                    <p>
                      {ingredients.length}{" "}
                      {ingredients.length === 1 ? "Ingredient" : "Ingredients"}
                    </p>
                  </Info>
                </InfoGroup>
              </RecipeDescription>
            </div>
          </Card>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: auto;
`;

const Card = styled(Link)`
  color: black;
  display: flex;
  margin: 1rem;
  padding: 1rem;
  width: 475px;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  transition: 300ms transform ease-in-out;
  background-color: white;
  gap: 1rem;

  :hover {
    cursor: pointer;
    border: 0.5px solid lightgrey;
    transform: scale(1.1);
    box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.5);
  }
`;

const RecipeHeader = styled.div`
  p {
    font-weight: bold;
    font-size: 17px;
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

const InfoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Rating = styled.div`
  display: flex;

  > span {
    padding-right: 0.25rem;
  }
`;

const Info = styled.div`
  display: flex;
  border: 1px grey solid;
  border-radius: var(--border-radius);
  padding: 0.5rem;
  width: 8.25rem;
  background-color: var(--off-white);
  font-size: 14px;

  > p {
    padding-left: 0.5rem;
  }
`;

const Thumbnail = styled.img`
  width: 150px;
  height: 150px;
  border-radius: var(--border-radius);
`;

export default RecipeCards;
