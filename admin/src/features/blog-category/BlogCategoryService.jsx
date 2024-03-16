import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/AxiosConfig";

const getBlogCategories = async () => {
  const url = `${base_url}blog-categories/`;
  try {
    const response = await axios.get(url, config);
    //   const response = await axios.get(url);
    console.log("Response in BlogCategoryService is : ", response);
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

const createBlogCategory = async (BlogCategory) => {
  console.log("BlogCategory in BlogCategoryService is : ", BlogCategory);
  const url = `${base_url}blog-categories/`;
  try {
    const response = await axios.post(url, BlogCategory, config);

    console.log("Response in BlogCategoryService is : ", response);

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

const getABlogCategory = async (blogCategoryId) => {
  const url = `${base_url}blog-categories/${blogCategoryId}`;
  try {
    const response = await axios.get(url, config);
    //   const response = await axios.get(url);
    console.log("Response in BlogCategoryService is : ", response);

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

const updateBlogCategory = async (data) => {
  console.log("data in update blogCategoryService is : ", data);
  const { blogCategoryId, name } = data;
  console.log(
    "blogCategoryId and name in update blogCategoryService is : ",
    blogCategoryId,
    name
  );
  const url = `${base_url}blog-categories/${blogCategoryId}`;
  try {
    const response = await axios.patch(url, { name: name }, config);

    console.log("Response in blogCategoryService is : ", response);

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

const deleteBlogCategory = async (blogCategoryId) => {
  const url = `${base_url}blog-categories/${blogCategoryId}`;
  try {
    const response = await axios.delete(url, config);
    //   const response = await axios.get(url);
    console.log("Response in BlogCategoryService is : ", response);
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

const BlogCategoryService = {
  getBlogCategories,
  createBlogCategory,
  getABlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};

export default BlogCategoryService; // export the service
