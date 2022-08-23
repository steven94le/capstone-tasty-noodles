import React from "react";
import styled from "styled-components";

const SignUp = () => {
  return (
    <Wrapper>
      <p>Register for an account</p>
      <p>Full Name</p>
      <input />
      <p>Email</p>
      <input />
      <p>Password</p>
      <input />
      <p>Confirm Password</p>
      <input />
      <button>Create Account</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  height: 50vh;
  width: 30vw;
  background-color: var(--off-white);
  border-radius: var(--border-radius);
`;

export default SignUp;
