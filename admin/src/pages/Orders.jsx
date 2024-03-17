import React from "react";
import { Table, Tag } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../features/order/OrderSlice";
import Meta from "../components/Meta";

const columns = [
  {
    title: "S_No",
    dataIndex: "key",
  },
  // PaymentId
  {
    title: "PaymentId",
    dataIndex: "paymentId",
  },
  // IsPaymentDone
  {
    title: "P. Status",
    dataIndex: "isPaymentDone",
    render: (isPaymentDone) => {
      let color = "";
      let paymentDone = "";
      switch (isPaymentDone) {
        case true:
          color = "green";
          paymentDone = "Paid";
          break;

        case false:
          color = "red";
          paymentDone = "Unpaid";
          break;

        default:
          color = "default";
      }

      return <Tag color={color}>{paymentDone}</Tag>;
    },
  },
  // PaymentProvider
  {
    title: "P. Provider",
    dataIndex: "paymentProvider",
  },
  // Status
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => {
      let color = "";

      switch (status) {
        case "PENDING":
          color = "orange";
          break;
        case "CANCELED":
          color = "red";
          break;
        case "DELIVERED":
          color = "purple";
          break;
        case "HOLD":
          color = "blue";
          break;
        case "COMPLETED":
          color = "green";
          break;
        case "PROCESSING":
          color = "cyan";
          break;
        case "SHIPPED":
          color = "geekblue";
          break;

        case "REFUNDED":
          color = "magenta";
          break;
        case "ON_HOLD":
          color = "gold";
          break;
        case "PARTIALLY_SHIPPED":
          color = "volcano";
          break;
        // Add more cases as needed...

        default:
          color = "default";
      }

      return <Tag color={color}>{status}</Tag>;
    },
  },
  // OrderPrice
  {
    title: "OP",
    dataIndex: "orderPrice",
  },
  // discountedOrderPrice
  {
    title: "DOP",
    dataIndex: "discountedOrderPrice",
  },
  // coupon
  {
    title: "Coupon",
    dataIndex: "coupon",
  },
  // // customer
  // {
  //   title: "Customer",
  //   dataIndex: "customer",
  // },
  // product
  {
    title: "Products",
    dataIndex: "product",
    render: (orderId) => {
      // return <Tag color="blue">{product}</Tag>;
      // return link
      return <Link to={`/admin/orders/${orderId}`}>View Order</Link>;
    },
  },
  // Action
  {
    title: "Action",
    dataIndex: "action",
    render: () => (
      <>
        <Link to="#">
          <MdDelete className="fs-5 ms-3 me-0 text-danger" />
        </Link>
      </>
    ),
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const orderState = useSelector((state) => state.order.orders);
  console.log("orderState in Orders is : ", orderState);

  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      paymentId: orderState[i].paymentId,
      isPaymentDone: orderState[i].isPaymentDone,
      paymentProvider: orderState[i].paymentProvider,
      status: orderState[i].status,
      orderPrice: orderState[i].orderPrice,
      discountedOrderPrice: orderState[i].discountedOrderPrice,
      coupon: orderState[i].coupon?.couponCode
        ? orderState[i].coupon?.couponCode
        : "No Coupon",
      // customer: orderState[i].customer?._id,
      product: orderState[i]?._id,
      action: "action",
    });
  }

  return (
    <>
      <Meta title={"Orders"} />
      <div>
        <h3 className="mb-4 title">Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </>
  );
};

export default Orders;
