import { Navigate } from "react-router-dom";

export const OpenRoutes = ({ children }) => {
  const getUserFromLocalStorage = localStorage.getItem("adminUser")
    ? JSON.parse(localStorage.getItem("adminUser"))
    : null;

  console.log(
    "getUserFromLocalStorage in OpenRoutes is : ",
    getUserFromLocalStorage
  );

  return !getUserFromLocalStorage &&
    getUserFromLocalStorage?.accessToken === undefined ? (
    children
  ) : (
    <Navigate to="/admin" replace={true} />
  );
};
