import axios from "axios";
import { base_url } from "../../utils/base_url";

const login = async (userData) => {
  const url = `${base_url}users/admin-login/`;
  const response = await axios.post(url, userData);
  console.log("Response in auth is : ", response.data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  login,
};

export default authService; // export the service
