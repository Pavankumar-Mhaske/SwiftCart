import { Navigate } from "react-router-dom";

export const OpenRoutes = ({ children }) => {
  const getUserFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  console.log(
    "getUserFromLocalStorage in OpenRoutes is : ",
    getUserFromLocalStorage
  );

  return !getUserFromLocalStorage &&
    getUserFromLocalStorage?.accessToken === undefined ? (
    children
  ) : (
    <Navigate to="/" replace={true} />
  );
};
