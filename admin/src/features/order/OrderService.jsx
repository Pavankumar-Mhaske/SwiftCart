import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Token } from "../Token";

const getOrders = async () => {
  const token = Token;

  console.log("token in OrderService is : ", token);
  const url = `${base_url}orders/list/admin`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  //   const response = await axios.get(url);
  console.log("Response in OrderService is : ", response);

  return response.data;
};

// getAOrder 
const getAOrder = async (orderId) => {
  const token = Token;

  console.log("token in OrderService is : ", token);
  const url = `${base_url}orders/${orderId}`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  //   const response = await axios.get(url);
  console.log("Response in OrderService is : 🤍🤍", response);

  return response.data;
};

const OrderService = {
  getOrders,
  getAOrder,
};

export default OrderService; // export the service
