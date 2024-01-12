import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/AxiosConfig";

const getBlogs = async () => {
  const url = `${base_url}blogs/`;
  const response = await axios.get(url, config);
  console.log("Response in userService is : ", response);

  return response.data;
};

const BlogService = {
  getBlogs,
};

export default BlogService; // export the service
