import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/AxiosConfig";

const getProductCategories = async () => {
  const url = `${base_url}product-categories/`;
  const response = await axios.get(url, config);
  //   const response = await axios.get(url);
  console.log("Response in ProductCategoryService is : ", response);

  return response.data;
};

const createProductCategory = async (productCategory) => {
  console.log(
    "productCategory in productCategoryService is : ",
    productCategory
  );
  const url = `${base_url}product-categories/`;

  const response = await axios.post(url, productCategory, config);

  console.log("Response in productCategoryService is : ", response);

  return response.data;
};

const getAProductCategory = async (productCategoryId) => {
  const url = `${base_url}product-categories/${productCategoryId}`;
  const response = await axios.get(url, config);
  //   const response = await axios.get(url);
  console.log("Response in ProductCategoryService is : ", response);

  return response.data;
};

const updateProductCategory = async (data) => {
  console.log("data in update productCategoryService is : ", data);
  const { productCategoryId, name } = data;
  console.log(
    "productCategoryId and name in update productCategoryService is : ",
    productCategoryId,
    name
  );
  const url = `${base_url}product-categories/${productCategoryId}`;
  const response = await axios.patch(
    url,
    { name: name },
    config
  );

  console.log("Response in ProductCategoryService is : ", response);

  return response.data;
};

const deleteProductCategory = async (productCategoryId) => {
  const url = `${base_url}product-categories/${productCategoryId}`;
  const response = await axios.delete(url, config);
  //   const response = await axios.get(url);
  console.log("Response in ProductCategoryService is : ", response);

  return response.data;
};

const ProductCategoryService = {
  getProductCategories,
  createProductCategory,
  getAProductCategory,
  updateProductCategory,
  deleteProductCategory,
};

export default ProductCategoryService; // export the service
