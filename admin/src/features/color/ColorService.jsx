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

const Colorservice = {
  getColors,
};

export default Colorservice; // export the service
