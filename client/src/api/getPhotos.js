const API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;
const BASE_UNSPLASH_API_URL = "https://api.unsplash.com/search/photos/?page=1";

export const getPhotos = async (QUERY_INPUT) => {
  const response = await fetch(
    `${BASE_UNSPLASH_API_URL}&query=${QUERY_INPUT}&client_id=${API_KEY}&orientation=landscape`
  );
  const photos = await response.json();

  return photos;
};

export default getPhotos;
