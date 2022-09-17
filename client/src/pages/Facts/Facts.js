import React, { useState, useEffect } from "react";
import getPhotos from "../../api/getPhotos";
import getRandomQuote from "../../api/getRandomQuote";
import getRamenFacts from "../../api/getRamenFacts";
import styled, { keyframes } from "styled-components";
import { revealSection } from "./utils";

const Inspo = () => {
  const [ramenPhotos, setRamenPhotos] = useState();
  const [randomQuote, setRandomQuote] = useState();
  const [ramenFacts, setRamenFacts] = useState();

  const randomizedRamenPhotos = ramenPhotos?.results.sort(
    () => 0.5 - Math.random()
  );

  const randomizedRamenFacts = ramenFacts?.sort(() => 0.5 - Math.random());

  window.addEventListener("scroll", revealSection);
  revealSection();

  useEffect(() => {
    getPhotos("ramen").then(setRamenPhotos);
    getRandomQuote().then(setRandomQuote);
    getRamenFacts().then(setRamenFacts);
  }, []);

  return (
    <Wrapper>
      <Section>
        <Quote>
          {randomQuote?.content} - {randomQuote?.author}
        </Quote>
        <StyledH1>Scroll Down For Some Ramen Facts 🧐</StyledH1>
      </Section>
      <Section>
        <RevealDiv className="fade-in">
          <TextContainer>
            {randomizedRamenFacts?.slice(0, 3).map((fact) => (
              <div key={fact?.Fact}>
                <h3>{fact?.Fact}</h3>
              </div>
            ))}
          </TextContainer>
          <ImagesWrapper>
            {randomizedRamenPhotos?.slice(0, 3).map((photo) => (
              <div key={photo?.id}>
                <Image src={photo?.urls.small} alt="ramen" />
              </div>
            ))}
          </ImagesWrapper>
        </RevealDiv>
      </Section>
      <Section>
        <RevealDiv className="fade-in">
          <TextContainer>
            {randomizedRamenFacts?.slice(3, 6).map((fact) => (
              <div key={fact?.Fact}>
                <h3>{fact?.Fact}</h3>
              </div>
            ))}
          </TextContainer>
          <ImagesWrapper>
            {randomizedRamenPhotos?.slice(3, 6).map((photo) => (
              <div key={photo?.id}>
                <Image src={photo?.urls.small} alt="ramen" />
              </div>
            ))}
          </ImagesWrapper>
        </RevealDiv>
      </Section>
      <Section>
        <RevealDiv className="fade-in">
          <TextContainer>
            {randomizedRamenFacts?.slice(6, 9).map((fact) => (
              <div key={fact?.Fact}>
                <h3>{fact?.Fact}</h3>
              </div>
            ))}
          </TextContainer>
          <ImagesWrapper>
            {randomizedRamenPhotos?.slice(6, 9).map((photo) => (
              <div key={photo?.id}>
                <Image src={photo?.urls.small} alt="ramen" />
              </div>
            ))}
          </ImagesWrapper>
        </RevealDiv>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: max-content;
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 85vh;

  :nth-child(1) {
    flex-direction: column;
    gap: 2rem;
  }

  :nth-child(1),
  :nth-child(3) {
    color: var(--off-white);
    background: var(--blue-gradient);
  }

  :nth-child(2),
  :nth-child(4) {
    color: var(--blue);
    background: var(--grey-gradient);
  }
`;

const StyledH1 = styled.h1`
  font-size: 28px;
  margin: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
  font-size: 10px;

  div {
    margin: 20px;
    padding: 20px;
  }

  div > h3 {
    font-size: 32px;
    margin-bottom: 10px;
    height: 100px;
    width: 425px;
  }
`;

const RevealDiv = styled.div`
  transform: translateY(100px);
  opacity: 0;
  transition: 1s;

  &.active {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeInAnimation = keyframes`
0% {opacity: 0}
100% {opacity: 1}
`;

const Quote = styled.h3`
  font-size: 18px;
  font-style: italic;
  animation: ${fadeInAnimation} 1.5s;
`;

const ImagesWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Image = styled.img`
  transition: opacity 400ms;
  border-radius: 5px;

  height: 300px;
  width: 450px;

  :hover {
    opacity: 0.8;
  }
`;

export default Inspo;
