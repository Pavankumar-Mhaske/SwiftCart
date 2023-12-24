import axios from "axios";
import { base_url } from "../../utils/base_url";

const getProducts = async () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI3ZjBmOWE1Y2IzZGFlZTk5MzU4MGMiLCJlbWFpbCI6Im1oYXNrZXBhdmFua3VtYXJAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzAzNDA4ODM0LCJleHAiOjE3MDM0OTUyMzR9.52XbIt2AIgVU07M8W8BBCAAcyFrXCepZmHTBHQ2PQb8";
  console.log("token in customer is : ", token);
  const url = `${base_url}products/`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  //   const response = await axios.get(url);
  console.log("Response in productService is : ", response);

  return response.data;
};

const productService = {
  getProducts,
};

export default productService; // export the service
