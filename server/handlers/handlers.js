const { v4: uuidv4 } = require("uuid");
const {
  getRecipes,
  getRecipe,
  findUser,
  getUsers,
  addUserDetails,
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
 * handler to verify if user exists when user attempts to sign in
 * @param {*} req - with body of log in data: `email`, `password`
 * @param {*} res
 * @return user verification
 */
const verifyUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await findUser(email, password);

    if (foundUser) {
      sendResponse(res, 200, foundUser, "User verified.");
    } else {
      sendResponse(res, 200, foundUser, "Please check your email or password.");
    }
  } catch (err) {
    console.log(err);
  }
};

/**
 * handler to create new user when a user signs up for the first time
 * @param {*} req - with body of registration data: `email`, `password`
 * @param {*} res
 * @returns new user
 */
const addNewUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUserDetails = {
      _id: uuidv4(),
      email,
      password,
    };

    const users = await getUsers();
    const foundUser = users.find((user) => user.email === email);

    if (foundUser) {
      sendResponse(res, 404, null, "User email already exists.");
      return;
    } else {
      await addUserDetails(newUserDetails);
    }

    sendResponse(
      res,
      201,
      newUserDetails,
      "User has been registered successfully."
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  handleGetRecipes,
  handleGetRecipe,
  verifyUser,
  addNewUser,
};
