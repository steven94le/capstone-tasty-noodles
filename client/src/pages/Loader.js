import React from "react";
import styled from "styled-components";

const Loader = () => {
  return <Wrapper>Loading...</Wrapper>;
};

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export default Loader;
