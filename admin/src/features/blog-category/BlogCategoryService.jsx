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

const BlogCategoryService = {
  getBlogCategories,
};

export default BlogCategoryService; // export the service
