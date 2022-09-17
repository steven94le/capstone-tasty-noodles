import React from "react";
import styled from "styled-components";

const Bio = ({ userInfo, recipes, locations }) => {
  const { picture, handle } = userInfo;
  const savedRecipesCount = recipes?.length;
  const savedLocationsCount = locations?.length;

  return (
    <>
      <h1>Profile</h1>
      <hr />
      <Wrapper>
        <UserImg src={picture} alt="profile" />
        <Description>
          <p>@{handle}</p>
          <p>Saved Recipes: {savedRecipesCount}</p>
          <p>Saved Locations: {savedLocationsCount}</p>
        </Description>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 30px;
`;

const UserImg = styled.img`
  border-radius: 50%;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export default Bio;
