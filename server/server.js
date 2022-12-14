"use strict";

const express = require("express");
const morgan = require("morgan");

const {
  handleGetRecipes,
  handleGetRecipe,
  handleSaveRecipe,
  handleDeleteSavedRecipe,
  handleGetUser,
  handleGetOtherUsers,
  handleSaveLocation,
  handleDeleteSavedLocation,
  handleGetRamenFacts,
} = require("./handlers/handlers");

const PORT = 8000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.json())
  .use(
    express.urlencoded({
      extended: false,
    })
  )
  .use("/", express.static(__dirname + "/"))

  .get("/recipes", handleGetRecipes)
  .get("/recipe/:id", handleGetRecipe)
  .get("/profile/:id/other-users", handleGetOtherUsers)
  .get("/profile/:id", handleGetUser)
  .get("/facts", handleGetRamenFacts)

  .post("/save-recipe", handleSaveRecipe)
  .delete("/delete-saved-recipe", handleDeleteSavedRecipe)

  .post("/save-location", handleSaveLocation)
  .delete("/delete-saved-location", handleDeleteSavedLocation)

  // catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
