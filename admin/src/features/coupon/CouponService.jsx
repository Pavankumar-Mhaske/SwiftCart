import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/AxiosConfig";

const getCoupons = async () => {
  const url = `${base_url}coupons/`;
  const response = await axios.get(url, config);
  //   const response = await axios.get(url);
  console.log("Response in CouponService is : ", response);

  return response.data;
};

const createCoupon = async (coupon) => {
  console.log("coupon in couponService is : ", coupon);
  const url = `${base_url}coupons/`;
  const response = await axios.post(url, coupon, config);

  console.log("Response in couponService is : ", response);

  return response.data;
};

const getACoupon = async (couponId) => {
  const url = `${base_url}coupons/${couponId}`;
  const response = await axios.get(url, config);
  //   const response = await axios.get(url);
  console.log("Response in CouponService is : ", response);

  return response.data;
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
  const response = await axios.patch(url, couponToUpdate, config);

  console.log("Response in couponService is : ", response);

  return response.data;
};

const deleteCoupon = async (couponId) => {
  const url = `${base_url}coupons/${couponId}`;
  const response = await axios.delete(url, config);
  //   const response = await axios.get(url);
  console.log("Response in CouponService is : ", response);

  return response.data;
};

const CouponService = {
  getCoupons,
  createCoupon,
  getACoupon,
  updateCoupon,
  deleteCoupon,
};

export default CouponService; // export the service
