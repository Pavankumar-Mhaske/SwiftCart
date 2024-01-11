import axios from "axios";
import { base_url } from "../../utils/base_url";
import { configureStore } from "@reduxjs/toolkit";
// import { Token } from "../Token";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTlkNGYxZGQ1MWIwOTM4OTQ1ZWMxMTEiLCJlbWFpbCI6InBhdmFuQGV4YW1wbGUuY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MDQ5Njk0MjEsImV4cCI6MTcwNTA1NTgyMX0.7jOr-4bP4_gVpLEVLwCEc-i9jEkP6zQk-vhIfhxOnKc";
import { config } from "../../utils/AxiosConfig";

const getProducts = async () => {
  //   const token = Token;
  //   console.log("token in productService is : ", token);
  const url = `${base_url}products/`;
  const response = await axios.get(
    url
    //   , {
    //   headers: { Authorization: `Bearer ${token}` },
    // }
  );
  //   const response = await axios.get(url);
  console.log("Response in productService is : ", response);

  return response.data;
};

const addRemoveProductInWishList = async (productId) => {
  const url = `${base_url}products/wishlist/${productId}`;
  console.log("config", config);
  const response = await axios.post(url, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("Response in productService is 😀 : ", response);

  return response.data;
};

const ProductService = {
  getProducts,
  addRemoveProductInWishList,
};

export default ProductService; // export the service
