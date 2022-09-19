# Tasty Noodles Project :ramen:

# Introduction :wave:

A full-stack bootcamp project allowing users to discover noodle meals!

Users can browse Tasty Co. noodle-related recipes and filter by quick search or by checking off common ingredients found in their kitchen. The latter was a feature I found myself using a lot as someone who's been recently trying to follow/cook more recipes at home, while trying to use as much left-over ingredients as I can from my fridge to prevent waste! Recipes can be sorted by amounts of ingredients needed, time it takes to prep and cook, calorie count, and by rating. 

Going the unconventional route for a recipe site, I've given an option to explore the world of ramen by adding a feature where users can find top-rated ramen restaurants near them via Google Maps API. If users are logged in, they're able to bookmark these recipes and restaurant locations. Users can also check other site members' bookmarks for further recipe ideas or restaurant suggestions. User account data and bookmarks are stored and accessed within the MongoDB database. 

<img width="750" alt="image" src="https://user-images.githubusercontent.com/76791687/191038708-3869e915-1691-48e2-9503-a6d98b9907c1.png">

---

## **Features :computer:**

Recipe Pages

Users can browse recipe catalogue, filter by ingredients or quick search, or sort by ingredients count, calories, total time, or ratings. A "surprise me" button is incorporated if the user is undecisive regarding what recipe to pick. Upon entering a recipe page, users will see recipe description, summary data (including time, servings, and nutritional facts, if available), as well as related photos, ingredients list, and instructions. Similar recipes section is incorporated, and registered users can bookmark the recipe for later.

![capstone-recipe-gallery](https://user-images.githubusercontent.com/76791687/191068555-953fabbb-7ffd-491d-8aa6-197c5b19626e.gif)

![capstone-recipe-gallery1](https://user-images.githubusercontent.com/76791687/191069240-b3ed6c8a-45b3-4cb2-bcf4-7f9f0305caaf.gif)

<img width="1034" alt="image" src="https://user-images.githubusercontent.com/76791687/191051190-9992f121-77eb-4548-8c6b-4e89cebf9bd4.png">

Places Page

With Google Maps+Places integration, users can find top-rated ramen restaurants near them by inputting their postal code. Restaurant details such as their website, opening hours, and customer reviews can be accessed for additional information, and registered users can bookmark restaurants. The background image will change dyanmnically depending on what city the postal code is in.

![capstone-places-page](https://user-images.githubusercontent.com/76791687/191064241-21534da8-2b3c-41d9-bb7f-0c4f9458a0af.gif)

Facts Page

A little simple and fun page detailing facts about ramen. Future additions would make this page become more educational, such as adding tips and tricks to help with cooking processes, lightbox timeline gallery showcasing the history behind ramen itself, and essential cooking tools used and links to where to purchase.

![capstone-facts-page](https://user-images.githubusercontent.com/76791687/191060327-17a8be4c-55e3-4635-b012-7ac6ad25b0e8.gif)

Profile Page

Users are able to see their recipe and restaurant bookmarks as well as other members'. For your own bookmarks, they can be removed or filtered through search. Clicking on a recipe will bring you to its respective page, while clicking on a location will copy its postal code onto the navigator clipboard, that can be pasted later in the places page. Users can see from their page the amount of shared bookmarks they share with other members, and can bookmark their saved recipes/locations onto theirs.

![capstone-profile-page](https://user-images.githubusercontent.com/76791687/191063025-a6fd028e-d1c9-40b6-8837-40a95e2366e4.gif)

![capstone-profile-page1](https://user-images.githubusercontent.com/76791687/191064783-571c41d5-049c-45fb-aa4b-01b7d1d56a05.gif)


## **Deploying The Project :computer:**

Clone the repository to your local machine using the terminal:

`$ git clone git@github.com:steven94le/capstone-tasty-noodles.git`

### Installing the dependencies:

### The Client

1. Navigate to the client folder `cd client`
2. Install the required packages `yarn install`
3. Once that's done you can start the server with `yarn start`

This will run the app in development mode. Open http://localhost:3000 to view it in the browser! The page will reload if you make changes.

### The Server

1. Navigate to the server folder `cd server`
2. Install the required packages `yarn install`
3. Once that's done you can start the server with `yarn start`

Json files related to Tasty.co recipes and ramen facts are found in the `server/db` directory, which were imported onto MongoDB and used throughout the application.

### External Resources Used

1. Tasty API via Rapid API Hub (for initial recipe batch import)
- https://rapidapi.com/apidojo/api/tasty

2. Google Maps API (for geocoding, place textsearch, and place details)
- https://developers.google.com/maps/documentation

3. Unsplash API (for photos)
- https://unsplash.com/developers

4. Auth0 React SDK for Single Page Apps (for user login/registration) 
- https://auth0.com/docs/libraries/auth0-react

5. Auth0 integration with MongoDB (update MongoDB user collection whenever a new user registers/signs in via Auth0)
- https://auth0.com/blog/connecting-auth0-to-mongodb/
- https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow

## **Technologies Used :computer:**

Frontend:
- JavaScript, HTML, CSS
- React.js
- Styled Components
- Auth0 React SDK

Backend:
- Node.js
- Express

Other Tools:
- GitHub
- Git
- MongoDB
- Trello

## **Author :bust_in_silhouette:**

- Steven Le (GitHub: [@steven94le](https://github.com/steven94le))
