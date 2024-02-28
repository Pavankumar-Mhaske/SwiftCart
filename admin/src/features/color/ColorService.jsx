import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/AxiosConfig";

const getColors = async () => {
  const url = `${base_url}colors/`;
  const response = await axios.get(url, config);
  //   const response = await axios.get(url);
  console.log("Response in Colorservice is : ", response);

  return response.data;
};

const createColor = async (color) => {
  console.log("color in colorService is : ", color);
  const url = `${base_url}colors/`;

  const response = await axios.post(url, color, config);

  console.log("Response in colorService is : ", response);

  return response.data;
};

const getAColor = async (colorId) => {
  const url = `${base_url}colors/${colorId}`;
  const response = await axios.get(url, config);
  //   const response = await axios.get(url);
  console.log("Response in ColorService is : ", response);

  return response.data;
};

const updateColor = async (data) => {
  console.log("data in update colorService is : ", data);
  const { colorId, name } = data;
  console.log("colorId and name in update colorService is : ", colorId, name);
  const url = `${base_url}colors/${colorId}`;
  const response = await axios.patch(
    url,
    { name: name },
    config
  );

  console.log("Response in colorService is : ", response);

  return response.data;
};

const deleteColor = async (colorId) => {
  const url = `${base_url}colors/${colorId}`;
  const response = await axios.delete(url, config);
  //   const response = await axios.get(url);
  console.log("Response in ColorService is : ", response);

  return response.data;
};

const ColorService = {
  getColors,
  createColor,
  getAColor,
  updateColor,
  deleteColor,
};

export default ColorService; // export the service
