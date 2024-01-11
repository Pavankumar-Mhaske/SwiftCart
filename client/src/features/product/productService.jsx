import axios from "axios";
import { base_url } from "../../utils/base_url";
import { configureStore } from "@reduxjs/toolkit";
import { config } from "../../utils/AxiosConfig";

const getProducts = async () => {
  //   const token = Token;
  //   console.log("token in productService is : ", token);
  const url = `${base_url}products/`;
  const response = await axios.get(url);
  console.log("Response in productService is : ", response);

  return response.data;
};

const addRemoveProductInWishList = async (productId) => {
  const url = `${base_url}products/wishlist/${productId}`;
  console.log("config", config);
  const response = await axios.post(url, null, config);
  console.log("Response in productService is 😀 : ", response);

  return response.data;
};

const ProductService = {
  getProducts,
  addRemoveProductInWishList,
};

export default ProductService; // export the service
