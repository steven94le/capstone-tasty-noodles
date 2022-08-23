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
      <p>Already have an account?</p>
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
        <button type="submit">Log in</button>
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

export default SignIn;
