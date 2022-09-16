const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const proxyurl = "https://cors-anywhere.herokuapp.com/";

export const getLatLongCoordinates = async (postalCode) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=${API_KEY}`;
  const latLongResponse = await fetch(proxyurl + URL);
  const latLongData = await latLongResponse.json();

  return latLongData;
};

export const getRestaurants = async (latLonCoordinates, distanceInputKM) => {
  const distanceInMeters = Number(distanceInputKM) * 1000;
  const URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=ramen&key=${API_KEY}&location=${latLonCoordinates}&radius=${distanceInMeters}`;
  const response = await fetch(proxyurl + URL);
  const data = await response.json();
  const restaurants = data.results;

  return restaurants;
};

export const getRestaurantDetails = async (PLACE_ID) => {
  const URL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&key=${API_KEY}`;
  const response = await fetch(proxyurl + URL);
  const data = await response.json();
  const restaurantDetails = data.result;

  return restaurantDetails;
};
