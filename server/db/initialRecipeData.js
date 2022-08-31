const request = require("request-promise");

const getRecipes = () => {
  const { X_RapidAPI_Key, X_RapidAPI_Host } = process.env;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": X_RapidAPI_Key,
      "X-RapidAPI-Host": X_RapidAPI_Host,
    },
  };

  return request(
    "https://tasty.p.rapidapi.com/recipes/list?from=160&size=40&q=noodles",
    options
  )
    .then((response) => {
      return JSON.parse(response);
    })
    .catch((err) => console.log(err));
};

getRecipes().then((recipes) =>
  console.log(
    JSON.stringify(
      recipes.results?.map((result) => {
        return {
          id: result.id,
          name: result.name,
          description: result.description,
          userRatings: result.user_ratings,
          numServings: result.num_servings,
          prepTimeMinutes: result.prep_time_minutes,
          cookTimeMinutes: result.cook_time_minutes,
          nutrition: result.nutrition,
          thumbnail: result.thumbnail_url,
          instructions: result.instructions?.map((instruction) => {
            return { Step: instruction.display_text };
          }),
          ingredients: result?.sections?.[0].components?.map((ingredient) => {
            return { Ingredient: ingredient.raw_text };
          }),
        };
      })
    )
  )
);
