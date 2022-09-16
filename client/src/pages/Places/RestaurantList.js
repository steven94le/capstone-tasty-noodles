import React from "react";
import { MdRamenDining } from "react-icons/md";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { getRestaurantDetails } from "../../api/getRestaurants";

import { BiBookmark } from "react-icons/bi";

const RestaurantList = ({
  restaurants,
  setSaveLocationMsg,
  setCenterMapPosition,
  setActiveMarker,
  setRestaurantDetails,
}) => {
  const { user } = useAuth0();

  const handleSaveLocation = async (e, restaurant) => {
    e.preventDefault();

    if (!user) {
      alert("User must log in to save location!");
      return;
    }

    const response = await fetch("/save-location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email.toLowerCase(),
        handle: user.nickname,
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

  const handleRedirectMapCenter = (e, restaurant) => {
    e.preventDefault();
    const newMapCenterLocation = restaurant?.geometry?.location;
    setCenterMapPosition(newMapCenterLocation);
  };

  const handleGetRestaurantDetails = (e, placeId) => {
    e.preventDefault();
    setRestaurantDetails("");
    setSaveLocationMsg("");
    getRestaurantDetails(placeId).then(setRestaurantDetails);
  };

  return (
    <Wrapper>
      {restaurants.map((restaurant) => {
        return (
          <div
            key={restaurant.place_id}
            value={restaurant.name}
            onClick={(e) => {
              handleRedirectMapCenter(e, restaurant);
              setActiveMarker(restaurant.place_id);
              handleGetRestaurantDetails(e, restaurant.place_id);
            }}
          >
            <StyledButton
              onClick={(e) => {
                handleSaveLocation(e, restaurant);
              }}
            >
              <BiBookmark />
            </StyledButton>
            <MdRamenDining />
            <span>
              {restaurant.name} ({restaurant.rating}/5)
            </span>
            <Address>{restaurant.formatted_address}</Address>
          </div>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background-color: var(--yellow);
  height: max-content;
  height: 60vh;
  overflow: auto;

  div {
    padding: 0.5rem;
    border: 1px black solid;

    :hover {
      box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.5);
    }
  }
`;

const StyledButton = styled.button`
  position: absolute;
  right: 0;
  margin-right: 10px;
  background: lightblue;
  border: none;
  outline: none;
  border-radius: 5px;

  :hover {
    cursor: pointer;
  }
`;

const Address = styled.p`
  font-size: 14px;
`;

export default RestaurantList;
