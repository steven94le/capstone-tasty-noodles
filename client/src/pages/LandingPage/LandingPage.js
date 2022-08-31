import React from "react";
import styled, { keyframes } from "styled-components";
import ramenImg1 from "./assets/unsplash-ramen1.jpg";
import ramenImg2 from "./assets/unsplash-ramen2.jpg";

const LandingPage = () => {
  return (
    <Container>
      <Item1>
        <p>
          Welcome to<ObliqueFont> Tasty Noodles</ObliqueFont>! 😎 A food nook on
          the web for quickly finding
          <ObliqueFont> ~tasty~</ObliqueFont> noodle recipes 👀,
          <ObliqueFont> saving & sharing</ObliqueFont> all your favorite dishes
          ✌.
        </p>
      </Item1>
      <Item2>
        <StyledImg src={ramenImg2} alt="ramen" />
      </Item2>
      <Item3>
        <StyledImg src={ramenImg1} alt="ramen" />
      </Item3>
      <Item4>
        <p>lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      </Item4>
    </Container>
  );
};

const Container = styled.div`
  margin: 1rem 18rem;
  gap: 1rem 3rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(100px, auto);
  grid-template-areas:
    "text1 text1 photo2"
    "photo1 photo1 photo2"
    "photo1 photo1 text2";
  padding: 1rem;
  border-radius: 5px;

  p {
    font-size: 28px;
    font-family: var(--font-body);
  }
`;

const Item = styled.div``;

const Item1 = styled(Item)`
  grid-area: text1;
`;

const Item2 = styled(Item)`
  grid-area: photo1;
`;

const Item3 = styled(Item)`
  grid-area: photo2;
`;

const Item4 = styled(Item)`
  grid-area: text2;
`;

const fadeIn = keyframes`
0% {
  opacity: 0
}
100% {
  opacity: 1;
}
`;

const StyledImg = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 5px;
  animation: ${fadeIn} 2s;
`;

const ObliqueFont = styled.span`
  font-style: oblique;
`;

export default LandingPage;
