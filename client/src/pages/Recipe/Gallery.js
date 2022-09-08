import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getRamenPhotos from "../../api/getRamenPhotos";

const Gallery = () => {
  const [photos, setPhotos] = useState();
  const gallery = photos?.results.sort(() => 0.5 - Math.random()).slice(0, 4);

  useEffect(() => {
    getRamenPhotos().then(setPhotos);
  }, []);

  return (
    <Wrapper>
      {gallery?.map((photo) => (
        <div key={photo?.id}>
          <Image src={photo?.urls.thumb} alt="photo" />
        </div>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
`;

const Image = styled.img`
  width: 75px;
  height: 100px;
  border-radius: 5px;

  transition: transform 400ms;

  :hover {
    transform: scale(2.25);
  }
`;
export default Gallery;
