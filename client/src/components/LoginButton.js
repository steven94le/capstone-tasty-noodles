import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <StyledLogin onClick={() => loginWithRedirect()}>Log In</StyledLogin>;
};

const StyledLogin = styled.button`
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

export default LoginButton;
