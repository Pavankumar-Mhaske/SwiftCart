import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Token } from "../Token";

const getBrands = async () => {
  const token = Token;

  console.log("token in BrandService is : ", token);
  const url = `${base_url}brands/`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  //   const response = await axios.get(url);
  console.log("Response in BrandService is : ", response);

  return response.data;
};

const createBrand = async (brand) => {
  const token = Token;

  console.log("token in brandService is : ", token);
  console.log("brand in brandService is : ", brand);
  const url = `${base_url}brands/`;
  const response = await axios.post(url, brand, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("Response in brandService is : ", response);

  return response.data;
};

const getABrand = async (brandId) => {
  const token = Token;

  console.log("token in BrandService is : ", token);
  const url = `${base_url}brands/${brandId}`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  //   const response = await axios.get(url);
  console.log("Response in BrandService is : ", response);

  return response.data;
};

const updateBrand = async (data) => {
  const token = Token;

  console.log("token in update brandService is : ", token);
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

const BrandService = {
  getBrands,
  createBrand,
  getABrand,
  updateBrand,
};

export default BrandService; // export the service
