import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/AxiosConfig";

const uploadImages = async (data) => {
  const url = `${base_url}blogs/upload/`;
  const response = await axios.post(url, data, config);
  console.log("response in uploadService is : ", response);
  return response.data;
};

const deleteImages = async (id) => {
  const url = `${base_url}blogs/delete/${id}`;
  const response = await axios.delete(url, config);
  // console.log("response in deleteService is : ", response);
  return response.data;
};

const uploadService = {
  uploadImages,
  deleteImages,
};

export default uploadService; // export the service
