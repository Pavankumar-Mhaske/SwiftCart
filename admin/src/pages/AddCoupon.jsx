import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  showToastLoading,
  showToastSuccess,
  showToastError,
  Toast,
} from "../utils/HotToastHandler";
import {
  createCoupon,
  getACoupon,
  resetState,
  updateCoupon,
} from "../features/coupon/CouponSlice";
import Meta from "../components/Meta";

// ❗❗❗❗❗❗❗❗❗❗   yup Validations          ❗❗❗❗❗❗❗❗❗❗
let schema = yup.object().shape({
  name: yup.string().required("Coupon name is required"),
  couponCode: yup.string().required("Coupon Code is required"),
  type: yup.string().required("Type is required"),
  discountValue: yup.number().required("Discount Value is required"),
  isActive: yup.boolean().required("Is Active is required"),
  minimumCartValue: yup.number().required("Minimum Cart Value is required"),
  startDate: yup.date().required("Start Date is required"),
  expiryDate: yup.date().required("Expiry Date is required"),
});

const AddCoupon = () => {
  const location = useLocation();
  const getCouponId = location.pathname.split("/")[3];
  console.log("getCouponId in AddCoupon is : ", getCouponId);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingCreateToastId, setLoadingCreateToastId] = useState(null);
  const [loadingUpdateToastId, setLoadingUpdateToastId] = useState(null);

  const [isActive, setIsActive] = useState(undefined);
  const [isInactive, setIsInactive] = useState(undefined);

  const newCoupon = useSelector((state) => state.coupon);
  const {
    createdCoupon,
    isSuccess,
    isLoading,
    isError,
    coupon,
    updatedCoupon,
  } = newCoupon;
  console.log("Coupon in AddCoupon is : ", coupon);

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId]);

  useEffect(() => {
    if (formik.isSubmitting) {
      console.log(`formik is submitting ❤❤🤍❤💙💙💚💛🧡❤
      createdCoupon: ${createdCoupon},isSuccess: ${isSuccess}, isLoading:${isLoading}, isError:${isError}, coupon:${coupon}, updatedCoupon:${updatedCoupon}
      `);
      if (isSuccess && createdCoupon && Object.keys(createdCoupon).length > 0) {
        showToastSuccess("Coupon Created Successfully", loadingCreateToastId);
      } else if (
        isSuccess &&
        updatedCoupon &&
        Object.keys(updatedCoupon).length > 0
      ) {
        showToastSuccess("Coupon Updated Successfully", loadingUpdateToastId);
      } else if (isError) {
        showToastError("Coupon Creation Failed");
      }
    }
  }, [createdCoupon, updatedCoupon]);

  // async functions htmlFor dispatching createCoupon
  const handleCreateCoupon = async (values) => {
    try {
      const response = await dispatch(createCoupon(values));
      console.log("response : ", response);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  // async functions for dispatching updateCoupon
  const handleUpdateCoupon = async (values) => {
    try {
      const response = await dispatch(updateCoupon(values));
      console.log("response : ", response);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  // hook to set the isActive , startDate and expiryDate when the coupon is fetched
  useEffect(() => {
    if (
      isSuccess &&
      coupon &&
      Object.keys(coupon).length > 0 &&
      coupon !== undefined
    ) {
      if (coupon.isActive === true) {
        setIsActive(true);
        setIsInactive(false);
      } else if (coupon.isActive === false) {
        setIsActive(false);
        setIsInactive(true);
      }
    }
  }, [coupon]);
  /**
   *
   * - Remember ✨⭐🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟⭐✨
   * even if the the input field for date type looks of formate 😕dd/mm/yyyy😕 at interface level,
   * but actually it accept the date in the format of 💡YYYY-MM-DD💡
   *
   */
  function formatDateToYYYYMMDD(dateString) {
    const dateObject = new Date(dateString);
    // Extract year, month, and day
    const year = dateObject.getUTCFullYear();
    const month = String(dateObject.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so we add 1
    const day = String(dateObject.getUTCDate()).padStart(2, "0");

    // Form the YYYY-MM-DD string
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  const initialValues = {
    name: coupon?.name || "",
    couponCode: coupon?.couponCode || "",
    type: coupon?.type || "",
    discountValue: coupon?.discountValue || undefined,
    isActive: coupon?.isActive || undefined,
    minimumCartValue: coupon?.minimumCartValue || undefined,
    startDate: coupon?.startDate
      ? formatDateToYYYYMMDD(coupon?.startDate)
      : undefined,
    expiryDate: coupon?.expiryDate
      ? formatDateToYYYYMMDD(coupon?.expiryDate)
      : undefined,
  };

  console.log(
    `All the current values of coupon are: 🦈🦈🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹 ,
    name: ${initialValues.name}, 
    couponCode: ${initialValues.couponCode}, 
    type: ${initialValues.type}, 
    discountValue: ${initialValues.discountValue}, 
    isActive: ${initialValues.isActive}, 
    minimumCartValue: ${initialValues.minimumCartValue}, 
    startDate: ${initialValues.startDate}, 
    expiryDate: ${initialValues.expiryDate}, 
  `
  );
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log("getCouponId in AddCoupon is given by🚁🚁 : ", getCouponId);
      if (getCouponId !== undefined) {
        const toastId = showToastLoading("updating Coupon");
        setLoadingUpdateToastId(toastId);
        const data = {
          couponId: getCouponId,
          name: values.name,
          couponCode: values.couponCode,
          type: values.type,
          discountValue: values.discountValue,
          isActive: values.isActive,
          minimumCartValue: values.minimumCartValue,
          startDate: values.startDate,
          expiryDate: values.expiryDate,
        };

        await handleUpdateCoupon(data);
      } else {
        const toastId = showToastLoading("Creating Coupon");
        setLoadingCreateToastId(toastId);
        await handleCreateCoupon(values);
      }
      console.log("values : ", values);
      // alert(JSON.stringify(values, null, 2));
      console.log("form is submited 🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚");
      formik.resetForm();
      dispatch(resetState());
      setTimeout(() => {
        navigate("/admin/coupon-list");
      }, 500);
    },
  });
  console.log("formik.values 🦈🦈🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹: ", formik.values);

  const handleBoxClick = (buttonType) => {
    if (buttonType === "active") {
      setIsActive(true);
      setIsInactive(false);
      formik.setFieldValue("isActive", true);
    } else if (buttonType === "inactive") {
      setIsActive(false);
      setIsInactive(true);
      formik.setFieldValue("isActive", false);
    }
  };

  // function to formate the date
  const formatDate = (date) => {
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
  };

  return (
    <>
      <Meta title={"Add Coupon"} />

      <div>
        <Toast />
        <h3 className="mb-4 title">Add Coupon Category</h3>
        <div>
          <form action="" onSubmit={formik.handleSubmit}>
            {/*  name */}
            <CustomInput
              id="coupon"
              type="text"
              label="Enter Coupon Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
            />
            <div className="error">
              {formik.touched.name && formik.errors.name}
            </div>

            {/* couponCode */}
            <h5 className="coupon-headings">
              <span className="example">
                (Coupon code must be at least 4 characters long)
              </span>
            </h5>
            <CustomInput
              id="couponCode"
              type="text"
              label="Enter Coupon Code"
              name="couponCode"
              value={formik.values.couponCode}
              onChange={formik.handleChange("couponCode")}
              onBlur={formik.handleBlur("couponCode")}
            />
            <div className="error">
              {formik.touched.couponCode && formik.errors.couponCode}
            </div>

            {/* type */}

            <CustomInput
              id="type"
              type="text"
              label="Enter Coupon Type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange("type")}
              onBlur={formik.handleBlur("type")}
            />
            <div className="error">
              {formik.touched.type && formik.errors.type}
            </div>

            {/* discountValue */}
            <h5 className="coupon-headings">
              <span className="example">
                (Discount value must be greater than 0 )
              </span>
            </h5>
            <CustomInput
              id="discountValue"
              type="number"
              label="Enter Discount Value"
              name="discountValue"
              value={formik.values.discountValue}
              onChange={formik.handleChange("discountValue")}
              onBlur={formik.handleBlur("discountValue")}
            />
            <div className="error">
              {formik.touched.discountValue && formik.errors.discountValue}
            </div>

            {/* minimumCartValue */}
            <h5 className="coupon-headings">
              <span className="example">
                (Minimum cart value must be greater than 0)
              </span>
            </h5>
            <CustomInput
              id="minimumCartValue"
              type="number"
              label="Enter Minimum Cart Value"
              name="minimumCartValue"
              value={formik.values.minimumCartValue}
              onChange={formik.handleChange("minimumCartValue")}
              onBlur={formik.handleBlur("minimumCartValue")}
            />
            <div className="error">
              {formik.touched.minimumCartValue &&
                formik.errors.minimumCartValue}
            </div>

            {/* startDate */}
            {/* <h5 className="coupon-headings-date">
            <span className="example-date-1">
              {formik.values.startDate !== undefined ? `Selected date : ` : ""}
            </span>
            <span className="example-date-2">
              {formik.values.startDate !== undefined
                ? formatDate(formik.values.startDate)
                : ""}
            </span>
          </h5> */}
            <CustomInput
              id="startDate"
              type="date"
              label="Enter Start Date"
              name="startDate"
              value={formik.values.startDate}
              onChange={formik.handleChange("startDate")}
              onBlur={formik.handleBlur("startDate")}
            />
            <div className="error">
              {formik.touched.startDate && formik.errors.startDate}
            </div>

            {/* expiryDate */}
            {/* <h5 className="coupon-headings-date">
            <span className="example-date-1">
              {formik.values.expiryDate !== undefined ? `Selected date : ` : ""}
            </span>
            <span className="example-date-2">
              {formik.values.expiryDate !== undefined
                ? formatDate(formik.values.expiryDate)
                : ""}
            </span>
          </h5> */}
            <CustomInput
              id="expiryDate"
              type="date"
              label="Enter Expiry Date"
              name="expiryDate"
              value={formik.values.expiryDate}
              onChange={formik.handleChange("expiryDate")}
              onBlur={formik.handleBlur("expiryDate")}
            />
            <div className="error">
              {formik.touched.expiryDate && formik.errors.expiryDate}
            </div>

            {/* isActive */}
            <div className="d-flex justify-content-between border border-gray-200 mt-4 ">
              <button
                className=" d-flex align-items-center ps-4 border border-2 border-gray-200 rounded dark:border-gray-700 w-50 m-2 bg-white"
                onClick={() => handleBoxClick("active")}
                type="button"
              >
                <input
                  className=" w-4 h-4 text-primary bg-light border border-secondary focus:ring-primary dark:focus:ring-primary dark:ring-offset-dark focus:ring-2 dark:bg-dark dark:border-dark"
                  type="radio"
                  name="flexRadioActive"
                  id="flexRadioActive"
                  checked={isActive}
                />
                <label
                  className="form-check-label w-100 py-4 ms-2 text-small font-weight-medium text-dark dark:text-gray-300"
                  htmlFor="flexRadioActive"
                >
                  Active
                </label>
              </button>
              <button
                className=" d-flex align-items-center ps-4 border border-2 border-gray-200 rounded dark:border-gray-700 w-50 m-2 bg-white"
                onClick={() => handleBoxClick("inactive")}
                type="button"
              >
                <input
                  className=" w-4 h-4 text-primary bg-light border border-secondary focus:ring-primary dark:focus:ring-primary dark:ring-offset-dark focus:ring-2 dark:bg-dark dark:border-dark"
                  type="radio"
                  name="flexRadioActive"
                  id="flexRadioInActive"
                  checked={isInactive}
                />
                <label
                  className="form-check-label w-100 py-4 ms-2 text-small font-weight-medium text-dark dark:text-gray-300"
                  htmlFor="flexRadioInActive"
                >
                  Inactive
                </label>
              </button>
            </div>

            <div className="error">
              {formik.touched.isActive && formik.errors.isActive}
            </div>

            <button
              className="btn btn-success border-0 rounded-3 my-5"
              type="submit"
            >
              Add Coupon
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCoupon;
