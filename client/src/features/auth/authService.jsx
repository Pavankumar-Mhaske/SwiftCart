import axios from "axios";
import { base_url } from "../../utils/base_url";

const register = async (userData) => {
  const url = `${base_url}users/register/`;
  const response = await axios.post(url, userData);
  console.log("Response in register auth is : ", response);
  // if (response.data.data.token) {
  //   localStorage.setItem("user", JSON.stringify(response.data.data.user));

  //   // localStorage.setItem(key, JSON.stringify(value))
  // }
  // const token = JSON.parse(localStorage.getItem("user"));
  // console.log("token in auth is : ", token);
  return response.data;
};

const login = async (userData) => {
  const url = `${base_url}users/login/`;
  const response = await axios.post(url, userData);
  console.log("Response in login auth is : ", response);
  if (response.data.data.user.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data.data.user));
    console.log(
      "response.data.data.user.accessToken in login auth is : ",
      response.data.data.user
    );
  }

  // Optionally, you can try to set a custom cookie on the client side for non-HTTP-only cookies
  // document.cookie = `customCookie=${response.data.data.user.accessToken}; path=/;`;

  // Accessing cookies in client-side JavaScript
  // Using document.cookie
  const allCookies = document.cookie;
  console.log("accessedToken in login auth is : 😎😎", allCookies);
  // console.log("accessedToken in login auth is : 😎😎", accessedToken);

  return response.data;
};

const AuthService = {
  register,
  login,
};

export default AuthService; // export the service
