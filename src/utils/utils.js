export const checkUserIsAdmin = (user) => {
  if (!user || !Array.isArray(user.userRoles)) return false;

  const { userRoles } = user;
  if (userRoles.includes("admin")) return true;

  return false;
};
