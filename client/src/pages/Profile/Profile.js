import React from "react";
import styled from "styled-components";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Profile = () => {
  return (
    <Wrapper>
      <SignIn />
      <SignUp />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 65vh;
  gap: 5rem;
`;

export default Profile;
