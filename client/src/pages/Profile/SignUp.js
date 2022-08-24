import React, { useState, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../provider/UserProvider";

const defaultSignUpFields = {
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [signUpFields, setSignUpFields] = useState(defaultSignUpFields);
  const { email, password, confirmPassword } = signUpFields;
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { setCurrentUser } = useContext(UserContext);

  const userEmail = email.toLowerCase();

  const resetSignUpFields = () => {
    setSignUpFields(defaultSignUpFields);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpFields({ ...signUpFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError(true);
      setErrorMessage("Passwords do not match");
      return;
    }

    const response = await fetch("/add-user", {
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
    const newUserData = data.data;

    if (!newUserData) {
      setError(true);
      setErrorMessage(data.message);
      return;
    } else {
      setError(false);
      resetSignUpFields();
      setErrorMessage(data.message);
      setCurrentUser(newUserData);
    }
  };

  return (
    <Wrapper>
      <StyledHeader>Register for an account</StyledHeader>
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
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Account</button>
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
  gap: 0.75rem;
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
    background-color: blue;
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
  text-align: center;
`;
const ErrorMsg = styled(Message)`
  color: red;
`;

const SuccessMsg = styled(Message)`
  color: green;
`;

export default SignUp;
