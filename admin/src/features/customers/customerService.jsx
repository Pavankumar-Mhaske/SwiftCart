import axios from "axios";
import { base_url } from "../../utils/base_url";
import Cookies from "js-cookie";

const getUsers = async () => {
  // Get the token from cookies
  //   const token = Cookies.get("user");

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI3ZjBmOWE1Y2IzZGFlZTk5MzU4MGMiLCJlbWFpbCI6Im1oYXNrZXBhdmFua3VtYXJAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzAzMjM2OTg0LCJleHAiOjE3MDMzMjMzODR9.zDEWxUIf9WLSyUUhIyFxgAcbXhQazL9lxnEnE7gCnwQ";
  console.log("token in customer is : ", token);
  const url = `${base_url}users/all-users/`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  //   const response = await axios.get(url);
  console.log("Response in customer is : ", response);

  return response.data;
};

const customerService = {
  getUsers,
};

export default customerService; // export the service
