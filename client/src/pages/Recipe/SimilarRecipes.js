import React, { useContext } from "react";
import { RecipeListContext } from "../../components/provider/RecipeListContext";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SimilarRecipes = () => {
  const { recipeList } = useContext(RecipeListContext);
  const simiarRecipes = recipeList.sort(() => 0.5 - Math.random()).slice(0, 5);

  return (
    <Wrapper>
      <StyledHeader>Similar Recipes</StyledHeader>
      <List>
        {simiarRecipes?.map((recipe, index) => (
          <StyledLink to={`/recipe/${recipe.id}`} key={`${recipe}-${index}`}>
            <Recipe>
              <Thumbnail src={recipe.thumbnail} alt="thumbnail" />
              <RecipeName>{recipe.name}</RecipeName>
            </Recipe>
          </StyledLink>
        ))}
      </List>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 1rem;
`;

const StyledHeader = styled.div`
  padding-bottom: 1rem;
  font-size: 24px;
  display: flex;
  justify-content: center;
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

const StyledLink = styled(Link)`
  color: black;
`;

const Thumbnail = styled.img`
  height: 200px;
  width: 200px;
`;

const RecipeName = styled.div`
  font-size: 12px;
  max-width: 150px;
  max-height: 25px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.25rem;
`;

const List = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem 0;
`;

export default SimilarRecipes;
