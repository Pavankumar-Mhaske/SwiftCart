import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/AxiosConfig";

// getUserWishList
const getUserWishList = async () => {
  const url = `${base_url}users/wishlist/`;
  const response = await axios.get(url, config);
  console.log("Response in userService is : ", response);

  return response.data;
};

//  getUserCart
const getUserCart = async () => {
  const url = `${base_url}users/cart/`;
  const response = await axios.get(url, config);
  console.log("Response in userService is : ", response);
  return response.data;
};

const addItemOrUpdateItemQuantity = async (cartData) => {
  const { productId, quantity } = cartData;
  const url = `${base_url}cart/item/${productId}/`;
  const response = await axios.post(url, { quantity: quantity }, config);
  console.log("Response in userService is : ", response);
  return response.data;
};

const removeItemFromCart = async (productId) => {
  const url = `${base_url}cart/item/${productId}/`;
  const response = await axios.delete(url, config);
  console.log("Response in userService is : ", response);
  return response.data;
};

const createAddress = async (addressData) => {
  console.log("addressData in userService is : ", addressData);
  const url = `${base_url}addresses/`;
  const response = await axios.post(url, addressData, config);
  console.log("Response in userService is : ", response);
  return response.data;
};

// get user orders
const getUserOrders = async () => {
  const url = `${base_url}users/user-orders/`;
  const response = await axios.get(url, config);
  console.log("Response in userService is : ", response);
  return response.data;
};

// update user profile
// firstname, lastname, email, mobile, password
const updateUserProfile = async (userData) => {
  const url = `${base_url}users/update-user/`;
  const response = await axios.patch(url, userData, config);
  console.log("Response in userService is : ", response);
  return response.data;
};

// forgotPasswordRequest
const forgotPasswordRequest = async (email) => {
  const url = `${base_url}users/forgot-password/`;
  const response = await axios.post(url, { email: email }, config);
  console.log("Response in userService is : ", response);
  return response.data;
};

const UserService = {
  getUserWishList,
  getUserCart,
  addItemOrUpdateItemQuantity,
  removeItemFromCart,
  createAddress,
  getUserOrders,
  updateUserProfile,
  forgotPasswordRequest,
};

export default UserService; // export the service
