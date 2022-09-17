import React, { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import styled from "styled-components";
import RestaurantList from "./RestaurantList";
import InputArea from "./InputArea";
import RestaurantMap from "./RestaurantMap";
import ramen_restaurant from "./assets/ramen_restaurant.jpg";
import RestaurantDetails from "./RestaurantDetails";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const Places = () => {
  const [restaurants, setRestaurants] = useState("");
  const [libraries] = useState(["places"]);
  const [centerMapPosition, setCenterMapPosition] = useState({});

  //loads google map and the places library
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const [saveLocationMsg, setSaveLocationMsg] = useState("");
  const [activeMarker, setActiveMarker] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [restaurantDetails, setRestaurantDetails] = useState("");

  return (
    isLoaded && (
      <Wrapper
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <StyledHeader>Top Rated Ramen Restaurants Near You! 🍜</StyledHeader>
        <InputArea
          saveLocationMsg={saveLocationMsg}
          setRestaurants={setRestaurants}
          setCenterMapPosition={setCenterMapPosition}
          setBackgroundImage={setBackgroundImage}
          setRestaurantDetails={setRestaurantDetails}
          setSaveLocationMsg={setSaveLocationMsg}
        />
        {!restaurants && (
          <StyledImg>
            <img src={ramen_restaurant} alt="ramen restaurant" />
          </StyledImg>
        )}
        {restaurants && (
          <GoogleWrapper>
            <RestaurantMap
              centerMapPosition={centerMapPosition}
              restaurants={restaurants}
              activeMarker={activeMarker}
              setActiveMarker={setActiveMarker}
              restaurantDetails={restaurantDetails}
            />
            <RestaurantList
              restaurants={restaurants}
              setSaveLocationMsg={setSaveLocationMsg}
              setCenterMapPosition={setCenterMapPosition}
              setActiveMarker={setActiveMarker}
              setRestaurantDetails={setRestaurantDetails}
            />
            {restaurantDetails && (
              <RestaurantDetails restaurantDetails={restaurantDetails} />
            )}
          </GoogleWrapper>
        )}
      </Wrapper>
    )
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 78vh;
`;

const StyledHeader = styled.div`
  padding: 1rem;
  font-size: 24px;
  color: black;
  display: flex;
  justify-content: center;
  background: var(--off-white);
`;

const GoogleWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const StyledImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

export default Places;
