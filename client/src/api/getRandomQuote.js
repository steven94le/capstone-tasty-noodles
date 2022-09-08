export const getQuote = async () => {
  const response = await fetch("https://api.quotable.io/random");
  const quote = await response.json();

  return quote;
};

export default getQuote;
