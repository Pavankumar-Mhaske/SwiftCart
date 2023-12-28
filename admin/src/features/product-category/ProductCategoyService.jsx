import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Token } from "../Token";

const getProductCategories = async () => {
  const token = Token;

  console.log("token in ProductCategoryService is : ", token);
  const url = `${base_url}product-categories/`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  //   const response = await axios.get(url);
  console.log("Response in ProductCategoryService is : ", response);

  return response.data;
};

const createProductCategory = async (productCategory) => {
  const token = Token;
  console.log("token in productCategoryService is : ", token);
  console.log("productCategory in productCategoryService is : ", productCategory);
  const url = `${base_url}product-categories/`;
  
  const response = await axios.post(url, productCategory, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("Response in productCategoryService is : ", response);

  return response.data;
};


const ProductCategoryService = {
    getProductCategories,
    createProductCategory,
};

export default ProductCategoryService; // export the service
