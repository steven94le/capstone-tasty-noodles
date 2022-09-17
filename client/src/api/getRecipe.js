//fetch specific recipe from server given its id
export const getRecipe = async (id) => {
  const response = await fetch(`/recipe/${id}`);
  const { data: recipe } = await response.json();

  return recipe;
};

export default getRecipe;
