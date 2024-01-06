import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Token } from "../Token";

const getCoupons = async () => {
  const token = Token;

  console.log("token in CouponService is : ", token);
  const url = `${base_url}coupons/`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  //   const response = await axios.get(url);
  console.log("Response in CouponService is : ", response);

  return response.data;
};

const createCoupon = async (coupon) => {
  const token = Token;

  console.log("token in couponService is : ", token);
  console.log("coupon in couponService is : ", coupon);
  const url = `${base_url}coupons/`;
  const response = await axios.post(url, coupon, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("Response in couponService is : ", response);

  return response.data;
};

const getACoupon = async (couponId) => {
  const token = Token;

  console.log("token in CouponService is : ", token);
  const url = `${base_url}coupons/${couponId}`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  //   const response = await axios.get(url);
  console.log("Response in CouponService is : ", response);

  return response.data;
};

const updateCoupon = async (data) => {
  const token = Token;

  console.log("token in update couponService is : ", token);
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
  const response = await axios.patch(url, couponToUpdate, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("Response in couponService is : ", response);

  return response.data;
};

const deleteCoupon = async (couponId) => {
  const token = Token;
  console.log("token in CouponService is : ", token);
  const url = `${base_url}coupons/${couponId}`;
  const response = await axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
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
