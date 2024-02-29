import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Designs
import { Column } from "@ant-design/plots";
import { Table, Tag } from "antd";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
// icons
import { ImArrowDownRight2 } from "react-icons/im";
import { ImArrowUpRight2 } from "react-icons/im";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";

import { getMonthwiseOrdersInfo } from "../features/auth/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const monthlyDataState = useSelector((state) => state.auth);
  const { ordersInfo, isLoading, isSuccess, isError, message } =
    monthlyDataState;
  console.log("ordersInfo in Dashboard is 🍔🍔 : ", ordersInfo);
  const [monthlyOrdersData, setMonthlyOrdersData] = useState([]);
  // console.log("monthlyOrdersData: ", monthlyOrdersData);
  // trying to show the latest 3 months data and there relative sales and growth
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const recentMonthsArrayLength = 4;
  const latestFourMonthsData = ordersInfo.slice(0, recentMonthsArrayLength);
  console.log("latestFourMonthsData: ", latestFourMonthsData);

  const grothRatesForLatestThreeMonths = latestFourMonthsData.map(
    (month, index) => {
      if (index === recentMonthsArrayLength - 1) return 0;
      console.log("month: ", month, "index:", index);
      const currentMonthSales = month.sales;
      const previousMonthSales = latestFourMonthsData[index + 1]?.sales;
      return parseFloat(
        (
          ((currentMonthSales - previousMonthSales) / previousMonthSales) *
          100
        ).toFixed(1)
      );
    }
  );

  console.log("grothRatesForLatestThreeMonths", grothRatesForLatestThreeMonths);

  useEffect(() => {
    dispatch(getMonthwiseOrdersInfo());
  }, []);

  useEffect(() => {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let data = [];
    for (let index = 0; index < ordersInfo.length; index++) {
      const monthlyOrders = ordersInfo[index];

      data.push({
        type:
          monthNames[monthlyOrders?._id?.month - 1] +
          " " +
          monthlyOrders?._id?.year,
        sales: monthlyOrders?.sales,
      });
    }
    // console.log("data: ", data);
    setMonthlyOrdersData(data);
  }, [ordersInfo]);

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
    data: monthlyOrdersData.length > 0 ? monthlyOrdersData : data,
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
      // age: 32.9,
      // address: `London, Park Lane no. ${i}`,
      productId: `#00745${i}`,
      totalPrice: `$${i + 100}.00`,
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      {/* 📈📉📊 Three months Analysis Graphs 📈📉📊 */}
      <div className="d-flex justify-content-between align-items-center gap-3">
        {/* 📅📅📅 Month 1️⃣ 📅📅📅 */}
        {latestFourMonthsData &&
          latestFourMonthsData.length > 0 &&
          latestFourMonthsData.map((month, index) => {
            if (index === recentMonthsArrayLength - 1) return;
            return (
              <div
                className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3"
                style={{ fontSize: "14px" }}
              >
                <div
                  className=""
                  style={{ width: "125px", overflow: "hidden" }}
                >
                  <p className=" description">Total</p>{" "}
                  <h4 className="mb-0 sub-title" style={{ fontSize: "1.3rem" }}>
                    ${month?.sales}.00
                  </h4>
                </div>
                <div className="d-flex flex-column align-items-end">
                  {grothRatesForLatestThreeMonths[index] > 0 ? (
                    <h6 className="green">
                      <FaArrowTrendUp /> {grothRatesForLatestThreeMonths[index]}
                      %
                    </h6>
                  ) : (
                    <h6 className="red">
                      <FaArrowTrendDown />{" "}
                      {grothRatesForLatestThreeMonths[index]}%
                    </h6>
                  )}
                  {/* <h6 className="red">
                    <FaArrowTrendDown /> {grothRatesForLatestThreeMonths[index]}
                    %
                  </h6> */}
                  <p className="mb-0 description">
                    {`Compared To ${
                      monthNames[(month?._id?.month - 2 + 12) % 12]
                    } ${month?._id?.year}`}{" "}
                  </p>
                </div>
              </div>
            );
          })}
      </div>

      <div className="mt-4 flex-grow-1">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& > *": {
              m: 1,
            },
          }}
        >
          <ButtonGroup
            color="secondary"
            disabled={false}
            orientation="horizontal"
            size="large"
            variant="outlined"
            style={{ backgroundColor: "black" }}
          >
            <Button>Monthly</Button>
            <Button>Yearly</Button>
          </ButtonGroup>
        </Box>
      </div>

      {/* <div className="d-flex justify-content-between align-items-center gap-3"> */}
      {/* 💸💸💸💰 Income Statestics 💰💸💸💸*/}
      <div className="mt-4 flex-grow-1">
        <h3 className="mb-5">Income Statics</h3>
        <div className="">
          <Column {...config} />
        </div>
      </div>

      {/* 📦📦📦 Recent Orders 📦📦📦 */}
      <div className="mt-4">
        <h3 className="mb-5">Recent Orders</h3>
        <div>
          {" "}
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
      {/* </div> */}
      {/* 📝📝📝 Recent Reviews 📝📝📝 */}
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
