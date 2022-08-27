export const getUser = async (id) => {
  const response = await fetch(`/profile/${id}`);
  const { data: user } = await response.json();

  return user;
};

export default getUser;
