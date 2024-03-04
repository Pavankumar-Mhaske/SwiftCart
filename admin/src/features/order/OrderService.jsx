import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/AxiosConfig";

const getOrders = async () => {
  const url = `${base_url}orders/list/admin`;
  const response = await axios.get(url, config);
  //   const response = await axios.get(url);
  console.log("Response in OrderService is : ", response);

  return response.data;
};

// getAOrder
const getAOrder = async (orderId) => {
  const url = `${base_url}orders/${orderId}`;
  const response = await axios.get(url, config);
  //   const response = await axios.get(url);
  console.log("Response in OrderService is : 🌳🌳🌳", response);

  return response.data;
};

// updateOrderStatus
const updateOrderStatus = async (orderData) => {
  const { orderId, status } = orderData;
  const url = `${base_url}orders/status/${orderId}`;
  const response = await axios.patch(url, { status: status }, config);
  console.log("Response in OrderService is : ", response);

  return response.data;
};

const OrderService = {
  getOrders,
  getAOrder,
  updateOrderStatus,
};

export default OrderService; // export the service
