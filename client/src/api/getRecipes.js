export const getRecipes = async () => {
  const response = await fetch("/recipes");
  const { data: recipes } = await response.json();

  return recipes;
};

export default getRecipes;
