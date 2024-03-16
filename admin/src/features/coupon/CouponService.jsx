import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/AxiosConfig";

const getCoupons = async () => {
  const url = `${base_url}coupons/`;
  try {
    const response = await axios.get(url, config);
    //   const response = await axios.get(url);
    console.log("Response in CouponService is : ", response);

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

const createCoupon = async (coupon) => {
  console.log("coupon in couponService is : ", coupon);
  const url = `${base_url}coupons/`;
  try {
    const response = await axios.post(url, coupon, config);

    console.log("Response in couponService is : ", response);

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

const getACoupon = async (couponId) => {
  const url = `${base_url}coupons/${couponId}`;
  try {
    const response = await axios.get(url, config);
    //   const response = await axios.get(url);
    console.log("Response in CouponService is : ", response);

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

const updateCoupon = async (data) => {
  console.log("data in update couponService is : ", data);
  const {
    couponId,
    name,
    couponCode,
    type,
    discountValue,
    isActive,
    minimumCartValue,
    startDate,
    expiryDate,
  } = data;

  console.log(
    "couponId and name in update couponService is : ",
    couponId,
    name,
    couponCode,
    type,
    discountValue,
    isActive,
    minimumCartValue,
    startDate,
    expiryDate
  );
  const couponToUpdate = {
    name: name,
    couponCode: couponCode,
    type: type,
    discountValue: discountValue,
    isActive: isActive,
    minimumCartValue: minimumCartValue,
    startDate: startDate,
    expiryDate: expiryDate,
  };
  const url = `${base_url}coupons/${couponId}`;
  try {
    const response = await axios.patch(url, couponToUpdate, config);

    console.log("Response in couponService is : ", response);

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

const deleteCoupon = async (couponId) => {
  const url = `${base_url}coupons/${couponId}`;
  try {
    const response = await axios.delete(url, config);
    //   const response = await axios.get(url);
    console.log("Response in CouponService is : ", response);

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

const CouponService = {
  getCoupons,
  createCoupon,
  getACoupon,
  updateCoupon,
  deleteCoupon,
};

export default CouponService; // export the service
