import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/AxiosConfig";

const getBrands = async () => {
  const url = `${base_url}brands/`;
  const response = await axios.get(url, config);
  //   const response = await axios.get(url);
  console.log("Response in BrandService is : ", response);

  return response.data;
};

const createBrand = async (brand) => {
  console.log("brand in brandService is : ", brand);
  const url = `${base_url}brands/`;
  const response = await axios.post(url, brand, config);

  console.log("Response in brandService is : ", response);

  return response.data;
};

const getABrand = async (brandId) => {
  const url = `${base_url}brands/${brandId}`;
  const response = await axios.get(url, config);
  //   const response = await axios.get(url);
  console.log("Response in BrandService is : ", response);

  return response.data;
};

const updateBrand = async (data) => {
  console.log("data in update brandService is : ", data);
  const { brandId, name } = data;
  console.log("brandId and name in update brandService is : ", brandId, name);
  const url = `${base_url}brands/${brandId}`;
  const response = await axios.patch(
    url,
    { name: name },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  console.log("Response in brandService is : ", response);

  return response.data;
};

const deleteBrand = async (brandId) => {
  const url = `${base_url}brands/${brandId}`;
  const response = await axios.delete(url, config);
  //   const response = await axios.get(url);
  console.log("Response in BrandService is : ", response);

  return response.data;
};

const BrandService = {
  getBrands,
  createBrand,
  getABrand,
  updateBrand,
  deleteBrand,
};

export default BrandService; // export the service
