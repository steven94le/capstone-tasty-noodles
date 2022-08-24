import React from "react";
import styled, { keyframes } from "styled-components";
import noodlesGif from "./assets/noodles_loader.gif";

const Loader = () => {
  return (
    <Wrapper>
      <ImgLoader src={noodlesGif} />
      <ProgressBar>
        <ProgressFill />
      </ProgressBar>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ImgLoader = styled.img`
  height: 250px;
  width: auto;
`;

const ProgressBar = styled.div`
  position: relative;
  width: 250px;
  border: 10px solid var(--blue);
  border-radius: 20px;
  margin: 20px 0 0 30px;
`;

const Loading = keyframes`
  0%{
    width: 0%;
  }
  25%{
      width: 50%;
  }
  50%{
      width: 75%;
  }
  75%{
      width: 85%;
  }
  100%{
      width: 100%;
  }
`;

const ProgressFill = styled.div`
  position: absolute;
  background-color: white;
  margin-top: -7px;
  width: 0px;
  height: 15px;
  border-radius: 15px;
  animation: ${Loading} 3s linear;
`;

export default Loader;
