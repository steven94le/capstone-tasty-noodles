import React, { useState, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../provider/UserProvider";

const defaultLoginFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [loginFields, setLoginFields] = useState(defaultLoginFields);
  const { email, password } = loginFields;
  const { setCurrentUser, error, setError, errorMessage, setErrorMessage } =
    useContext(UserContext);

  const userEmail = email.toLowerCase();

  const resetLoginFields = () => {
    setLoginFields(defaultLoginFields);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFields({ ...loginFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password,
      }),
    });

    const data = await response.json();
    const userData = data.data;

    if (!userData) {
      setError(true);
      setErrorMessage(data.message);
      return;
    } else {
      setError(false);
      resetLoginFields();
      setErrorMessage(data.message);
      setCurrentUser(userData);
    }
  };

  return (
    <Wrapper>
      <StyledHeader>Already have an account?</StyledHeader>
      <StyledForm onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <button type="submit">Log In</button>
        {error ? (
          <ErrorMsg>{errorMessage}</ErrorMsg>
        ) : (
          <SuccessMsg>{errorMessage}</SuccessMsg>
        )}
      </StyledForm>
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
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
`;

const StyledHeader = styled.h1`
  font-size: 18px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.85rem;
  width: 100%;

  input {
    border-radius: 5px;
    padding: 0.5rem;
    border: none;
    outline: none;
    border: 1px solid lightgrey;
  }

  input:focus {
    box-shadow: 0 0 3px 1px grey;
  }

  button {
    margin-top: 0.5rem;
    padding: 0.75em;
    color: white;
    background-color: var(--blue);
    border: none;
    outline: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }

  button:hover,
  button:focus {
    background-color: lightblue;
    transition: 150ms ease-in-out;
  }
`;

const Message = styled.p`
  margin-top: -15px;
  text-align: center;
`;
const ErrorMsg = styled(Message)`
  color: red;
`;

const SuccessMsg = styled(Message)`
  color: green;
`;

export default SignIn;
