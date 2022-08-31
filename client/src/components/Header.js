import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <StyledHeader>
      <StyledLink to="/">Tasty Noodles</StyledLink>
    </StyledHeader>
  );
};

const StyledLink = styled(NavLink)`
  color: black;
`;

const StyledHeader = styled.h1`
  font-size: 48px;
  margin: 3rem 0 0.25rem 0;
`;

export default Header;
