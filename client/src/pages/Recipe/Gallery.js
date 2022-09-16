import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getPhotos from "../../api/getPhotos";

const Gallery = () => {
  const [photos, setPhotos] = useState();
  const gallery = photos?.results.sort(() => 0.5 - Math.random()).slice(0, 4);

  useEffect(() => {
    getPhotos("ramen").then(setPhotos);
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
  justify-content: space-between;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  transition: transform 400ms;

  :hover {
    transform: scale(2.25);
  }
`;
export default React.memo(Gallery);
