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

const Blogservice = {
  getBlogs,
};

export default Blogservice; // export the service
