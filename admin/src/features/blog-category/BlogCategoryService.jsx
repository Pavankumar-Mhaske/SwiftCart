import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Token } from "../Token";

const getBlogCategories = async () => {
  const token = Token;

  console.log("token in BlogCategoryService is : ", token);
  const url = `${base_url}blog-categories/`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  //   const response = await axios.get(url);
  console.log("Response in BlogCategoryService is : ", response);

  return response.data;
};

const createBlogCategory = async (BlogCategory) => {
  const token = Token;

  console.log("token in BlogCategoryService is : ", token);
  console.log("BlogCategory in BlogCategoryService is : ", BlogCategory);
  const url = `${base_url}blog-categories/`;
  const response = await axios.post(url, BlogCategory, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("Response in BlogCategoryService is : ", response);

  return response.data;
};

const BlogCategoryService = {
  getBlogCategories,
  createBlogCategory,
};

export default BlogCategoryService; // export the service
