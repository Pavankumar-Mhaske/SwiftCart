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

const EnquiryService = {
  getEnquiries,
};

export default EnquiryService; // export the service
