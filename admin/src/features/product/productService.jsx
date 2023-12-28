import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Token } from "../Token";

const getProducts = async () => {
  const token = Token;

  console.log("token in productService is : ", token);
  const url = `${base_url}products/`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  //   const response = await axios.get(url);
  console.log("Response in productService is : ", response);

  return response.data;
};

const createProduct = async (product) => {
  const token = Token;

  console.log("token in productService is : ", token);
  console.log("product in productService is : ", product);
  const url = `${base_url}products/`;
  product = {
    name: "Product 23",
    description: "<p>fd</p>",
    //   "description": "Product description",
    price: 50,
    stock: 120,
    // "soldItems": 20,
    brand: "APPLE",
    colors: [
      "653cedcf7d3bc7fc1be0efd5",
      "653cee117d3bc7fc1be0efdd",
      "653cee827d3bc7fc1be0efe1",
    ],
    tags: ["POPULAR", "FEATURED", "TOP_RATED"],
    category: "652b9ce6b8fd6a63e2dcd856",
  };
  const response = await axios.post(url, product, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("Response in productService is : ", response);

  return response.data;
};

const productService = {
  getProducts,
  createProduct,
};

export default productService; // export the service
