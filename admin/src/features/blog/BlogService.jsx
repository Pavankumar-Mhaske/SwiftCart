import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Token } from "../Token";

const getBlogs = async () => {
  const token = Token;

  console.log("token in Blogservice is : ", token);
  const url = `${base_url}blogs/`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  //   const response = await axios.get(url);
  console.log("Response in Blogservice is : ", response);

  return response.data;
};

const createBlog = async (blog) => {
  const token = Token;

  console.log("token in blogService is : ", token);
  console.log("blog in blogService is : ", blog);
  const url = `${base_url}blogs/`;
  const response = await axios.post(url, blog, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("Response in blogService is : ", response);

  return response.data;
};

const Blogservice = {
  getBlogs,
  createBlog,
};

export default Blogservice; // export the service
