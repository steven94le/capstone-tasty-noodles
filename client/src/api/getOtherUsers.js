//fetch other users from server that's not the current profile
export const getOtherUsers = async (id) => {
  const response = await fetch(`/profile/${id}/other-users`);
  const { data: users } = await response.json();
  return users;
};

export default getOtherUsers;
