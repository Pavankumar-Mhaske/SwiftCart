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

const Colorservice = {
  getColors,
  createColor,
};

export default Colorservice; // export the service
