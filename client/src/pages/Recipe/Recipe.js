import React, { useEffect, useState } from "react";
import getRecipe from "../../api/getRecipe";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "../../components/Loader";
import Description from "./Description";
import SummaryData from "./SummaryData";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import { useAuth0 } from "@auth0/auth0-react";

const Recipe = () => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const { user } = useAuth0();

  const handleSaveRecipe = (e) => {
    e.preventDefault();
    if (user) {
      console.log("user is signed in");
    } else {
      alert("Please sign in to save recipes");
    }
  };

  useEffect(() => {
    let ignore = false;

    getRecipe(id).then((data) => {
      if (!ignore) {
        setRecipe(data);
        setTimeout(() => setLoadingStatus("loaded"), 1000);
      }
    });

    return () => {
      ignore = true;
    };
  }, [id]);

  return (
    <>
      {loadingStatus === "loaded" ? (
        <Wrapper>
          <StyledHeader>
            <RecipeName>{recipe.name}</RecipeName>
            <SaveButton onClick={handleSaveRecipe}>Save Recipe</SaveButton>
          </StyledHeader>
          <Description recipe={recipe} />
          <hr />
          <SummaryData recipe={recipe} />
          <Row>
            <StyledImage src={recipe.thumbnail} alt="thumbnail" />
            <Ingredients recipe={recipe} />
          </Row>
          <Instructions recipe={recipe} />
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
  border-radius: var(--border-radius);
`;

export default Recipe;
