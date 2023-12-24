import axios from "axios";
import { base_url } from "../../utils/base_url";
import Cookies from "js-cookie";

const getUsers = async () => {
  // Get the token from cookies
  //   const token = Cookies.get("user");

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI3ZjBmOWE1Y2IzZGFlZTk5MzU4MGMiLCJlbWFpbCI6Im1oYXNrZXBhdmFua3VtYXJAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzAzNDA4ODM0LCJleHAiOjE3MDM0OTUyMzR9.52XbIt2AIgVU07M8W8BBCAAcyFrXCepZmHTBHQ2PQb8";
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
