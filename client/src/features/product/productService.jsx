import axios from "axios";
import { base_url } from "../../utils/base_url";
// import { Token } from "../Token";

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

const addToWishList = async (productId) => {
  const url = `${base_url}products/wishlist/${productId}`;
  const response = await axios.post();
  console.log("Response in productService is : ", response);

  return response.data;
};

const ProductService = {
  getProducts,
  addToWishList,
};

export default ProductService; // export the service
