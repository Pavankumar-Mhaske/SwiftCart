import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/AxiosConfig";

const getUserWishList = async () => {
  const url = `${base_url}users/wishlist/`;
  const response = await axios.get(url, config);
  console.log("Response in userService is : ", response);

  return response.data;
};

const addItemOrUpdateItemQuantity = async (productId, quantity) => {
  const url = `${base_url}cart/item/${productId}/`;
  const response = await axios.post(url, quantity, config);
  console.log("Response in userService is : ", response);
  return response.data;
};

const UserService = {
  getUserWishList,
  addItemOrUpdateItemQuantity,
};

export default UserService; // export the service
