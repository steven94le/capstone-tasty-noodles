import React, { useEffect, useState, useContext } from "react";
import getRecipe from "../../api/getRecipe";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "../../components/Loader";
import Description from "./Description";
import SummaryData from "./SummaryData";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import { useAuth0 } from "@auth0/auth0-react";
import SimilarRecipes from "./SimilarRecipes";
import Gallery from "./Gallery";
import PageSuggestions from "./PageSuggestions";
import { RecipeListContext } from "../../components/provider/RecipeListContext";

const Recipe = () => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const { user } = useAuth0();
  const [saveRecipeMsg, setSaveRecipeMsg] = useState("");
  const { recipeList } = useContext(RecipeListContext);
  const [similarRecipes, setSimilarRecipes] = useState();

  const { name, thumbnail } = recipe;

  const handleSaveRecipe = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Must log in to save recipe!");
      return;
    }

    const response = await fetch("/save-recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email.toLowerCase(),
        handle: user.nickname,
        recipeId: id,
        name: recipe.name,
        thumbnail: recipe.thumbnail,
      }),
    });

    const data = await response.json();
    const recipeSaved = data.data;

    if (!recipeSaved) {
      setSaveRecipeMsg(data.message);
    } else {
      setSaveRecipeMsg(data.message);
    }
  };

  useEffect(() => {
    getRecipe(id).then((data) => {
      try {
        setRecipe(data);
        setSimilarRecipes(
          recipeList.sort(() => 0.5 - Math.random()).slice(0, 5)
        );
        setTimeout(() => setLoadingStatus("loaded"), 1000);
      } catch (err) {
        console.log(err);
      }
    });
  }, [id, recipeList]);

  return (
    <>
      {loadingStatus === "loaded" ? (
        <Wrapper>
          <StyledHeader>
            <RecipeName>{name}</RecipeName>
            <SaveButton onClick={handleSaveRecipe}>Save Recipe</SaveButton>
            {saveRecipeMsg}
          </StyledHeader>
          <Description recipe={recipe} />
          <hr />
          <SummaryData recipe={recipe} />
          <Row>
            <StyledImage src={thumbnail} alt="thumbnail" />
            <Gallery />
            <Ingredients recipe={recipe} />
          </Row>
          <Instructions recipe={recipe} />
          <SimilarRecipes similarRecipes={similarRecipes} />
          <PageSuggestions />
        </Wrapper>
      ) : (
        <Loader />
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 15rem;

  > div {
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;

const StyledHeader = styled.div`
  padding-bottom: 0.5rem;
  font-size: 24px;
  display: flex;
  justify-content: center;
`;

const RecipeName = styled.h1``;

const SaveButton = styled.div`
  font-size: 14px;
  background: var(--blue);
  color: white;
  border: none;
  outline: none;
  padding: 5px 8px;
  border-radius: 10px;
  cursor: pointer;

  :hover {
    background: lightblue;
  }
`;

const Row = styled.div`
  display: flex;
`;

const StyledImage = styled.img`
  width: 25rem;
  height: 25rem;
  height: auto;
  border-radius: var(--border-radius);
`;

export default Recipe;
