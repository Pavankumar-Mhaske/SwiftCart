import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/AxiosConfig";

const getBlogCategories = async () => {
  const url = `${base_url}blog-categories/`;
  const response = await axios.get(url, config);
  //   const response = await axios.get(url);
  console.log("Response in BlogCategoryService is : ", response);

  return response.data;
};

const createBlogCategory = async (BlogCategory) => {
  console.log("BlogCategory in BlogCategoryService is : ", BlogCategory);
  const url = `${base_url}blog-categories/`;
  const response = await axios.post(url, BlogCategory, config);

  console.log("Response in BlogCategoryService is : ", response);

  return response.data;
};

const getABlogCategory = async (blogCategoryId) => {
  const url = `${base_url}blog-categories/${blogCategoryId}`;
  const response = await axios.get(url, config);
  //   const response = await axios.get(url);
  console.log("Response in BlogCategoryService is : ", response);

  return response.data;
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
  const response = await axios.patch(
    url,
    { name: name },
    config
  );

  console.log("Response in blogCategoryService is : ", response);

  return response.data;
};

const deleteBlogCategory = async (blogCategoryId) => {
  const url = `${base_url}blog-categories/${blogCategoryId}`;
  const response = await axios.delete(url, config);
  //   const response = await axios.get(url);
  console.log("Response in BlogCategoryService is : ", response);

  return response.data;
};

const BlogCategoryService = {
  getBlogCategories,
  createBlogCategory,
  getABlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};

export default BlogCategoryService; // export the service
