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

const getABlog = async (blogId) => {
  const token = Token;

  console.log("token in BlogService is : ", token);
  const url = `${base_url}blogs/${blogId}`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  //   const response = await axios.get(url);
  console.log("Response in BlogService is : ", response);

  return response.data;
};

const updateBlog = async (data) => {
  const token = Token;

  console.log("token in update blogService is : ", token);
  console.log("data in update blogService is : ", data);
  const { blogId, title, description, category } = data;
  console.log("blogId and name in update blogService is : ", blogId, name);
  const url = `${base_url}blogs/${blogId}`;
  const response = await axios.patch(
    url,
    { title: title, description: description, category: category },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  console.log("Response in blogService is : ", response);

  return response.data;
};

const deleteBlog = async (blogId) => {
  const token = Token;
  console.log("token in BlogService is : ", token);
  const url = `${base_url}blogs/${blogId}`;
  const response = await axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
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
