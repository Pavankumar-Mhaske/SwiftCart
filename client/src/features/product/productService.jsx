import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/AxiosConfig";

const getProducts = async (data) => {
  console.log("data in productService is 😍😍: ", data);
  //   const token = Token;
  //   console.log("token in productService is : ", token);
  // console.log("brand==='' ? ", data?.brand === "" ? "true" : "false");
  console.log("data: ", data);

  // const url = `${base_url}products?${
  //   data?.brand ? `brand=${data?.brand}` : ""
  // }`;
  const url = `${base_url}products?${
    data?.brand && data.brand.length > 0 ? `brand=${data.brand}&&` : ""
  }${data?.tag && data.tag.length > 0 ? `tags=${data.tag}&&` : ""}${
    data?.category && data.category.length > 0
      ? `category=${data.category}&&`
      : ""
  }
  ${data?.color && data.color.length > 0 ? `colors=${data.color}&&` : ""}
  ${data?.minPrice ? `price[gte]=${data.minPrice}&&` : ""}
  `;
  // `price[gte]=${Number(data.minPrice)}&`
  console.log("url in productService is 😍😍: ", url);
  const response = await axios.get(url);
  console.log("Response in productService is : ", response);

  return response.data;
};

const getAProduct = async (productId) => {
  console.log("productId in productService is  ", productId);
  const url = `${base_url}products/${productId}`;
  const response = await axios.get(url, config);
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

// reviewsAndRating
const addReviewsAndRating = async (data) => {
  const { productId, finalData } = data;
  const url = `${base_url}products/review-rating/${productId}`;
  console.log("config", config);
  const response = await axios.post(url, finalData, config);
  console.log("Response in productService is 😀 : ", response);
  return response.data;
};

const ProductService = {
  getProducts,
  getAProduct,
  addRemoveProductInWishList,
  addReviewsAndRating,
};

export default ProductService; // export the service
