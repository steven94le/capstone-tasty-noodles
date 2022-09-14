import React, { useState, useEffect } from "react";
import getPhotos from "../api/getPhotos";
import getRandomQuote from "../api/getRandomQuote";
import styled from "styled-components";

const Inspo = () => {
  const [ramenPhotos, setRamenPhotos] = useState();
  const [randomQuote, setRandomQuote] = useState();
  const randomizedRamenPhotos = ramenPhotos?.results
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
  console.log("randomizedRamenPhotos:", randomizedRamenPhotos);

  useEffect(() => {
    getPhotos("ramen").then(setRamenPhotos);
    getRandomQuote().then(setRandomQuote);
  }, []);

  return (
    <Wrapper>
      <p>
        {randomQuote?.content} - {randomQuote?.author}
      </p>
      <br></br>
      <ImagesWrapper>
        {randomizedRamenPhotos?.map((photo) => (
          <div key={photo?.id}>
            <Image src={photo?.urls.small} alt="ramen" />
          </div>
        ))}
      </ImagesWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ImagesWrapper = styled.div``;

const Image = styled.img`
  transition: opacity 400ms;

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export default Inspo;
