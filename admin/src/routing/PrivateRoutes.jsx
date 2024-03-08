import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const getUserFromLocalStorage = localStorage.getItem("adminUser")
    ? JSON.parse(localStorage.getItem("adminUser"))
    : null;

  console.log(
    "getUserFromLocalStorage in PrivateRoutes is : ",
    getUserFromLocalStorage
  );

  return getUserFromLocalStorage &&
    getUserFromLocalStorage?.accessToken !== undefined ? (
    children
  ) : (
    <Navigate to="/" replace={true} />
  );
};
