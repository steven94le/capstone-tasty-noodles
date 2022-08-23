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
      <p>Register for an account</p>
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
        {error ? <p>{errorMessage}</p> : <p>{errorMessage}</p>}
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
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export default SignUp;
