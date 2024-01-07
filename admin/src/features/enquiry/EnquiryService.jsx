import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Token } from "../Token";

const getEnquiries = async () => {
  const token = Token;

  console.log("token in EnquiryService is : ", token);
  const url = `${base_url}enquiries/`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  //   const response = await axios.get(url);
  console.log("Response in EnquiryService is : ", response);

  return response.data;
};

const deleteEnquiry = async (enquiryId) => {
  const token = Token;
  console.log("token in EnquiryService is : ", token);
  const url = `${base_url}enquiries/${enquiryId}`;
  const response = await axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  //   const response = await axios.get(url);
  console.log("Response in EnquiryService is : ", response);

  return response.data;
};

const EnquiryService = {
  getEnquiries,
  deleteEnquiry,
};

export default EnquiryService; // export the service
