import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Token } from "../Token";

const getColors = async () => {
  const token = Token;

  console.log("token in Colorservice is : ", token);
  const url = `${base_url}colors/`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  //   const response = await axios.get(url);
  console.log("Response in Colorservice is : ", response);

  return response.data;
};

const createColor = async (color) => {
  const token = Token;
  console.log("token in colorService is : ", token);
  console.log("color in colorService is : ", color);
  const url = `${base_url}colors/`;

  const response = await axios.post(url, color, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("Response in colorService is : ", response);

  return response.data;
};

const getAColor = async (colorId) => {
  const token = Token;

  console.log("token in ColorService is : ", token);
  const url = `${base_url}colors/${colorId}`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  //   const response = await axios.get(url);
  console.log("Response in ColorService is : ", response);

  return response.data;
};

const updateColor = async (data) => {
  const token = Token;

  console.log("token in update colorService is : ", token);
  console.log("data in update colorService is : ", data);
  const { colorId, name } = data;
  console.log("colorId and name in update colorService is : ", colorId, name);
  const url = `${base_url}colors/${colorId}`;
  const response = await axios.patch(
    url,
    { name: name },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  console.log("Response in colorService is : ", response);

  return response.data;
};

const deleteColor = async (colorId) => {
  const token = Token;
  console.log("token in ColorService is : ", token);
  const url = `${base_url}colors/${colorId}`;
  const response = await axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
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
