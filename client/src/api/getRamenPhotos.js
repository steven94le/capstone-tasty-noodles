const API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;

export const getRamenPhotos = async () => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos/?page=1&query=ramen&client_id=${API_KEY}`
  );
  const ramenPhotos = await response.json();

  return ramenPhotos;
};

export default getRamenPhotos;
