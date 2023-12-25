import React from "react";
import { Table, Tag } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getEnquiries } from "../features/enquiry/EnquirySlice";

const columns = [
  {
    title: "S_No",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  // Email
  {
    title: "Email",
    dataIndex: "email",
  },
  // Mobile
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  // Comment
  // {
  //   title: "Comment",
  //   dataIndex: "comment",
  // },
  // owner
  {
    title: "Owner",
    dataIndex: "owner",
  },
  // Status
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => {
      let color = "";

      switch (status) {
        case "SUBMITTED":
          color = "blue";
          break;
        case "PENDING":
          color = "orange";
          break;
        case "AWAITING_RESPONSE":
          color = "geekblue";
          break;
        case "IN_PROGRESS":
          color = "cyan";
          break;
        case "ON_HOLD":
          color = "gold";
          break;
        case "COMPLETED":
          color = "green";
          break;
        case "CANCELED":
          color = "red";
          break;
        case "CLOSED":
          color = "purple";
          break;
        case "ARCHIVED":
          color = "silver";
          break;
        // Add more cases as needed...

        default:
          color = "default";
      }

      return <Tag color={color}>{status}</Tag>;
    },
  },
  // date
  {
    title: "Date (IST)",
    dataIndex: "date",
    // convert in the form of 29/10/2023, 24:41:25 IST
    render: (date) => {
      const originalDate = new Date(date);

      // Convert to IST (UTC+5:30)
      const istDate = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true, // Use 24-hour format
      });

      const formattedDate = `${istDate.format(originalDate)}`;

      return <>{formattedDate}</>;
    },
  },
  // Action
  {
    title: "Action",
    dataIndex: "action",
    render: () => (
      <>
        <Link to="#">
          <BiEdit className="fs-5 ms-3 me-5 " />
        </Link>
        <Link to="#">
          <MdDelete className="fs-5 ms-3 me-5 text-danger" />
        </Link>
      </>
    ),
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEnquiries());
  }, []);

  const enquiryState = useSelector((state) => state.enquiry.enquiries);
  console.log("enquiryState in enquiryList is : ", enquiryState);
  const originalDate = new Date("2023-10-28T19:11:25.414Z");

  // Convert to IST (UTC+5:30)
  const istDate = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false, // Use 24-hour format
  });

  const formattedDate = `${istDate.format(originalDate)} IST`;

  console.log("new formated date:", formattedDate);

  const data1 = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      // comment: enquiryState[i].comment,
      owner: enquiryState[i].owner,
      status: enquiryState[i].status,
      date: enquiryState[i].createdAt,
      action: "action",
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Enquiries;
