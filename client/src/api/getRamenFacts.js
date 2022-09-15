export const getRamenFacts = async () => {
  const response = await fetch("/facts");
  const { data: facts } = await response.json();

  return facts;
};

export default getRamenFacts;
