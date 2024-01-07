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

const createEnquiry = async (enquiry) => {
  const token = Token;

  console.log("token in enquiryService is : ", token);
  console.log("enquiry in enquiryService is : ", enquiry);
  const url = `${base_url}enquiries/`;
  const response = await axios.post(url, enquiry, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("Response in enquiryService is : ", response);

  return response.data;
};

const getAEnquiry = async (enquiryId) => {
  const token = Token;

  console.log("token in EnquiryService is : ", token);
  const url = `${base_url}enquiries/${enquiryId}`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  //   const response = await axios.get(url);
  console.log("Response in EnquiryService is : ", response);

  return response.data;
};

const updateEnquiry = async (data) => {
  const token = Token;

  console.log("token in update enquiryService is : ", token);
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
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  console.log("Response in enquiryService is : ", response);

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
  createEnquiry,
  getAEnquiry,
  updateEnquiry,
  deleteEnquiry,
};

export default EnquiryService; // export the service
