import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SavedRecipes = ({
  userInfo,
  members,
  recipes,
  setRecipes,
  isProfileLoggedUser,
}) => {
  const { handle, savedRecipes } = userInfo;
  const savedRecipesCount = recipes?.length;

  const handleRemoveSavedRecipe = async (e) => {
    e.preventDefault();
    const deletedRecipeId = e.target.value;

    await fetch("/delete-saved-recipe", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userInfo.email.toLowerCase(),
        handle,
        deletedRecipeId,
      }),
    });

    setRecipes(recipes.filter((recipe) => recipe.recipeId !== deletedRecipeId));
  };

  const handleSearch = (ev) => {
    ev.preventDefault();
    const value = ev.target.value.toLowerCase();

    const searchKeys = value.split(" ").filter((searchKey) => {
      return searchKey !== "";
    });

    const filteredSavedRecipes = recipes.filter((recipe) => {
      return searchKeys.every((searchKey) => {
        return recipe.name.toLowerCase().includes(searchKey);
      });
    });
    value === "" ? setRecipes(savedRecipes) : setRecipes(filteredSavedRecipes);
  };

  return (
    <Wrapper>
      <h1>Saved Recipes ({savedRecipesCount})</h1>{" "}
      <StyledInput
        type="search"
        placeholder="Search recipe name"
        onChange={handleSearch}
      />
      <hr />
      {recipes?.map((recipe) => (
        <StyledLink to={`/recipe/${recipe.recipeId}`} key={recipe.recipeId}>
          <Recipe>
            {isProfileLoggedUser && (
              <StyledButton
                value={recipe.recipeId}
                onClick={handleRemoveSavedRecipe}
              >
                X
              </StyledButton>
            )}
            <Thumbnail src={recipe.thumbnail} alt="thumbnail" />
            <RecipeName>{recipe.name}</RecipeName>

            {members?.map((member) =>
              member.savedRecipes.map((memberSavedRecipe) => {
                return memberSavedRecipe.recipeId === recipe.recipeId ? (
                  <ActivityText key={memberSavedRecipe.recipeId}>
                    🤩 @{member.handle} saved this!
                  </ActivityText>
                ) : (
                  <></>
                );
              })
            )}
          </Recipe>
        </StyledLink>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  justify-content: center;
`;

const StyledInput = styled.input`
  width: 200px;
`;

const StyledLink = styled(Link)`
  color: black;
`;

const Recipe = styled.div`
  position: relative;
  border: 1px black solid;
  max-width: 250px;
  max-height: 250px;
  border-radius: var(--border-radius);
  background: var(--off-white);
  padding: 10px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  transition: 300ms transform ease-in-out;

  :hover {
    border: 0.5px solid lightgrey;
    transform: scale(1.1);
    box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.5);
  }
`;

const Thumbnail = styled.img`
  height: 175px;
  width: 175px;
`;

const RecipeName = styled.div`
  font-size: 14px;
  max-width: 150px;
  max-height: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.25rem;
`;

const ActivityText = styled.p`
  font-size: 13px;
  width: max-content;
  font-weight: bold;
  color: blue;
`;

const StyledButton = styled.button`
  position: absolute;
  right: 0;
  margin-right: 10px;
  width: 25px;
  height: 25px;

  :hover {
    cursor: pointer;
  }
`;

export default SavedRecipes;
