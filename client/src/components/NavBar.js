import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NavBar = () => {
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
