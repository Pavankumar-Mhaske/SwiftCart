import React from "react";
import { Table, Tag } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCoupons } from "../features/coupon/CouponSlice";

const columns = [
  {
    title: "S_No",
    dataIndex: "key",
  },
  // Coupons name
  {
    title: "Coupon",
    dataIndex: "coupon",
    sorter: (a, b) => a.coupon.length - b.coupon.length,
  },
  // CouponCode
  {
    title: "CouponCode",
    dataIndex: "couponCode",
    sorter: (a, b) => a.couponCode.length - b.couponCode.length,
  },

  // MinimumCartValue
  {
    title: "MinCartValue",
    dataIndex: "minimumCartValue",
    sorter: (a, b) => a.minimumCartValue.length - b.minimumCartValue.length,
  },
  // DiscountValue
  {
    title: "D_Value",
    dataIndex: "discountValue",
    sorter: (a, b) => a.discountValue.length - b.discountValue.length,
  },
  // StartDate
  {
    title: "StartDate",
    dataIndex: "startDate",
    sorter: (a, b) => a.startDate.length - b.startDate.length,
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
  // ExpiryDate
  {
    title: "ExpiryDate",
    dataIndex: "expiryDate",
    sorter: (a, b) => a.expiryDate.length - b.expiryDate.length,
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
  // isActive
  {
    title: "isActive",
    dataIndex: "isActive",
    sorter: (a, b) => a.isActive.length - b.isActive.length,
    render: (isActive) => (
      <>
        {isActive ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        )}
      </>
    ),
  },
  // Owner
  // {
  //   title: "Owner",
  //   dataIndex: "owner",
  //   sorter: (a, b) => a.owner.length - b.owner.length,

  //   render: (owner) => (
  //     <>
  //       <Tag color="blue">{owner}</Tag>
  //     </>
  //   ),
  // },
  {
    title: "Action",
    dataIndex: "action",
    render: () => (
      <>
        <Link to="#">
          <BiEdit className="fs-5  me-2 " />
        </Link>
        <Link to="#">
          <MdDelete className="fs-5  text-danger" />
        </Link>
      </>
    ),
  },
];

const CouponList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCoupons());
  }, []);

  const couponState = useSelector((state) => state.coupon.coupons);
  console.log("couponState in couponList is : ", couponState);

  const data1 = [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i + 1,
      coupon: couponState[i].name,
      couponCode: couponState[i].couponCode,
      discountValue: couponState[i].discountValue,
      minimumCartValue: couponState[i].minimumCartValue,
      startDate: couponState[i].startDate,
      expiryDate: couponState[i].expiryDate,
      isActive: couponState[i].isActive,

      // owner: couponState[i].owner,
      action: "action",
    });
  }

  console.log("all the values initially are 😍😍", couponState);

  return (
    <div>
      <h3 className="mb-4 title">CouponList</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default CouponList;
