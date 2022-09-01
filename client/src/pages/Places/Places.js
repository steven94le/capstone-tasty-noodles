import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { mapStyles } from "./mapStyles";
import styled from "styled-components";
import {
  getLatLongCoordinates,
  getRestaurants,
} from "../../api/getRestaurants";
import { MdRamenDining } from "react-icons/md";
import { useAuth0 } from "@auth0/auth0-react";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const mapContainerStyle = {
  width: "40%",
  height: "65vh",
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

//concordia university
//H3G1M8
//downtown vancouver
//V6Z2H7
//empire state building
//10001

const Places = () => {
  const { user } = useAuth0();
  const [restaurants, setRestaurants] = useState("");
  const [libraries] = useState(["places"]);
  const [centerMapPosition, setCenterMapPosition] = useState({
    lat: 45.5019,
    lng: -73.5674,
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const [postalCodeInput, setPostalCodeInput] = useState("");
  const [saveLocationMsg, setSaveLocationMsg] = useState("");

  const handleGetRestaurants = async (postalCodeInput) => {
    const latLongData = await getLatLongCoordinates(postalCodeInput);
    const latLongCoordinates = `${latLongData.results[0].geometry.location.lat},${latLongData.results[0].geometry.location.lng}`;
    const nearestRestaurants = await getRestaurants(latLongCoordinates);

    const nearestRestaurantsRanked = nearestRestaurants
      .filter((restaurant) => restaurant.rating)
      .sort((a, b) => (a.rating > b.rating ? -1 : 1));

    const nearestRestaurantsRankedTopTen = nearestRestaurantsRanked.slice(10);
    console.log(
      "nearestRestaurantsRankedTopTen:",
      nearestRestaurantsRankedTopTen
    );

    setCenterMapPosition({
      lat: latLongData.results[0].geometry.location.lat,
      lng: latLongData.results[0].geometry.location.lng,
    });
    setRestaurants(nearestRestaurantsRankedTopTen);
  };

  const handleSaveLocation = async (e, restaurant) => {
    e.preventDefault();

    const response = await fetch("/save-location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email.toLowerCase(),
        id: restaurant.place_id,
        name: restaurant.name,
        address: restaurant.formatted_address,
        rating: restaurant.rating,
      }),
    });

    const data = await response.json();
    const locationSaved = data.data;

    if (!locationSaved) {
      setSaveLocationMsg(data.message);
    } else {
      setSaveLocationMsg(data.message);
    }
  };

  return isLoaded ? (
    <>
      <StyledHeader>
        Noodle Town <span>🍜</span> Top Rated Ramen Restaurants Near You!
      </StyledHeader>
      <InputArea>
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
      </InputArea>
      {restaurants ? (
        <Wrapper>
          <GoogleMap
            zoom={14}
            center={centerMapPosition}
            mapContainerStyle={mapContainerStyle}
            options={options}
          >
            <Marker position={centerMapPosition}></Marker>
            {restaurants?.map((restaurant, index) => {
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
                  <MdRamenDining /> {restaurant.name} ({restaurant.rating}/5)
                  <p>{restaurant.formatted_address}</p>
                  <button
                    onClick={(e) => {
                      handleSaveLocation(e, restaurant);
                    }}
                  >
                    Save Location
                  </button>
                </div>
              );
            })}
          </RestaurantList>
        </Wrapper>
      ) : (
        <></>
      )}
    </>
  ) : (
    <></>
  );
};

const StyledHeader = styled.h1`
  padding: 1rem;
  font-size: 24px;
`;

const InputArea = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.25rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const RestaurantList = styled.div`
  div {
    padding: 0.4rem;
    border: 1px black solid;
    transition: 300ms transform ease-in-out;

    :hover {
      box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.5);
      cursor: pointer;
      transform: scale(1.05);
    }
  }
`;

export default Places;
