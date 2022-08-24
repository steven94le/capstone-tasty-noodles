import React, { useEffect, useState } from "react";
import getRecipe from "../../api/getRecipe";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "../../components/Loader";
import Description from "./Description";
import SummaryData from "./SummaryData";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";

const Recipe = () => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const [loadingStatus, setLoadingStatus] = useState("loading");

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
          <Description recipe={recipe} />
          <hr />
          <SummaryData recipe={recipe} />
          <Ingredients recipe={recipe} />
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

export default Recipe;
