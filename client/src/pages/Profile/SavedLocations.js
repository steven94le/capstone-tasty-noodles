import React, { useState } from "react";
import styled from "styled-components";

const SavedLocations = ({
  userInfo,
  locations,
  setLocations,
  isProfileLoggedUser,
  members,
  user,
  saveLocationMsg,
  setSaveLocationMsg,
}) => {
  const { handle, savedLocations } = userInfo;
  const savedLocationsCount = locations?.length;
  const [isLocationSaved, setLocationIsSaved] = useState(false);

  //only logged-in user will be able to remove their own saved locations
  const handleRemoveSavedLocation = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const deletedLocationId = e.target.value;

    await fetch("/delete-saved-location", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userInfo.email.toLowerCase(),
        handle,
        deletedLocationId,
      }),
    });

    setLocations(
      locations.filter((location) => location.id !== deletedLocationId)
    );
  };

  //if saved locaiton is clicked, the postal code of that location will be saved via built-in navigator clipboard api
  const handleSavePostalCode = async (e, location) => {
    e.preventDefault();

    const { address } = location;
    let addressArr = address.split(",");
    let cityAndPostal = addressArr[addressArr.length - 2];
    let cityAndPostalArr = cityAndPostal.split(" ");
    let postalCodeArr = cityAndPostalArr.splice(2);
    let postalCode = postalCodeArr.join("");
    navigator.clipboard
      .writeText(postalCode)
      .then(() => {
        alert("Postal code copied: " + postalCode);
      })
      .catch((error) => {
        alert(`Postal code copy failed: ${error}`);
      });
  };

  //quick search for saved locations
  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.value.toLowerCase();

    const searchKeys = value.split(" ").filter((searchKey) => {
      return searchKey !== "";
    });

    const filteredSavedLocations = locations.filter((location) => {
      return searchKeys.every((searchKey) => {
        return (
          location.name.toLowerCase().includes(searchKey) ||
          location.address.toLowerCase().includes(searchKey)
        );
      });
    });
    value === ""
      ? setLocations(savedLocations)
      : setLocations(filteredSavedLocations);
  };

  //logged-in user can save locations seen on other profile pages
  const handleSaveLocation = async (e, location) => {
    e.stopPropagation();
    e.preventDefault();
    const { id, name, address, rating } = location;

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
        id,
        name,
        address,
        rating,
      }),
    });

    setLocationIsSaved(true);

    const data = await response.json();
    const locationSaved = data.data;

    if (!locationSaved) {
      setSaveLocationMsg(data.message);
    } else {
      setSaveLocationMsg(data.message);
    }
  };

  return (
    <Wrapper>
      <h1>Saved Locations ({savedLocationsCount})</h1>
      <StyledInput
        type="search"
        placeholder="Search restaurant or address"
        onChange={handleSearch}
      />
      {isLocationSaved && saveLocationMsg}
      <hr />
      {locations?.map((location, index) => (
        <Location
          key={`${location}-${index}`}
          onClick={(e) => {
            handleSavePostalCode(e, location);
          }}
        >
          {isProfileLoggedUser ? (
            <StyledButton
              value={location.id}
              onClick={handleRemoveSavedLocation}
            >
              X
            </StyledButton>
          ) : (
            <SaveButton onClick={(e) => handleSaveLocation(e, location)}>
              Save
            </SaveButton>
          )}
          <div>
            {location.name} ({location.rating}/5)
          </div>
          <br />
          <div>{location.address}</div>
          {members?.map((member) =>
            member.savedLocations.map((memberSavedLocation, index) => {
              return memberSavedLocation.id === location.id ? (
                <ActivityText key={`${memberSavedLocation.id}-${index}`}>
                  🤩 @{member.handle} saved this!
                </ActivityText>
              ) : (
                <></>
              );
            })
          )}
        </Location>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const StyledInput = styled.input`
  width: 200px;
`;

const Location = styled.div`
  position: relative;
  border: 1px black solid;
  width: 275px;
  height: 125px;
  border-radius: var(--border-radius);
  background: var(--off-white);
  padding: 10px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  transition: 300ms transform ease-in-out;

  :hover {
    border: 0.5px solid lightgrey;
    transform: scale(1.1);
    box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
`;

const ActivityText = styled.p`
  font-size: 13px;
  width: max-content;
  font-weight: bold;
  color: blue;
`;

const StyledButton = styled.button`
  position: absolute;
  right: 0;
  margin-right: 10px;
  width: 25px;
  height: 25px;

  :hover {
    cursor: pointer;
  }
`;

const SaveButton = styled.button`
  position: absolute;
  right: 10px;
  font-size: 14px;
  background: var(--blue);
  color: white;
  border: none;
  outline: none;
  padding: 5px 8px;
  border-radius: 10px;
  cursor: pointer;

  :hover {
    background: lightblue;
  }
`;

export default SavedLocations;
