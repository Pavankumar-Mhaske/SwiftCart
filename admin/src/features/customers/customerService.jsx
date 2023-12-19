import axios from "axios";
import { base_url } from "../../utils/base_url";

const getUsers = async () => {
  const url = `${base_url}users/all-users/`;
  const response = await axios.get(url);
  console.log("Response in customer is : ", response);

  return response.data;
};

const customerService = {
  getUsers,
};

export default customerService; // export the service
