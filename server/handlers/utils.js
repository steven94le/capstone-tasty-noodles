"use strict";
const e = require("express");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const startClient = async () => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  return client;
};

const getRecipes = async () => {
  try {
    const client = await startClient();
    const db = client.db("tasty-noodles");
    const recipes = await db.collection("recipes").find().toArray();
    client.close();
    return recipes;
  } catch (err) {
    console.log(err);
  }
};

const getRecipe = async (id) => {
  try {
    const client = await startClient();
    const db = client.db("tasty-noodles");
    const recipe = await db.collection("recipes").findOne({ id: id });
    client.close();
    return recipe;
  } catch (err) {
    console.log(err);
  }
};

const saveRecipe = async (email, recipeId, name, thumbnail) => {
  try {
    const client = await startClient();
    const db = client.db("tasty-noodles");
    await db
      .collection("users")
      .updateOne(
        { email },
        { $addToSet: { savedRecipes: { recipeId, name, thumbnail } } }
      );
    client.close();
    return;
  } catch (err) {
    console.log(err);
  }
};

const deleteSavedRecipe = async (email, updatedSavedRecipes) => {
  try {
    const client = await startClient();
    const db = client.db("tasty-noodles");
    await db
      .collection("users")
      .updateOne({ email }, { $set: { savedRecipes: updatedSavedRecipes } });
    client.close();
    return;
  } catch (err) {
    console.log(err);
  }
};

const saveLocation = async (email, id, name, address, rating) => {
  try {
    const client = await startClient();
    const db = client.db("tasty-noodles");
    await db
      .collection("users")
      .updateOne(
        { email },
        { $addToSet: { savedLocations: { name, id, address, rating } } }
      );
    client.close();
    return;
  } catch (err) {
    console.log(err);
  }
};

const deleteSavedLocation = async (email, updatedSavedLocations) => {
  try {
    const client = await startClient();
    const db = client.db("tasty-noodles");
    await db
      .collection("users")
      .updateOne(
        { email },
        { $set: { savedLocations: updatedSavedLocations } }
      );
    client.close();
    return;
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (handle) => {
  try {
    const client = await startClient();
    const db = client.db("tasty-noodles");
    const user = await db.collection("users").findOne({ handle });
    client.close();
    return user;
  } catch (err) {
    console.log(err);
  }
};

const getOtherUsers = async (handle) => {
  try {
    const client = await startClient();
    const db = client.db("tasty-noodles");
    const users = await db
      .collection("users")
      .find({ handle: { $ne: handle } })
      .toArray();
    client.close();
    return users;
  } catch (err) {
    console.log(err);
  }
};

const getRamenFacts = async () => {
  try {
    const client = await startClient();
    const db = client.db("tasty-noodles");
    const facts = await db.collection("facts").find().toArray();
    client.close();
    return facts;
  } catch (err) {
    console.log(err);
  }
};

const sendResponse = (res, status, data, message = "No message included") => {
  res.status(status).json({ status, data, message });
};

module.exports = {
  getRecipes,
  getRecipe,
  getUser,
  getOtherUsers,
  saveRecipe,
  deleteSavedRecipe,
  saveLocation,
  deleteSavedLocation,
  sendResponse,
  getRamenFacts,
};
