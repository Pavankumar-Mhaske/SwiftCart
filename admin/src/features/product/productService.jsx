import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/AxiosConfig";

const getProducts = async () => {
  const url = `${base_url}products/`;

  try {
    const response = await axios.get(url, config);
    //   const response = await axios.get(url);
    console.log("Response in productService is : ", response);

    return response.data;
  } catch (error) {
    // console.log("error in userService is 💖💖💖💖💖💖💖💖💖💖: ", error);
    // console.log(
    //   "statusCode in userService is ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐: ",
    //   error?.response?.data?.statusCode
    // );
    const statusCode = error?.response?.data?.statusCode;
    if ([401, 403].includes(statusCode)) {
      alert(`JWT Expired, Please login again!`);
      localStorage.clear(); // Clear local storage on authentication issues
      window.location.href = "/admin-login"; // Redirect to login page
      // window.location.reload();
    }
  }
};

const createProduct = async (product) => {
  console.log("product in productService is : ", product);
  const url = `${base_url}products/`;

  try {
    const response = await axios.post(url, product, config);

    console.log("Response in productService is : ", response);

    return response.data;
  } catch (error) {
    // console.log("error in userService is 💖💖💖💖💖💖💖💖💖💖: ", error);
    // console.log(
    //   "statusCode in userService is ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐: ",
    //   error?.response?.data?.statusCode
    // );
    const statusCode = error?.response?.data?.statusCode;
    if ([401, 403].includes(statusCode)) {
      alert(`JWT Expired, Please login again!`);
      localStorage.clear(); // Clear local storage on authentication issues
      window.location.href = "/admin-login"; // Redirect to login page
      // window.location.reload();
    }
  }
};

const productService = {
  getProducts,
  createProduct,
};

export default productService; // export the service
