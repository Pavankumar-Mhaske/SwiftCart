import axios from "axios";
import { base_url } from "../../utils/base_url";

const register = async (userData) => {
  const url = `${base_url}users/register/`;
  const response = await axios.post(url, userData);
  console.log("Response in auth is : ", response);
  // if (response.data.data.token) {
  //   localStorage.setItem("user", JSON.stringify(response.data.data.user));

  //   // localStorage.setItem(key, JSON.stringify(value))
  // }
  // const token = JSON.parse(localStorage.getItem("user"));
  // console.log("token in auth is : ", token);
  return response.data;
};

const AuthService = {
  register,
};

export default AuthService; // export the service
