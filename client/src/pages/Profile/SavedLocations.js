import React from "react";
import styled from "styled-components";

const SavedLocations = ({
  userInfo,
  locations,
  setLocations,
  isProfileLoggedUser,
  members,
}) => {
  const { handle } = userInfo;
  const savedLocationsCount = locations?.length;

  const handleRemoveSavedLocation = async (e) => {
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

  return (
    <Wrapper>
      <h1>Saved Locations ({savedLocationsCount})</h1>
      <hr />
      {locations?.map((location, index) => (
        <Location
          key={`${location}-${index}`}
          onClick={(e) => {
            handleSavePostalCode(e, location);
          }}
        >
          {isProfileLoggedUser && (
            <StyledButton
              value={location.id}
              onClick={handleRemoveSavedLocation}
            >
              X
            </StyledButton>
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

export default SavedLocations;
