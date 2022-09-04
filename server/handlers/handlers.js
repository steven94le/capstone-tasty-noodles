// const { v4: uuidv4 } = require("uuid");
const {
  getRecipes,
  getRecipe,
  saveRecipe,
  deleteSavedRecipe,
  getUser,
  getOtherUsers,
  saveLocation,
  deleteSavedLocation,
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
 * @param {*} req - with body of log in data: `email`, `handle`, `recipeId`
 * @param {*} res
 * @return saved recipe
 */
const handleSaveRecipe = async (req, res) => {
  const { email, handle, recipeId, name, thumbnail } = req.body;

  try {
    const user = await getUser(handle);

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
 * @param {*} req - with body of log in data: `email`, `handle`, `recipeId`
 * @param {*} res
 * @return saved recipe deleted
 */
const handleDeleteSavedRecipe = async (req, res) => {
  const { email, handle, deletedRecipeId } = req.body;

  try {
    const user = await getUser(handle);

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
 * handler to save location into a logged-in user's profile
 * @param {*} req - with body of log in data: `email`, `handle`, `recipeId`
 * @param {*} res
 * @return saved location
 */
const handleSaveLocation = async (req, res) => {
  const { email, handle, id, name, address, rating } = req.body;

  try {
    const user = await getUser(handle);

    if (!user) {
      sendResponse(res, 404, user, "User not found.");
    } else {
      const locationSaved = await saveLocation(
        email,
        id,
        name,
        address,
        rating
      );
      sendResponse(res, 200, locationSaved, "Location saved!");
    }
  } catch (err) {
    console.log(err);
  }
};

/**
 * handler to delete a saved location from user's profile page
 * @param {*} req - with body of log in data: `email`, `handle`, `recipeId`
 * @param {*} res
 * @return saved location deleted
 */
const handleDeleteSavedLocation = async (req, res) => {
  const { email, handle, deletedLocationId } = req.body;

  try {
    const user = await getUser(handle);

    const { savedLocations } = user;

    const locationIds = savedLocations.map((savedLocation) => {
      return savedLocation.id;
    });

    if (!locationIds.includes(deletedLocationId)) {
      sendResponse(res, 404, null, "Location not found!");
    }

    const updatedSavedLocations = savedLocations.filter((savedLocation) => {
      return savedLocation.id !== deletedLocationId;
    });

    const locationDeleted = await deleteSavedLocation(
      email,
      updatedSavedLocations
    );
    sendResponse(res, 200, locationDeleted, "Location deleted!");
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
  const { id: handle } = req.params;

  try {
    const user = await getUser(handle);

    if (!user) {
      sendResponse(res, 404, user, "User not found.");
    } else {
      sendResponse(res, 200, user, "User fetch successful");
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
const handleGetOtherUsers = async (req, res) => {
  const { id: handle } = req.params;

  try {
    const users = await getOtherUsers(handle);
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
  handleSaveLocation,
  handleDeleteSavedLocation,
  handleGetUser,
  handleGetOtherUsers,
};
