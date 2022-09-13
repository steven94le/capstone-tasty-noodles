import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getUser from "../../api/getUser";
import getOtherUsers from "../../api/getOtherUsers";
import { Link, useParams } from "react-router-dom";
import Members from "./Members";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../../components/Loader";

const Profile = () => {
  const { user } = useAuth0();
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState([]);
  const { picture, name, email, handle, savedRecipes, savedLocations } =
    userInfo;

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
    Promise.all([
      getOtherUsers(id).then(setMembers),
      getUser(id).then((data) => {
        setUserInfo(data);
        setRecipes(data.savedRecipes);
        setLocations(data.savedLocations);
      }),
    ]);
    setTimeout(() => setLoadingStatus("loaded"), 2500);
  }, [id]);

  return (
    <>
      {loadingStatus === "loaded" ? (
        <Container>
          <Item1>
            <div>Profile</div>
            <hr />
            <img src={picture} alt="profile" />
            <div>@{handle}</div>
            <div>{name}</div>
            <div>{email}</div>
          </Item1>
          <Item4>
            <div>Noodle Community</div>
            <hr />
            <Members members={members} />
          </Item4>
          <Item2>
            <div>Saved Recipes ({recipes?.length})</div>
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
                  </Recipe>
                </StyledLink>
              ))}
            </Recipes>
          </Item2>
          <Item3>
            <div>Saved Locations ({locations?.length})</div>
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
                  <div>{location.address}</div>
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
    "profile X X"
    "recipe recipe recipe"
    "location location location";
`;

const Item = styled.div`
  padding: 20px;
  border: 1px black solid;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.2);
`;

const Item1 = styled(Item)`
  grid-area: profile;
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
`;

const Recipe = styled.div`
  position: relative;
  border: 1px black solid;
  max-width: 200px;
  max-height: 200px;
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

const StyledButton = styled.button`
  position: absolute;
  right: 0;
  margin-right: 10px;

  :hover {
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
  color: black;
`;

const Thumbnail = styled.img`
  height: 150px;
  width: 150px;
`;

const RecipeName = styled.div`
  font-size: 12px;
  max-width: 150px;
  max-height: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.25rem;
`;

const LocationsWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const Location = styled.div`
  position: relative;
  border: 1px black solid;
  width: 250px;
  height: 75px;
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
