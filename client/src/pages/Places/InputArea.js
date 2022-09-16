import React, { useState } from "react";
import styled from "styled-components";
import {
  getLatLongCoordinates,
  getRestaurants,
} from "../../api/getRestaurants";
import getPhotos from "../../api/getPhotos";

const InputArea = ({
  saveLocationMsg,
  setRestaurants,
  setCenterMapPosition,
  setBackgroundImage,
  setRestaurantDetails,
  setSaveLocationMsg,
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
      setRestaurantDetails("");
      setSaveLocationMsg("");

      getPhotos(city).then((data) => {
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
      <StyledButton
        onClick={() => {
          handleGetRestaurants(postalCodeInput, distanceInputKM);
        }}
      >
        Enter
      </StyledButton>
      {saveLocationMsg && <SaveMsg>{saveLocationMsg}</SaveMsg>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.75rem;
  gap: 0.25rem;
`;

const SaveMsg = styled.p`
  margin: 2px 0 0 20px;
  color: white;
  background: var(--blue);
  padding: 0.25rem 0.5rem;
`;

const StyledButton = styled.button`
  color: white;
  background: var(--blue);
  border: none;
  outline: none;

  :hover {
    cursor: pointer;
  }
`;

export default InputArea;
