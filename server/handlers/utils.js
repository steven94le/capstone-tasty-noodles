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

const sendResponse = (res, status, data, message = "No message included") => {
  res.status(status).json({ status, data, message });
};

module.exports = {
  getRecipes,
  getRecipe,
  sendResponse,
};
