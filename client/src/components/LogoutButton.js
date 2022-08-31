import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <StyledLogOut onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </StyledLogOut>
  );
};

const StyledLogOut = styled.button`
  border: 1px solid black;
  border-radius: var(--border-radius);
  width: 100px;
  height: 25px;
  font-size: 22px;
  background-color: transparent;
  padding: 0;

  &:hover {
    background-color: black;
    color: var(--yellow);
    border-radius: var(--border-radius);
    opacity: 0.9;
    cursor: pointer;
  }
`;

export default LogoutButton;
