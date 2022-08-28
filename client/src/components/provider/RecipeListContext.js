import React, { createContext, useState } from "react";

export const RecipeListContext = createContext(null);

export const RecipeListProvider = ({ children }) => {
  const [recipeList, setRecipeList] = useState([]);

  return (
    <RecipeListContext.Provider value={{ recipeList, setRecipeList }}>
      {children}
    </RecipeListContext.Provider>
  );
};
