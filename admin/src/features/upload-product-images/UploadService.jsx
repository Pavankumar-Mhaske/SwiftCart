import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Token } from "../Token";

const uploadImages = async (data) => {
  const token = Token;
  console.log("token in uploadService is : ", token);
  const url = `${base_url}products/upload/6560a001bd382c6228e15855/`;
  const response = await axios.post(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("response in uploadService is : ", response);
  return response.data;
};

// const deleteImages = async (id) => {
//   const token = Token;
//   console.log("token in deleteService is : ", token);
//   const url = `${base_url}products/delete/${id}/`;
//   const response = await axios.delete(url, id, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   console.log("response in deleteService is : ", response);
//   return response.data;
// };

const uploadService = {
  uploadImages,
  // deleteImages,
};

export default uploadService; // export the service
