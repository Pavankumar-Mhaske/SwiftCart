import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { MdDelete } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getEnquiries, deleteEnquiry } from "../features/enquiry/EnquirySlice";
import CustomModal from "../components/CustomModal";
import {
  showToastLoading,
  showToastSuccess,
  showToastError,
  Toast,
} from "../utils/HotToastHandler";
import Meta from "../components/Meta";

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
  // {
  //   title: "Owner",
  //   dataIndex: "owner",
  // },
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

      return <Tag color={color}>{`${status}`}</Tag>;
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
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEnquiries());
  }, []);

  // deleting functionality
  const [loadingDeleteToastId, setLoadingDeleteToastId] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteEnquiryId, setDeleteEnquiryId] = useState("");
  const showModal = (enquiryId) => {
    setOpen(true);
    setDeleteEnquiryId(enquiryId);
  };
  console.log("enquiryId in enquiryList is Id: ", deleteEnquiryId);
  const hideModal = () => {
    setOpen(false);
  };
  const deleteEnquiryHelper = (enquiryId) => {
    const toastId = showToastLoading("Deleting Enquiry!");
    setLoadingDeleteToastId(toastId);
    console.log("deleteEnquiry is called");
    dispatch(deleteEnquiry(enquiryId));
    setOpen(false);
    // hideModal();
  };

  const newEnquiry = useSelector((state) => state.enquiry);
  const { isSuccess, isError, deletedEnquiry } = newEnquiry;
  console.log("deletedEnquiry in EnquiryList is : ", deletedEnquiry);

  useEffect(() => {
    if (isSuccess && deletedEnquiry && Object.keys(deletedEnquiry).length > 0) {
      showToastSuccess("Enquiry Deleted Successfully", loadingDeleteToastId);
      dispatch(getEnquiries());
    } else if (isError) {
      showToastError("Enquiry Deletion Failed");
    }
  }, [deletedEnquiry]);

  const enquiryState = useSelector((state) => state.enquiry.enquiries);
  console.log("enquiryState in enquiryList is : ", enquiryState);

  const data1 = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      // comment: enquiryState[i].comment,
      // owner: enquiryState[i].owner,
      status: enquiryState[i].status,
      date: enquiryState[i].createdAt,
      action: (
        <>
          <Link to={`/admin/enquiries/${enquiryState[i]._id}`} className="">
            <BsFillEyeFill className="fs-5 me-2 " style={{ color: "black" }} />
          </Link>
          <button
            onClick={() => showModal(enquiryState[i]._id)}
            className="bg-transparent border-0"
          >
            <MdDelete className="fs-5  text-danger" />
          </button>
        </>
      ),
    });
  }

  return (
    <>
      <Meta title={"Enquiries"} />
      <div>
        <Toast />

        <h3 className="mb-4 title">Enquiries</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          title="Are You Sure to Delete This Brand?"
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteEnquiryHelper(deleteEnquiryId);
          }}
        />
      </div>
    </>
  );
};

export default Enquiries;
