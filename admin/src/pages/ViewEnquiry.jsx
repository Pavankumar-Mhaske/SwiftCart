import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  showToastLoading,
  showToastSuccess,
  showToastError,
  Toast,
} from "../utils/HotToastHandler";
import {
  getAEnquiry,
  updateEnquiry,
  resetState,
} from "../features/enquiry/EnquirySlice";

const ViewEnquiry = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loadingUpdateToastId, setLoadingUpdateToastId] = useState(null);

  const getEnquiryId = location.pathname.split("/")[3];
  console.log("getEnquiryId in ViewEnquiry is : ", getEnquiryId);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAEnquiry(getEnquiryId));
  }, [getEnquiryId]);

  const newEnquiry = useSelector((state) => state.enquiry);
  const { isSuccess, isError, enquiry, updatedEnquiry } = newEnquiry;
  console.log("enquiry in ViewEnquiry is : ", enquiry);

  const { name, email, mobile, comment, status, owner } = enquiry;

  console.log(`
  name: ${name},
  email: ${email},
  mobile: ${mobile},
  comment: ${comment},
  status: ${status},
  owner: ${owner},
  `);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (getEnquiryId !== undefined) {
      dispatch(getAEnquiry(getEnquiryId));
    } else {
      dispatch(resetState());
    }
  }, [getEnquiryId]);

  useEffect(() => {
    if (isSuccess && updatedEnquiry && Object.keys(updatedEnquiry).length > 0) {
      showToastSuccess("Enquiry Updated Successfully", loadingUpdateToastId);
      dispatch(getAEnquiry(getEnquiryId));
    }
    if (isError) {
      showToastError("Enquiry updation Failed");
    }
  }, [updatedEnquiry]);

  // async functions for dispatching updateEnquiry
  const handleUpdateEnquiryStatus = async (status) => {
    try {
      const data = {
        enquiryId: getEnquiryId,
        status: status,
      };
      const response = await dispatch(updateEnquiry(data));
      console.log("response : ", response);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const setEnquiryStatus = async (status) => {
    console.log(status);
    const toastId = showToastLoading("updating Enquiry");
    setLoadingUpdateToastId(toastId);
    await handleUpdateEnquiryStatus(status);
    dispatch(resetState());
  };

  return (
    <div>
      <Toast />

      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View Enquiry</h3>
        <button
          className="bg-transparent border-0 fs-6 mb-0 d-flex align-items-center gap-2 "
          onClick={goBack}
        >
          <IoMdArrowRoundBack className="fs-5" /> Go Back
        </button>
      </div>
      <div className="mt-5 bg-white p-4 d-flex flex-column gap-3 rounded-3">
        {/* Name */}
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Name:</h6>
          <p className="mb-0">{name}</p>
        </div>
        {/* Email */}
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Email:</h6>
          <p className="mb-0">
            <a href={`mailto:${email}`}>{email}</a>
          </p>
        </div>
        {/* Mobile */}
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Mobile:</h6>
          <p className="mb-0">
            {" "}
            <a href={`tel:+91${mobile}`}>{mobile}</a>{" "}
          </p>
        </div>
        {/* Comment */}
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Comment:</h6>
          <p className="mb-0">{comment}</p>
        </div>
        {/* Status */}
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status:</h6>
          <p className="mb-0">{status}</p>
        </div>
        {/* Change Status */}
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Change Status:</h6>
          <div>
            <select
              name=""
              id=""
              className="form-control form-select"
              value={status}
              // defaultValue={enquiry?.status ? enquiry?.status : "DEFAULT"}
              onChange={(event) => setEnquiryStatus(event.target.value)}
            >
              <option value="DEFAULT">Select Status</option>
              <option value="SUBMITTED">SUBMITTED</option>
              <option value="PENDING">PENDING</option>
              <option value="AWAITING_RESPONSE">AWAITING_RESPONSE</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="ON_HOLD">ON_HOLD</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="CANCELED">CANCELED</option>
              <option value="CLOSED">CLOSED</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>
          </div>
        </div>
        {/* Owner */}
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Owner:</h6>
          <p className="mb-0">{owner}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewEnquiry;
