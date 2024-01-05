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
  console.log(
    "productCategory in productCategoryService is : ",
    productCategory
  );
  const url = `${base_url}product-categories/`;

  const response = await axios.post(url, productCategory, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("Response in productCategoryService is : ", response);

  return response.data;
};

const getAProductCategory = async (productCategoryId) => {
  const token = Token;

  console.log("token in ProductCategoryService is : ", token);
  const url = `${base_url}product-categories/${productCategoryId}`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  //   const response = await axios.get(url);
  console.log("Response in ProductCategoryService is : ", response);

  return response.data;
};

const updateProductCategory = async (data) => {
  const token = Token;

  console.log("token in update productCategoryService is : ", token);
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
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  console.log("Response in ProductCategoryService is : ", response);

  return response.data;
};

const deleteProductCategory = async (productCategoryId) => {
  const token = Token;
  console.log("token in ProductCategoryService is : ", token);
  const url = `${base_url}product-categories/${productCategoryId}`;
  const response = await axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
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
