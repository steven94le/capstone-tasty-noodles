import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getUser from "../../api/getUser";
import getOtherUsers from "../../api/getOtherUsers";
import { Link, useParams } from "react-router-dom";
import Members from "./Members";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../../components/Loader";

const Profile = () => {
  const { id } = useParams();
  const { user } = useAuth0();

  const [userInfo, setUserInfo] = useState([]);
  const { picture, name, email, handle, savedRecipes, savedLocations } =
    userInfo;

  const isProfileLoggedUser = user.email === email;

  const [members, setMembers] = useState([]);
  const [recipes, setRecipes] = useState(savedRecipes);
  const [locations, setLocations] = useState(savedLocations);
  const [loadingStatus, setLoadingStatus] = useState("loading");

  const handleRemoveSavedRecipe = async (e) => {
    e.preventDefault();
    const deletedRecipeId = e.target.value;

    await fetch("/delete-saved-recipe", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userInfo.email.toLowerCase(),
        handle,
        deletedRecipeId,
      }),
    });

    setRecipes(recipes.filter((recipe) => recipe.recipeId !== deletedRecipeId));
  };

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

  useEffect(() => {
    getOtherUsers(id).then(setMembers);
    getUser(id).then((data) => {
      setUserInfo(data);
      setRecipes(data.savedRecipes);
      setLocations(data.savedLocations);
    });
    setTimeout(() => setLoadingStatus("loaded"), 2500);
  }, [id]);

  return (
    <>
      {loadingStatus === "loaded" ? (
        <Container>
          <Item1>
            <h1>Profile</h1>
            <hr />
            <LoggedUserImg src={picture} alt="profile" />
            <div>@{handle}</div>
            <div>{name}</div>
          </Item1>
          <Item4>
            <h1>Noodle Community</h1>
            <hr />
            <Members
              members={members}
              recipes={recipes}
              locations={locations}
              isProfileLoggedUser={isProfileLoggedUser}
            />
          </Item4>
          <Item2>
            <h1>Saved Recipes ({recipes?.length})</h1>
            <hr />
            <Recipes>
              {recipes?.map((recipe, index) => (
                <StyledLink
                  to={`/recipe/${recipe.recipeId}`}
                  key={`${recipe}-${index}`}
                >
                  <Recipe>
                    {user.email === email && (
                      <StyledButton
                        value={recipe.recipeId}
                        onClick={handleRemoveSavedRecipe}
                      >
                        X
                      </StyledButton>
                    )}
                    <Thumbnail src={recipe.thumbnail} alt="thumbnail" />
                    <RecipeName>{recipe.name}</RecipeName>
                    {isProfileLoggedUser && (
                      <>
                        {members.map((member) =>
                          member.savedRecipes.map((memberSavedRecipe) => {
                            return memberSavedRecipe.recipeId ===
                              recipe.recipeId ? (
                              <ActivityText>
                                🤩 @{member.handle} saved this!
                              </ActivityText>
                            ) : (
                              <></>
                            );
                          })
                        )}
                      </>
                    )}
                  </Recipe>
                </StyledLink>
              ))}
            </Recipes>
          </Item2>
          <Item3>
            <h1>Saved Locations ({locations?.length})</h1>
            <hr />
            <LocationsWrapper>
              {locations?.map((location, index) => (
                <Location key={`${location}-${index}`}>
                  {user.email === email && (
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
                  {isProfileLoggedUser && (
                    <>
                      {members.map((member) =>
                        member.savedLocations.map((memberSavedLocation) => {
                          return memberSavedLocation.id === location.id ? (
                            <ActivityText>
                              🤩 @{member.handle} saved this!
                            </ActivityText>
                          ) : (
                            <></>
                          );
                        })
                      )}
                    </>
                  )}
                </Location>
              ))}
            </LocationsWrapper>
          </Item3>
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
};

const Container = styled.div`
  margin: 2rem 10rem;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(200px, auto);
  grid-gap: 20px;
  grid-template-areas:
    "profile X X X"
    "recipe recipe recipe recipe"
    "location location location location";
`;

const Item = styled.div`
  padding: 25px;
  border: 1px black solid;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.2);
  background: var(--grey-gradient);
`;

const Item1 = styled(Item)`
  grid-area: profile;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Item2 = styled(Item)`
  grid-area: recipe;
`;

const Item3 = styled(Item)`
  grid-area: location;
`;

const Item4 = styled(Item)`
  grid-area: X;
`;

const Recipes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  justify-content: center;
`;

const LoggedUserImg = styled.img`
  border-radius: 50%;
`;

const Recipe = styled.div`
  position: relative;
  border: 1px black solid;
  max-width: 250px;
  max-height: 250px;
  border-radius: var(--border-radius);
  background: var(--off-white);
  padding: 10px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  transition: 300ms transform ease-in-out;

  :hover {
    border: 0.5px solid lightgrey;
    transform: scale(1.1);
    box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.5);
  }
`;

const ActivityText = styled.p`
  font-size: 13px;
  width: max-content;
  font-weight: bold;
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

const StyledLink = styled(Link)`
  color: black;
`;

const Thumbnail = styled.img`
  height: 175px;
  width: 175px;
`;

const RecipeName = styled.div`
  font-size: 14px;
  max-width: 150px;
  max-height: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.25rem;
`;

const LocationsWrapper = styled.div`
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

export default Profile;
