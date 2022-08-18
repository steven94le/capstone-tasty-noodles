const { getRecipes, getRecipe, sendResponse } = require("./utils.js");

/**
 * handler to get all the noodle recipes
 * @param {*} req
 * @param {*} res
 * @return {} {res, 200, recipes, "Recipes fetch successful"}
 */
const handleGetRecipes = async (req, res) => {
  try {
    const recipes = await getRecipes();
    sendResponse(res, 200, recipes, "Recipes fetch successful");
  } catch (err) {
    console.log(err);
  }
};

/**
 * handler to get an individual noodle recipe
 * @param {*} req
 * @param {*} res
 * @return {} {res, 200, recipe, "Recipe fetch successful"}
 */
const handleGetRecipe = async (req, res) => {
  const { id } = req.params;
  const recipeId = parseInt(id);

  try {
    const recipes = await getRecipes();
    const recipeIds = recipes.map((recipe) => {
      return recipe.id;
    });

    if (!recipeIds.includes(recipeId)) {
      sendResponse(res, 404, null, "Recipe not found.");
      return;
    }

    const recipe = await getRecipe(recipeId);
    sendResponse(res, 200, recipe, "Recipe fetch successful");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  handleGetRecipes,
  handleGetRecipe,
};
