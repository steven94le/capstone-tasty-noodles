import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getUser from "../../api/getUser";
import getOtherUsers from "../../api/getOtherUsers";
import { useParams } from "react-router-dom";
import Members from "./Members";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../../components/Loader";
import Bio from "./Bio";
import SavedRecipes from "./SavedRecipes";
import SavedLocations from "./SavedLocations";

const Profile = () => {
  const { id } = useParams();
  const { user } = useAuth0();
  const [userInfo, setUserInfo] = useState([]);
  const { email, savedRecipes, savedLocations } = userInfo;
  const isProfileLoggedUser = user?.email === email;
  const [members, setMembers] = useState([]);
  const [recipes, setRecipes] = useState(savedRecipes);
  const [locations, setLocations] = useState(savedLocations);
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [saveRecipeMsg, setSaveRecipeMsg] = useState("");
  const [saveLocationMsg, setSaveLocationMsg] = useState("");

  useEffect(() => {
    getOtherUsers(id).then((data) => {
      try {
        setMembers(data);
      } catch (err) {
        console.log(err);
      }
    });

    getUser(id).then((data) => {
      try {
        setUserInfo(data);
        setRecipes(data.savedRecipes);
        setLocations(data.savedLocations);
        setSaveRecipeMsg("");
        setSaveLocationMsg("");
      } catch (err) {
        console.log(err);
      }
    });

    setTimeout(() => setLoadingStatus("loaded"), 2500);
  }, [id, saveRecipeMsg, saveLocationMsg]);

  return (
    <>
      {loadingStatus === "loaded" ? (
        <Container>
          <Item1>
            <Bio userInfo={userInfo} recipes={recipes} locations={locations} />
          </Item1>
          <Item4>
            <Members
              members={members}
              recipes={recipes}
              locations={locations}
              isProfileLoggedUser={isProfileLoggedUser}
            />
          </Item4>
          <Item2>
            <SavedRecipes
              userInfo={userInfo}
              members={members}
              recipes={recipes}
              setRecipes={setRecipes}
              isProfileLoggedUser={isProfileLoggedUser}
              user={user}
              saveRecipeMsg={saveRecipeMsg}
              setSaveRecipeMsg={setSaveRecipeMsg}
            />
          </Item2>
          <Item3>
            <SavedLocations
              userInfo={userInfo}
              locations={locations}
              setLocations={setLocations}
              isProfileLoggedUser={isProfileLoggedUser}
              members={members}
              user={user}
              saveLocationMsg={saveLocationMsg}
              setSaveLocationMsg={setSaveLocationMsg}
            />
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

export default Profile;
