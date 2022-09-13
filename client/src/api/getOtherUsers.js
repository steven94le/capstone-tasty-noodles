export const getOtherusers = async (id) => {
  const response = await fetch(`/profile/${id}/other-users`);
  const { data: users } = await response.json();
  return users;
};

export default getOtherusers;
