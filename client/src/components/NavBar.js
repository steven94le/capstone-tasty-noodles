import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

const NavBar = () => {
  const { user } = useAuth0();
  const id = user?.nickname;

  return (
    <Wrapper>
      <StyledLinks>
        <StyledNavLink exact to="/recipes">
          <p>Recipes</p>
        </StyledNavLink>
        <StyledNavLink exact to="/places">
          <p>Places</p>
        </StyledNavLink>
        {user ? (
          <>
            <StyledNavLink exact to={`/profile/${id}`}>
              <p>Profile</p>
            </StyledNavLink>
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
      </StyledLinks>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    border: 1px solid black;
    border-radius: var(--border-radius);
    width: 100px;
    height: 25px;
    text-align: center;
    font-size: 24px;
  }
`;

const StyledLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
`;

const StyledNavLink = styled(NavLink)`
  color: black;

  &:hover {
    background-color: black;
    color: var(--yellow);
    border-radius: var(--border-radius);
    opacity: 0.9;
  }
`;

export default NavBar;
