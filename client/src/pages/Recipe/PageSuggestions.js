import React from "react";
import ramen_shop from "./assets/ramen_shop.jpg";
import cooking_ramen from "./assets/cooking_ramen.jpg";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PageSuggestions = () => {
  return (
    <Wrapper>
      <Card>
        <Link to="/places">
          <img src={ramen_shop} alt="thumbnail" />
          <CardFont>👀 Discover Restaurants 👀</CardFont>
        </Link>
      </Card>
      <Card>
        <Link to="/inspo">
          <img src={cooking_ramen} alt="thumbnail" />
          <CardFont>🔥 Ramen Facts 🔥</CardFont>
        </Link>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  position: relative;
  width: auto;
  height: auto;

  :hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

const CardFont = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: white;
`;

export default PageSuggestions;
