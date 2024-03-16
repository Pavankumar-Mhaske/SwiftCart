import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/AxiosConfig";

const getEnquiries = async () => {
  const url = `${base_url}enquiries/`;
  try {
    const response = await axios.get(url, config);
    //   const response = await axios.get(url);
    console.log("Response in EnquiryService is : ", response);

    return response.data;
  } catch (error) {
    // console.log("error in userService is 💖💖💖💖💖💖💖💖💖💖: ", error);
    // console.log(
    //   "statusCode in userService is ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐: ",
    //   error?.response?.data?.statusCode
    // );
    const statusCode = error?.response?.data?.statusCode;
    if ([401, 403].includes(statusCode)) {
      alert(`JWT Expired, Please login again!`);
      localStorage.clear(); // Clear local storage on authentication issues
      window.location.href = "/admin-login"; // Redirect to login page
      // window.location.reload();
    }
  }
};

const createEnquiry = async (enquiry) => {
  console.log("enquiry in enquiryService is : ", enquiry);
  const url = `${base_url}enquiries/`;
  try {
    const response = await axios.post(url, enquiry, config);

    console.log("Response in enquiryService is : ", response);

    return response.data;
  } catch (error) {
    // console.log("error in userService is 💖💖💖💖💖💖💖💖💖💖: ", error);
    // console.log(
    //   "statusCode in userService is ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐: ",
    //   error?.response?.data?.statusCode
    // );
    const statusCode = error?.response?.data?.statusCode;
    if ([401, 403].includes(statusCode)) {
      alert(`JWT Expired, Please login again!`);
      localStorage.clear(); // Clear local storage on authentication issues
      window.location.href = "/admin-login"; // Redirect to login page
      // window.location.reload();
    }
  }
};

const getAEnquiry = async (enquiryId) => {
  const url = `${base_url}enquiries/${enquiryId}`;
  try {
    const response = await axios.get(url, config);
    //   const response = await axios.get(url);
    console.log("Response in EnquiryService is : ", response);

    return response.data;
  } catch (error) {
    // console.log("error in userService is 💖💖💖💖💖💖💖💖💖💖: ", error);
    // console.log(
    //   "statusCode in userService is ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐: ",
    //   error?.response?.data?.statusCode
    // );
    const statusCode = error?.response?.data?.statusCode;
    if ([401, 403].includes(statusCode)) {
      alert(`JWT Expired, Please login again!`);
      localStorage.clear(); // Clear local storage on authentication issues
      window.location.href = "/admin-login"; // Redirect to login page
      // window.location.reload();
    }
  }
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
  try {
    const response = await axios.patch(url, { status: status }, config);

    console.log("Response in enquiryService is : ", response);

    return response.data;
  } catch (error) {
    // console.log("error in userService is 💖💖💖💖💖💖💖💖💖💖: ", error);
    // console.log(
    //   "statusCode in userService is ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐: ",
    //   error?.response?.data?.statusCode
    // );
    const statusCode = error?.response?.data?.statusCode;
    if ([401, 403].includes(statusCode)) {
      alert(`JWT Expired, Please login again!`);
      localStorage.clear(); // Clear local storage on authentication issues
      window.location.href = "/admin-login"; // Redirect to login page
      // window.location.reload();
    }
  }
};

const deleteEnquiry = async (enquiryId) => {
  const url = `${base_url}enquiries/${enquiryId}`;
  try {
    const response = await axios.delete(url, config);
    //   const response = await axios.get(url);
    console.log("Response in EnquiryService is : ", response);

    return response.data;
  } catch (error) {
    // console.log("error in userService is 💖💖💖💖💖💖💖💖💖💖: ", error);
    // console.log(
    //   "statusCode in userService is ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐: ",
    //   error?.response?.data?.statusCode
    // );
    const statusCode = error?.response?.data?.statusCode;
    if ([401, 403].includes(statusCode)) {
      alert(`JWT Expired, Please login again!`);
      localStorage.clear(); // Clear local storage on authentication issues
      window.location.href = "/admin-login"; // Redirect to login page
      // window.location.reload();
    }
  }
};

const EnquiryService = {
  getEnquiries,
  createEnquiry,
  getAEnquiry,
  updateEnquiry,
  deleteEnquiry,
};

export default EnquiryService; // export the service
