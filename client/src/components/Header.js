import React from "react";
import styled from "styled-components";

const Header = () => {
  return <StyledHeader>Tasty Noodles</StyledHeader>;
};

const StyledHeader = styled.h1`
  font-size: 48px;
  margin: 3rem 0 0.25rem 0;
`;

export default Header;
