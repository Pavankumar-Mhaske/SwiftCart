import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const getUserFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  console.log(
    "getUserFromLocalStorage in PrivateRoutes is : ",
    getUserFromLocalStorage
  );

  return getUserFromLocalStorage && getUserFromLocalStorage?.accessToken !== null ? (
    children
  ) : (
    <Navigate to="/login" replace={true} />
  );
};
