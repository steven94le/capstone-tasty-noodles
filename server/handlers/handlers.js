// const { v4: uuidv4 } = require("uuid");
const {
  getRecipes,
  getRecipe,
  saveRecipe,
  deleteSavedRecipe,
  findUser,
  getUser,
  getUsers,
  sendResponse,
} = require("./utils.js");

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

/**
 * handler to save recipeId into a logged-in user's profile
 * @param {*} req - with body of log in data: `email`, `recipeId`
 * @param {*} res
 * @return saved recipe
 */
const handleSaveRecipe = async (req, res) => {
  const { email, recipeId, name, thumbnail } = req.body;

  try {
    const user = await findUser(email);

    if (!user) {
      sendResponse(res, 404, user, "User not found.");
    } else {
      const recipeSaved = await saveRecipe(email, recipeId, name, thumbnail);
      sendResponse(res, 200, recipeSaved, "Recipe saved!");
    }
  } catch (err) {
    console.log(err);
  }
};

/**
 * handler to delete a saved recipe from user's profile page
 * @param {*} req - with body of log in data: `email`, `recipeId`
 * @param {*} res
 * @return saved recipe deleted
 */
const handleDeleteSavedRecipe = async (req, res) => {
  const { email, deletedRecipeId } = req.body;

  try {
    const user = await getUser(email);

    const { savedRecipes } = user;

    const recipeIds = savedRecipes.map((savedRecipe) => {
      return savedRecipe.recipeId;
    });

    if (!recipeIds.includes(deletedRecipeId)) {
      sendResponse(res, 404, null, "Recipe not found!");
    }

    const updatedSavedRecipes = savedRecipes.filter((savedRecipes) => {
      return savedRecipes.recipeId !== deletedRecipeId;
    });

    const recipeDeleted = await deleteSavedRecipe(email, updatedSavedRecipes);
    sendResponse(res, 200, recipeDeleted, "Recipe deleted!");
  } catch (err) {
    console.log(err);
  }
};

/**
 * handler to get user information
 * @param {*} req
 * @param {*} res
 * @return {} {res, 200, users, "User fetch successful"}
 */
const handleGetUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userFound = await findUser(id);

    if (!userFound) {
      sendResponse(res, 404, user, "User not found.");
    } else {
      const user = await getUser(id);
      sendResponse(res, 200, user, "Users fetch successful");
    }
  } catch (err) {
    console.log(err);
  }
};

/**
 * handler to get all users
 * @param {*} req
 * @param {*} res
 * @return {} {res, 200, users, "Users fetch successful"}
 */
const handleGetUsers = async (req, res) => {
  try {
    const users = await getUsers();
    sendResponse(res, 200, users, "Users fetch successful");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  handleGetRecipes,
  handleGetRecipe,
  handleSaveRecipe,
  handleDeleteSavedRecipe,
  handleGetUser,
  handleGetUsers,
};
