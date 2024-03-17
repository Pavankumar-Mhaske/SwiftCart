import React, { useState, useEffect } from "react";

import { Table, Tag } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAOrder, updateOrderStatus } from "../features/order/OrderSlice";
import { IoMdArrowRoundBack } from "react-icons/io";
import Meta from "../components/Meta";

// const columns = [
//   {
//     title: "S_No",
//     dataIndex: "key",
//   },
//   // PaymentId
//   {
//     title: "Product",
//     dataIndex: "product",
//   },
//   //   Quantity
//   {
//     title: "Quantity",
//     dataIndex: "quantity",
//   },
//   //   Brand
//   {
//     title: "Brand",
//     dataIndex: "brand",
//   },
//   //   Color
//   {
//     title: "Color",
//     dataIndex: "color",
//     // render an array of colors in tags, each on a new line
//     render: (colors) => (
//       <div className="colors_column">
//         <ul className="colors ps-0">
//           {colors &&
//             colors?.map((color, index) => {
//               return (
//                 <li
//                   key={index}
//                   style={{
//                     backgroundColor: color?.name,
//                     cursor: "pointer",
//                   }}
//                 ></li>
//               );
//             })}
//         </ul>
//       </div>
//     ),
//   },
//   //   Category
//   {
//     title: "Category",
//     dataIndex: "category",
//     // render a category inside tag...
//     render: (categories) => (
//       <>
//         {categories.map((category, index) => (
//           <div key={index}>
//             <Tag
//               key={index}
//               style={{
//                 cursor: "pointer",
//               }}
//               color="green"
//             >
//               {category?.name}
//             </Tag>
//           </div>
//         ))}
//       </>
//     ),
//   },
//   //   Tags
//   {
//     title: "Tags",
//     dataIndex: "tags",
//     // render an array of tags in tags, each on a new line
//     render: (tags) => (
//       <div className="tags_column">
//         <ul className="tags ps-0">
//           {tags &&
//             tags.map((tag, index) => {
//               return (
//                 <Tag
//                   key={index}
//                   style={{
//                     cursor: "pointer",
//                   }}
//                 >
//                   {tag}
//                 </Tag>
//               );
//             })}
//         </ul>
//       </div>
//     ),
//   },
//   //   Price
//   {
//     title: "Price",
//     dataIndex: "price",
//   },
//   // Action
//   {
//     title: "Action",
//     dataIndex: "action",
//     render: () => (
//       <>
//         <select
//           name=""
//           id=""
//           className="form-control form-select"
//           onChange={(event) => handleUpdateOrderStatus(event.target.value)}
//         >
//           <option value="ORDER STATUS" disabled selected>
//             ORDER STATUS
//           </option>
//           <option value="PENDING">PENDING</option>
//           <option value="CANCELED">CANCELED</option>
//           <option value="DELIVERED">DELIVERED</option>
//           <option value="HOLD">HOLD</option>
//           <option value="COMPLETED">COMPLETED</option>
//           <option value="PROCESSING">PROCESSING</option>
//           <option value="SHIPPED">SHIPPED</option>
//           <option value="REFUNDED">REFUNDED</option>
//           <option value="ON_HOLD">ON_HOLD</option>
//           <option value="PARTIALLY_SHIPPED">PARTIALLY_SHIPPED</option>
//         </select>
//       </>
//     ),
//   },
// ];

const ViewOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const getOrderId = location.pathname.split("/")[3];
  console.log("getOrderId in ViewOrder is : ", getOrderId);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const dispatch = useDispatch();

  const orderState = useSelector((state) => state.order);
  console.log("orderState in ViewOrder is : ", orderState);
  const { order, updatedOrder } = orderState;
  const { items, customer } = order;
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
    dispatch(getAOrder(getOrderId));
  }, [updatedOrder]);

  useEffect(() => {
    const data1 = [];

    order &&
      items &&
      items.length > 0 &&
      items.map((item, index) => {
        data1.push({
          key: index + 1,
          // product: item.product.name,
          nameNimage: {
            name: item?.product?.name,
            image: item?.product?.mainImages[0]?.url,
          },
          quantity: item.quantity,
          brand: item.product.brand,
          color: item.product.colors,
          category: item.product.category,
          tags: item.product.tags,
          price: `${item.product.price}.00`,
          action: order?.status,
        });
      });
    // for (let i = 0; i < items?.length; i++) {
    //   // console.log(
    //   //   "order[i].product.color in ViewOrder is : ",
    //   //   order[i].product.colors
    //   // );
    //   // const colors = getColorsHelper(order[i].product.colors);
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
  }, [order]);

  const handleUpdateOrderStatus = (status) => {
    console.log("e.target.value in ViewOrder is : ", status);
    dispatch(updateOrderStatus({ orderId: getOrderId, status: status }));
  };

  const columns = [
    {
      title: "S_No",
      dataIndex: "key",
    },
    // PaymentId
    {
      title: "Product",
      dataIndex: "nameNimage",
      render: (nameNimage) => (
        console.log("nameNimage in productlist is 🍌🍌🍌 : ", nameNimage),
        (
          <div
            className="d-flex align-items-center"
            style={{ marginLeft: "-40px" }}
          >
            <img
              src={nameNimage?.image}
              className="img-fluid me-2"
              alt="Product Image"
              style={{ width: "120px" }}
              // style={{ width: "50px", height: "50px" }}
            />
            <p>{nameNimage?.name}</p>
          </div>
        )
      ),
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
        return (
          <div className="action_column">
            <div className="action_status">
              <Tag color={color}>{status}</Tag>
            </div>
            <select
              name=""
              id=""
              className="form-control form-select"
              // defaultValue={order && order?.status}
              defaultValue="ORDER STATUS"
              onChange={(event) => handleUpdateOrderStatus(event.target.value)}
            >
              <option value="ORDER STATUS" disabled>
                ORDER STATUS
              </option>
              <option value="PENDING">PENDING</option>
              <option value="PROCESSING">PROCESSING</option>
              <option value="SHIPPED">SHIPPED</option>
              <option value="PARTIALLY_SHIPPED">PARTIALLY_SHIPPED</option>
              <option value="ON_HOLD">ON_HOLD</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="REFUNDED">REFUNDED</option>
              <option value="HOLD">HOLD</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>
        );
      },
    },
  ];
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Meta title={"View Order"} />
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mb-4 title">View Order</h3>
          <button
            className="bg-transparent border-0 fs-6 mb-0 d-flex align-items-center gap-2 "
            onClick={goBack}
          >
            <IoMdArrowRoundBack className="fs-5" /> Go Back
          </button>
        </div>

        <div>
          <Table columns={columns} dataSource={orderedProducts} />
        </div>
      </div>
    </>
  );
};

export default ViewOrder;
