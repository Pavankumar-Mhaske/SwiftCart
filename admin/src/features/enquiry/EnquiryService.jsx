import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/AxiosConfig";

const getEnquiries = async () => {
  const url = `${base_url}enquiries/`;
  const response = await axios.get(url, config);
  //   const response = await axios.get(url);
  console.log("Response in EnquiryService is : ", response);

  return response.data;
};

const createEnquiry = async (enquiry) => {
  console.log("enquiry in enquiryService is : ", enquiry);
  const url = `${base_url}enquiries/`;
  const response = await axios.post(url, enquiry, config);

  console.log("Response in enquiryService is : ", response);

  return response.data;
};

const getAEnquiry = async (enquiryId) => {
  const url = `${base_url}enquiries/${enquiryId}`;
  const response = await axios.get(url, config);
  //   const response = await axios.get(url);
  console.log("Response in EnquiryService is : ", response);

  return response.data;
};

const updateEnquiry = async (data) => {
  console.log("data in update enquiryService is : ", data);
  const { enquiryId, status } = data;
  console.log(
    "enquiryId and name in update enquiryService is : ",
    enquiryId,
    name
  );
  const url = `${base_url}enquiries/${enquiryId}`;
  const response = await axios.patch(
    url,
    { status: status },
    config
  );

  console.log("Response in enquiryService is : ", response);

  return response.data;
};

const deleteEnquiry = async (enquiryId) => {
  const url = `${base_url}enquiries/${enquiryId}`;
  const response = await axios.delete(url, config);
  //   const response = await axios.get(url);
  console.log("Response in EnquiryService is : ", response);

  return response.data;
};

const EnquiryService = {
  getEnquiries,
  createEnquiry,
  getAEnquiry,
  updateEnquiry,
  deleteEnquiry,
};

export default EnquiryService; // export the service
