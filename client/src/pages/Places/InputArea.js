import React, { useState } from "react";
import styled from "styled-components";
import {
  getLatLongCoordinates,
  getRestaurants,
} from "../../api/getRestaurants";
import getRamenPhotos from "../../api/getRamenPhotos";

const InputArea = ({
  saveLocationMsg,
  setRestaurants,
  setCenterMapPosition,
  setBackgroundImage,
}) => {
  const [postalCodeInput, setPostalCodeInput] = useState("");
  const [distanceInputKM, setDistanceInputKM] = useState("1");

  const handleGetRestaurants = async (postalCodeInput, distanceInputKM) => {
    const latLongData = await getLatLongCoordinates(postalCodeInput);
    const city = latLongData.results[0]?.formatted_address.split(",")[0];

    if (latLongData.results.length === 0) {
      alert("No results near that area!");
    } else {
      const latLongCoordinates = `${latLongData.results[0].geometry.location.lat},${latLongData.results[0].geometry.location.lng}`;
      const nearestRestaurants = await getRestaurants(
        latLongCoordinates,
        distanceInputKM
      );

      const nearestRestaurantsRanked = nearestRestaurants
        .filter((restaurant) => restaurant.rating)
        .sort((a, b) => (a.rating > b.rating ? -1 : 1));

      const nearestRestaurantsRankedTopTen = nearestRestaurantsRanked.slice(10);

      setCenterMapPosition({
        lat: latLongData.results[0].geometry.location.lat,
        lng: latLongData.results[0].geometry.location.lng,
      });
      setRestaurants(nearestRestaurantsRankedTopTen);

      getRamenPhotos(city).then((data) => {
        setBackgroundImage(data.results?.[0].urls.regular);
      });
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
      />
      <select
        onChange={(e) => {
          setDistanceInputKM(e.target.value);
        }}
      >
        <option disabled value="">
          Select
        </option>
        <option value="1">1km</option>
        <option value="2">2km</option>
        <option value="5">5km</option>
        <option value="10">10km</option>
      </select>
      <button
        onClick={() => {
          handleGetRestaurants(postalCodeInput, distanceInputKM);
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
