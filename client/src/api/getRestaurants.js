const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const proxyurl = "https://cors-anywhere.herokuapp.com/";

const URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=ramen&key=${API_KEY}&location=45.5019,-73.5674&radius=500`;

export const getRestaurants = async () => {
  const response = await fetch(proxyurl + URL);
  const data = await response.json();
  const restaurants = data.results;
  const nearestTenRestaurants = restaurants.slice(10);

  return nearestTenRestaurants;
};

export default getRestaurants;
