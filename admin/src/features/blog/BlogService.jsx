import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/AxiosConfig";

const getBlogs = async () => {
 
  const url = `${base_url}blogs/`;
  const response = await axios.get(url, config);
  //   const response = await axios.get(url);
  console.log("Response in Blogservice is : ", response);

  return response.data;
};

const createBlog = async (blog) => {
 
  console.log("blog in blogService is : ", blog);
  const url = `${base_url}blogs/`;
  const response = await axios.post(url, blog, config);

  console.log("Response in blogService is : ", response);

  return response.data;
};

const getABlog = async (blogId) => {
   const url = `${base_url}blogs/${blogId}`;
  const response = await axios.get(url, config);
  //   const response = await axios.get(url);
  console.log("Response in BlogService is : ", response);

  return response.data;
};

const updateBlog = async (data) => {
   console.log("data in update blogService is : ", data);
  const { blogId, title, category, description } = data;
  console.log("blogId and name in update blogService is : ", blogId, name);
  const url = `${base_url}blogs/${blogId}`;
  const blogToUpdate = {
    title: title,
    category: category,
    description: description,
  };

  const response = await axios.patch(
    url,
    { ...blogToUpdate },
    config
  );

  console.log("Response in blogService is : ", response);

  return response.data;
};

const deleteBlog = async (blogId) => {
   const url = `${base_url}blogs/${blogId}`;
  const response = await axios.delete(url, config);
  //   const response = await axios.get(url);
  console.log("Response in BlogService is : ", response);

  return response.data;
};

const Blogservice = {
  getBlogs,
  createBlog,
  getABlog,
  updateBlog,
  deleteBlog,
};

export default Blogservice; // export the service
