import React from "react";
import styled from "styled-components";

const NavBar = () => {
  return (
    <Wrapper>
      <p>Recipes</p>
      <p>Blogs</p>
      <p>About</p>
      <p>Profile</p>
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
    width: 75px;
    height: 20px;
    text-align: center;
  }
`;

export default NavBar;
