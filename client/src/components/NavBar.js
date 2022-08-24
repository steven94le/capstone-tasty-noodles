import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { UserContext } from "../provider/UserProvider";

const NavBar = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <Wrapper>
      <StyledLinks>
        <StyledNavLink exact to="/">
          <p>Recipes</p>
        </StyledNavLink>
        <StyledNavLink exact to="/blogs">
          <p>Blogs</p>
        </StyledNavLink>
        <StyledNavLink exact to="/about">
          <p>About</p>
        </StyledNavLink>
        <StyledNavLink exact to="/profile">
          <p>Profile</p>
        </StyledNavLink>
        {currentUser.email && (
          <StyledLogOut onClick={() => setCurrentUser({})}>
            Log Out
          </StyledLogOut>
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

export default NavBar;
