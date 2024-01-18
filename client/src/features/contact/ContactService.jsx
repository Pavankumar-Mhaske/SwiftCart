import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/AxiosConfig";

const createEnquiry = async (enquiry) => {
  //   const token = Token;
  //   console.log("token in productService is : ", token);
  const url = `${base_url}enquiries/`;
  const response = await axios.post(url, enquiry, config);
  console.log("Response in contactService is : ", response);

  return response.data;
};

const ContactService = {
  createEnquiry,
};

export default ContactService; // export the service
