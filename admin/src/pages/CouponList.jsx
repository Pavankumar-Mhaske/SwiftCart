import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCoupon, getCoupons } from "../features/coupon/CouponSlice";
import CustomModal from "../components/CustomModal";
import {
  showToastLoading,
  showToastSuccess,
  showToastError,
  Toast,
} from "../utils/HotToastHandler";

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
  },
];

const CouponList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCoupons());
  }, []);

  // deleting functionality
  const [loadingDeleteToastId, setLoadingDeleteToastId] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteCouponId, setDeleteCouponId] = useState("");
  const showModal = (couponId) => {
    setOpen(true);
    setDeleteCouponId(couponId);
  };
  console.log("couponId in couponList is Id: ", deleteCouponId);
  const hideModal = () => {
    setOpen(false);
  };
  const deleteCouponHelper = (couponId) => {
    const toastId = showToastLoading("Deleting Coupon!");
    setLoadingDeleteToastId(toastId);
    console.log("deleteCoupon is called");
    dispatch(deleteCoupon(couponId));
    setOpen(false);
    // hideModal();
  };

  const newCoupon = useSelector((state) => state.coupon);
  const { isSuccess, isError, deletedCoupon } = newCoupon;
  console.log("deletedCoupon in CouponList is : ", deletedCoupon);

  useEffect(() => {
    if (isSuccess && deletedCoupon && Object.keys(deletedCoupon).length > 0) {
      showToastSuccess("Coupon Deleted Successfully", loadingDeleteToastId);
      dispatch(getCoupons());
    } else if (isError) {
      showToastError("Coupon Deletion Failed");
    }
  }, [deletedCoupon]);

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
      action: (
        <>
          <Link to={`/admin/coupon/${couponState[i]._id}`}>
            <BiEdit className="fs-5 me-2 " />
          </Link>
          <button
            onClick={() => showModal(couponState[i]._id)}
            className="bg-transparent border-0"
          >
            <MdDelete className="fs-5  text-danger" />
          </button>
        </>
      ),
    });
  }

  console.log("all the values initially are 😍😍", couponState);

  return (
    <div>
      <Toast />
      <h3 className="mb-4 title">CouponList</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        title="Are You Sure to Delete This Coupon?"
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCouponHelper(deleteCouponId);
        }}
      />
    </div>
  );
};

export default CouponList;
