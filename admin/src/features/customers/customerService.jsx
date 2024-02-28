import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/AxiosConfig";

const getUsers = async () => {
  // Get the token from cookies
  //   const token = Cookies.get("user");

 ;
  const url = `${base_url}users/all-users/`;
  const response = await axios.get(url, config);
  //   const response = await axios.get(url);
  console.log("Response in customer is : ", response);

  return response.data;
};

const customerService = {
  getUsers,
};

export default customerService; // export the service
