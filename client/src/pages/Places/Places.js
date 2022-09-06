import React, { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import styled from "styled-components";
import RestaurantList from "./RestaurantList";
import InputArea from "./InputArea";
import RestaurantMap from "./RestaurantMap";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const Places = () => {
  const [restaurants, setRestaurants] = useState("");
  const [libraries] = useState(["places"]);
  const [centerMapPosition, setCenterMapPosition] = useState({});

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const [saveLocationMsg, setSaveLocationMsg] = useState("");
  const [activeMarker, setActiveMarker] = useState(null);

  return (
    isLoaded && (
      <>
        <StyledHeader>
          Noodle Town <span>🍜</span> Top Rated Ramen Restaurants Near You!
        </StyledHeader>
        <InputArea
          saveLocationMsg={saveLocationMsg}
          setRestaurants={setRestaurants}
          setCenterMapPosition={setCenterMapPosition}
        />
        {restaurants && (
          <Wrapper>
            <RestaurantMap
              centerMapPosition={centerMapPosition}
              restaurants={restaurants}
              activeMarker={activeMarker}
              setActiveMarker={setActiveMarker}
            />
            <RestaurantList
              restaurants={restaurants}
              setSaveLocationMsg={setSaveLocationMsg}
              setCenterMapPosition={setCenterMapPosition}
              setActiveMarker={setActiveMarker}
            />
          </Wrapper>
        )}
      </>
    )
  );
};

const StyledHeader = styled.h1`
  padding: 1rem;
  font-size: 24px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export default Places;
