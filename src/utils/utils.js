import axios from "axios";

export const checkUserIsAdmin = (user) => {
  if (!user || !Array.isArray(user.userRoles)) return false;

  const { userRoles } = user;
  if (userRoles.includes("admin")) return true;

  return false;
};

export const api = axios.create({
  baseURL: "http://127.0.0.1:5001/my-ecommerce-app-eadbb/us-central1/api",
});
