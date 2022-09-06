import React, { useState } from "react";
import styled from "styled-components";
import {
  getLatLongCoordinates,
  getRestaurants,
} from "../../api/getRestaurants";

const InputArea = ({
  saveLocationMsg,
  setRestaurants,
  setCenterMapPosition,
}) => {
  const [postalCodeInput, setPostalCodeInput] = useState("");

  const handleGetRestaurants = async (postalCodeInput) => {
    const latLongData = await getLatLongCoordinates(postalCodeInput);

    if (latLongData.results.length === 0) {
      alert("No results near that area!");
    } else {
      const latLongCoordinates = `${latLongData.results[0].geometry.location.lat},${latLongData.results[0].geometry.location.lng}`;
      const nearestRestaurants = await getRestaurants(latLongCoordinates);

      const nearestRestaurantsRanked = nearestRestaurants
        .filter((restaurant) => restaurant.rating)
        .sort((a, b) => (a.rating > b.rating ? -1 : 1));

      const nearestRestaurantsRankedTopTen = nearestRestaurantsRanked.slice(10);

      setCenterMapPosition({
        lat: latLongData.results[0].geometry.location.lat,
        lng: latLongData.results[0].geometry.location.lng,
      });
      setRestaurants(nearestRestaurantsRankedTopTen);
    }
  };

  return (
    <Wrapper>
      <input
        name="postalCode"
        type="text"
        placeholder="Input Postal Code"
        onChange={(e) => setPostalCodeInput(e.target.value)}
        required
        maxLength="7"
      ></input>
      <button
        onClick={() => {
          handleGetRestaurants(postalCodeInput);
        }}
      >
        Enter
      </button>
      {saveLocationMsg}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.25rem;
`;

export default InputArea;
