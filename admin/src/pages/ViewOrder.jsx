import React from "react";

import { Table, Tag } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getAOrder } from "../features/order/OrderSlice";
import { getAColor } from "../features/color/ColorSlice";

const columns = [
  {
    title: "S_No",
    dataIndex: "key",
  },
  // PaymentId
  {
    title: "Product",
    dataIndex: "product",
  },
  //   Quantity
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  //   Brand
  {
    title: "Brand",
    dataIndex: "brand",
  },
  //   Color
  {
    title: "Color",
    dataIndex: "color",
    // render an array of colors in tags, each on a new line
    render: (colors) => (
      <>
        {colors?.map((Id, index) => (
          <div key={index}>
            <Tag color="green">{Id}</Tag>
          </div>
        ))}
      </>
    ),
  },
  //   Category
  {
    title: "Category",
    dataIndex: "category",
    // render a category inside tag...
    render: (category) => (
      <>
        <div>
          <Tag color="green">{category}</Tag>
        </div>
      </>
    ),
  },
  //   Tags
  {
    title: "Tags",
    dataIndex: "tags",
    // render an array of tags in tags, each on a new line
    render: (tags) => (
      <>
        {tags.map((tag, index) => (
          <div key={index}>
            <Tag color="green">{tag}</Tag>
          </div>
        ))}
      </>
    ),
  },
  //   Price
  {
    title: "Price",
    dataIndex: "price",
  },
  // Action
  {
    title: "Action",
    dataIndex: "action",
    render: () => (
      <>
        <Link to="#">
          <BiEdit className="fs-5 ms-0 me-0 " />
        </Link>
        <Link to="#">
          <MdDelete className="fs-5 ms-3 me-0 text-danger" />
        </Link>
      </>
    ),
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const getOrderId = location.pathname.split("/")[3];
  console.log("getOrderId in ViewOrder is : ", getOrderId);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAOrder(getOrderId));
  }, []);

  const orderState = useSelector((state) => state.order.order.items);
  console.log("orderState in ViewOrder is :  ", orderState);
  //   console.log(
  //     "orderState.length in ViewOrder is 🌹🌹🌹 :  ",
  //     ordervState.items
  //   );
  //   const orderState = ordervState.items;

  //   function to getAColor from colorId in orderState

  //   const colorState = useSelector((state) => state.color.color);
  //   console.log("colorState in ViewOrder is 🌳🌳🌳 : ", colorState);

  //   const getColor = async (colorId) => {
  //     try {
  //       const response = await dispatch(getAColor(colorId));
  //     } catch (error) {
  //       console.log("error in getColor is : ", error);
  //     }
  //   };

  //   const getColorsHelper = async (colorsArray) => {
  //     console.log("colorsArray in ViewOrder is : ", colorsArray);
  //     const colors = [];
  //     for (let j = 0; j < colorsArray?.length; j++) {
  //       const colorName = await getColor(colorsArray[j]);
  //       colors.push(colorName);
  //     }
  //     console.log("colors in ViewOrder is 🔴🟢🟡 : ", colors);
  //     return colors;
  //   };

  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    // console.log(
    //   "orderState[i].product.color in ViewOrder is : ",
    //   orderState[i].product.colors
    // );
    // const colors = getColorsHelper(orderState[i].product.colors);
    // console.log("colors in ViewOrder is : ", colors);
    data1.push({
      key: i + 1,
      product: orderState[i].product.name,
      quantity: orderState[i].quantity,
      brand: orderState[i].product.brand,
      color: orderState[i].product.colors,
      category: orderState[i].product.category,
      tags: orderState[i].product.tags,
      price: orderState[i].product.price,
      action: "action",
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
