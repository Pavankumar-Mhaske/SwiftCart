import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/AxiosConfig";

const getProducts = async () => {
  const url = `${base_url}products/`;
  const response = await axios.get(url, config);
  //   const response = await axios.get(url);
  console.log("Response in productService is : ", response);

  return response.data;
};

const createProduct = async (product) => {
  console.log("product in productService is : ", product);
  const url = `${base_url}products/`;
  const response = await axios.post(url, product, config);

  console.log("Response in productService is : ", response);

  return response.data;
};

const productService = {
  getProducts,
  createProduct,
};

export default productService; // export the service
