import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Members = ({ members, recipes, locations, isProfileLoggedUser }) => {
  const loggedUserRecipeIds = recipes.map((recipe) => {
    return recipe.recipeId;
  });

  const loggedUserLocationIds = locations.map((location) => {
    return location.id;
  });

  return (
    <Wrapper>
      {members?.map((member) => (
        <User key={member.email}>
          <Link to={`/profile/${member.handle}`}>
            <UserImg src={member.picture} alt="member" />
          </Link>
          <UserName>@{member.handle}</UserName>
          {isProfileLoggedUser && (
            <>
              <ActivityText>
                Shared Saved Recipes:{" "}
                {
                  member.savedRecipes.filter((savedRecipe) => {
                    return loggedUserRecipeIds.includes(savedRecipe.recipeId);
                  }).length
                }{" "}
                🤩
              </ActivityText>
              <ActivityText>
                Shared Saved Location:{" "}
                {
                  member.savedLocations.filter((savedLocation) => {
                    return loggedUserLocationIds.includes(savedLocation.id);
                  }).length
                }{" "}
                🤩
              </ActivityText>
            </>
          )}
        </User>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const User = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const UserImg = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 50%;

  :hover {
    cursor: pointer;
  }
`;

const UserName = styled.div`
  font-size: 16px;
`;

const ActivityText = styled.p`
  font-size: 14px;
  text-align: center;
  width: 180px;
`;

export default Members;
