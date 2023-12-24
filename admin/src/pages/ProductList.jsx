import React from "react";
import { Table, Tag } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
const columns = [
  {
    title: "O_No",
    dataIndex: "key",
  },
  {
    title: "Products",
    dataIndex: "productId",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => {
      let color = "";

      switch (status) {
        case "Pending":
          color = "orange";
          break;
        case "Hold":
          color = "blue";
          break;
        case "Canceled":
          color = "red";
          break;
        case "Completed":
          color = "green";
          break;
        case "Processing":
          color = "cyan";
          break;
        case "Shipped":
          color = "geekblue";
          break;
        case "Delivered":
          color = "purple";
          break;
        case "Refunded":
          color = "magenta";
          break;
        case "On Hold":
          color = "gold";
          break;
        case "Partially Shipped":
          color = "volcano";
          break;
        // Add more cases as needed...

        default:
          color = "default";
      }

      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: "Co.",
    dataIndex: "countryOfOrigin",
  },
  {
    title: "Customer",
    dataIndex: "name",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Total",
    dataIndex: "totalPrice",
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state.product.products);
  console.log("productState in product is : ", productState);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      status: "Processing",
      countryOfOrigin: `India`,
      name: `Edward King ${i}`,
      date: `10/10/2021`,
      // age: 32,
      // address: `London, Park Lane no. ${i}`,
      productId: `#00745${i}`,
      totalPrice: `$${i + 100}.00`,
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">ProductList</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ProductList;
