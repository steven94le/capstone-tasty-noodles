import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState(false);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        error,
        setError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
