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

const CouponService = {
  getCoupons,
  createCoupon,
};

export default CouponService; // export the service
