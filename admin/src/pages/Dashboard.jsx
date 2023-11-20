import React from "react";

import { Column } from "@ant-design/plots";
import {  Table, Tag } from "antd";

// icons
import { BsArrowDownRight } from "react-icons/bs";
import { BsArrowUpRight } from "react-icons/bs";

const Dashboard = () => {
  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "March",
      sales: 61,
    },
    {
      type: "April",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "June",
      sales: 38,
    },
    {
      type: "July",
      sales: 38,
    },
    {
      type: "Aug",
      sales: 28,
    },
    {
      type: "Sep",
      sales: 58,
    },
    {
      type: "Oct",
      sales: 68,
    },
    {
      type: "Nov",
      sales: 78,
    },
    {
      type: "Dec",
      sales: 88,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",

      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month of Year",
      },
      sales: {
        alias: "Income in $",
      },
    },
  };

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

  const data1 = [];
  for (let i = 0; i < 46; i++) {
    data1.push({
      key: i,
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
      <h3 className="mb-4">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="">Total</p> <h4 className="mb-0">$100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0">Compared To April 2022 </p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="">Total</p> <h4 className="mb-0">$100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0">Compared To April 2022 </p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="">Total</p> <h4 className="mb-0">$100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowUpRight /> 32%
            </h6>
            <p className="mb-0">Compared To April 2022 </p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Income Statics</h3>
        <div className="">
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Recent Orders</h3>
        <div>
          {" "}
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-4">Recent Reviews</h3>
        <div className="d-flex">
          <div className=""></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
