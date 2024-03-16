import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/AxiosConfig";

const login = async (userData) => {
  const url = `${base_url}users/admin-login/`;
  const response = await axios.post(url, userData);
  console.log("Response in auth is : ", response);
  console.log("user in auth is : ", response.data.data.user);
  console.log("Response in login auth is : ", response);
  if (response.data.data.user.accessToken) {
    localStorage.setItem("adminUser", JSON.stringify(response.data.data.user));
    console.log(
      "response.data.data.user.accessToken in login auth is : ",
      response.data.data.user
    );
  }

  // Optionally, you can try to set a custom cookie on the client side for non-HTTP-only cookies
  // document.cookie = `customCookie=${response.data.data.user.accessToken}; path=/;`;

  // Accessing cookies in client-side JavaScript
  // Using document.cookie
  const allCookies = document.cookie;
  console.log("accessedToken in login auth is : 😎😎", allCookies);
  // console.log("accessedToken in login auth is : 😎😎", accessedToken);

  return response.data;
};

// getMonthwiseOrderIncome
const getMonthwiseOrdersIncome = async () => {
  const url = `${base_url}users/get-monthwise-orders-info`;
  try {
    const response = await axios.get(url, config);
    console.log("Response in userService is : ", response);
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

// getOrderListAdmin
const getOrderListAdmin = async () => {
  const url = `${base_url}orders/list/admin`;
  try {
    const response = await axios.get(url, config);
    console.log("Response in userService is : ", response);
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

const authService = {
  login,
  getMonthwiseOrdersIncome,
  getOrderListAdmin,
};

export default authService; // export the service
