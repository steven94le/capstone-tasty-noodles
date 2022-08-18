const { MongoClient } = require("mongodb");

const recipes = require("./noodleRecipes.json");
const blogPosts = require("./noodleBlogPosts.json");

require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("tasty-noodles");

  await db.collection("recipes").insertMany(recipes);
  await db.collection("blog-posts").insertMany(blogPosts);
  console.log("Success!");
  client.close();
};

// batchImport();