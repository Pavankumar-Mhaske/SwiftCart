import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/AxiosConfig";

const getProductCategories = async () => {
  const url = `${base_url}product-categories/`;
  try {
    const response = await axios.get(url, config);
    //   const response = await axios.get(url);
    console.log("Response in ProductCategoryService is : ", response);

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

const createProductCategory = async (productCategory) => {
  console.log(
    "productCategory in productCategoryService is : ",
    productCategory
  );
  const url = `${base_url}product-categories/`;
  try {
    const response = await axios.post(url, productCategory, config);

    console.log("Response in productCategoryService is : ", response);

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

const getAProductCategory = async (productCategoryId) => {
  const url = `${base_url}product-categories/${productCategoryId}`;
  try {
    const response = await axios.get(url, config);
    //   const response = await axios.get(url);
    console.log("Response in ProductCategoryService is : ", response);

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

const updateProductCategory = async (data) => {
  console.log("data in update productCategoryService is : ", data);
  const { productCategoryId, name } = data;
  console.log(
    "productCategoryId and name in update productCategoryService is : ",
    productCategoryId,
    name
  );
  const url = `${base_url}product-categories/${productCategoryId}`;
  try {
    const response = await axios.patch(url, { name: name }, config);

    console.log("Response in ProductCategoryService is : ", response);

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

const deleteProductCategory = async (productCategoryId) => {
  const url = `${base_url}product-categories/${productCategoryId}`;
  try {
    const response = await axios.delete(url, config);
    //   const response = await axios.get(url);
    console.log("Response in ProductCategoryService is : ", response);

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

const ProductCategoryService = {
  getProductCategories,
  createProductCategory,
  getAProductCategory,
  updateProductCategory,
  deleteProductCategory,
};

export default ProductCategoryService; // export the service
