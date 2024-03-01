import React from "react";

import { Table, Tag } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getAOrder } from "../features/order/OrderSlice";
import { getAColor } from "../features/color/ColorSlice";
import { useState } from "react";

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
      <div className="colors_column">
        <ul className="colors ps-0">
          {colors &&
            colors?.map((color, index) => {
              return (
                <li
                  key={index}
                  style={{
                    backgroundColor: color?.name,
                    cursor: "pointer",
                  }}
                ></li>
              );
            })}
        </ul>
      </div>
    ),
  },
  //   Category
  {
    title: "Category",
    dataIndex: "category",
    // render a category inside tag...
    render: (categories) => (
      <>
        {categories.map((category, index) => (
          <div key={index}>
            <Tag
              key={index}
              style={{
                cursor: "pointer",
              }}
              color="green"
            >
              {category?.name}
            </Tag>
          </div>
        ))}
      </>
    ),
  },
  //   Tags
  {
    title: "Tags",
    dataIndex: "tags",
    // render an array of tags in tags, each on a new line
    render: (tags) => (
      <div className="tags_column">
        <ul className="tags ps-0">
          {tags &&
            tags.map((tag, index) => {
              return (
                <Tag
                  key={index}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {tag}
                </Tag>
              );
            })}
        </ul>
      </div>
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
        {/* PENDING: "orange",
        PENDING
      CANCELED: "red",
      DELIVERED: "purple",
      HOLD: "blue",
      COMPLETED: "green",
      PROCESSING: "cyan",
      SHIPPED: "geekblue",
      REFUNDED: "magenta",
      ON_HOLD: "gold",
      PARTIALLY_SHIPPED: "volcano", */}
        <select name="" id="" className="form-control form-select">
          <option value="ORDER STATUS" disabled selected>
            ORDER STATUS
          </option>
          <option value="PENDING">PENDING</option>
          <option value="CANCELED">CANCELED</option>
          <option value="DELIVERED">DELIVERED</option>
          <option value="HOLD">HOLD</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="PROCESSING">PROCESSING</option>
          <option value="SHIPPED">SHIPPED</option>
          <option value="REFUNDED">REFUNDED</option>
          <option value="ON_HOLD">ON_HOLD</option>
          <option value="PARTIALLY_SHIPPED">PARTIALLY_SHIPPED</option>
        </select>
      </>
    ),
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const getOrderId = location.pathname.split("/")[3];
  console.log("getOrderId in ViewOrder is : ", getOrderId);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAOrder(getOrderId));
  }, []);

  const orderState = useSelector((state) => state.order.order);
  console.log("orderState in ViewOrder is : ", orderState);
  const { items, customer } = orderState;
  console.log("items in ViewOrder is : 🌹🌹🌹 ", items);
  console.log("customer in ViewOrder: 🌹🌹🌹 ", customer);
  console.log("orderedProducts in ViewOrder is : ", orderedProducts);
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

  useEffect(() => {
    const data1 = [];

    orderState &&
      items &&
      items.length > 0 &&
      items.map((item, index) => {
        data1.push({
          key: index + 1,
          product: item.product.name,
          quantity: item.quantity,
          brand: item.product.brand,
          color: item.product.colors,
          category: item.product.category,
          tags: item.product.tags,
          price: `${item.product.price}.00`,
          action: "action",
        });
      });
    // for (let i = 0; i < items?.length; i++) {
    //   // console.log(
    //   //   "orderState[i].product.color in ViewOrder is : ",
    //   //   orderState[i].product.colors
    //   // );
    //   // const colors = getColorsHelper(orderState[i].product.colors);
    //   // console.log("colors in ViewOrder is : ", colors);
    //   data1.push({
    //     key: i + 1,
    //     product: items[i].product.name,
    //     quantity: items[i].quantity,
    //     brand: items[i].product.brand,
    //     color: items[i].product.colors,
    //     category: items[i].product.category,
    //     tags: items[i].product.tags,
    //     price: items[i].product.price,
    //     action: "action",
    //   });
    // }

    console.log("data1 in ViewOrder is : ", data1);
    setOrderedProducts(data1);
  }, [orderState]);

  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={orderedProducts} />
      </div>
    </div>
  );
};

export default ViewOrder;
