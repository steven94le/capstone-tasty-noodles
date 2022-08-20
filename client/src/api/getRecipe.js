export const getRecipe = async (id) => {
  const response = await fetch(`/recipe/${id}`);
  const { data: recipe } = await response.json();

  return recipe;
};

export default getRecipe;
