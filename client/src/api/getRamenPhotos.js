const API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;
const BASE_UNSPLASH_API_URL = "https://api.unsplash.com/search/photos/?page=1";

export const getRamenPhotos = async () => {
  const response = await fetch(
    `${BASE_UNSPLASH_API_URL}&query=noodles&client_id=${API_KEY}`
  );
  const ramenPhotos = await response.json();

  return ramenPhotos;
};

export default getRamenPhotos;
