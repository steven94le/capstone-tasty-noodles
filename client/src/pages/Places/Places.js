import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { mapStyles } from "./mapStyles";
import styled from "styled-components";
import getRestaurants from "../../api/getRestaurants";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];

const mapContainerStyle = {
  width: "40%",
  height: "50vh",
};

const centerMapPosition = { lat: 45.5019, lng: -73.5674 };

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Places = () => {
  const [restaurants, setRestaurants] = useState("");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  useEffect(() => {
    getRestaurants().then(setRestaurants);
  }, []);

  return isLoaded && restaurants ? (
    <>
      <StyledHeader>
        Noodle Town <span>🍜</span>
      </StyledHeader>
      <Wrapper>
        <GoogleMap
          zoom={13}
          center={centerMapPosition}
          mapContainerStyle={mapContainerStyle}
          options={options}
        >
          <Marker position={centerMapPosition}></Marker>
          {restaurants.map((restaurant, index) => {
            const lat1 = restaurant.geometry.location.lat;
            const lng1 = restaurant.geometry.location.lng;
            const restauPosition = { lat: lat1, lng: lng1 };
            return (
              <Marker
                position={restauPosition}
                key={`${restaurant}-${index + 1}`}
              ></Marker>
            );
          })}
        </GoogleMap>
        <RestaurantList>
          {restaurants.map((restaurant) => {
            return (
              <div key={restaurant.reference}>
                {restaurant.name} ({restaurant.rating}/5)
                <p>{restaurant.formatted_address}</p>
              </div>
            );
          })}
        </RestaurantList>
      </Wrapper>
    </>
  ) : (
    <></>
  );
};

const StyledHeader = styled.h1`
  padding: 1.25rem;
  font-size: 24px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const RestaurantList = styled.div`
  div {
    padding-bottom: 0.4rem;
  }
`;

export default Places;
