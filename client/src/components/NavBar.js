import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 1rem;

  p {
    border: 1px solid black;
    border-radius: var(--border-radius);
    width: 100px;
    height: 25px;
    text-align: center;
    font-size: 24px;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: black;

  &:hover {
    opacity: 0.5;
  }
`;

export default NavBar;
