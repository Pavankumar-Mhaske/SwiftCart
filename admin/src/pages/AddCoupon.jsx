import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  showToastLoading,
  showToastSuccess,
  showToastError,
  Toast,
} from "../utils/HotToastHandler";
import { createCoupon, resetState } from "../features/coupon/CouponSlice";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingToastId, setLoadingToastId] = useState(null);
  const [isActive, setIsActive] = useState(undefined);
  const [isInactive, setIsInactive] = useState(undefined);

  const newCoupon = useSelector((state) => state.coupon);
  const { createdCoupon, isSuccess, isLoading, isError } = newCoupon;
  // console.log("createdCoupon in AddCoupon is : ", createdCoupon);
  useEffect(() => {
    if (formik.isSubmitting) {
      if (isSuccess && createdCoupon) {
        console.log("toastId : ", loadingToastId);
        showToastSuccess("Coupon Created Successfully", loadingToastId);
      }
      if (isError) {
        showToastError("Coupon Creation Failed");
      }
    }
  }, [createdCoupon]);

  // async functions htmlFor dispatching createCoupon
  const handleCreateCoupon = async (values) => {
    try {
      const response = await dispatch(createCoupon(values));
      console.log("response : ", response);
    } catch (error) {
      console.log("error : ", error);
    }
  };
  const initialValues = {
    name: "",
    couponCode: "",
    type: "",
    discountValue: undefined,
    isActive: undefined,
    minimumCartValue: undefined,
    startDate: undefined,
    expiryDate: undefined,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log("values : ", values);
      const toastId = showToastLoading("Creating Coupon");
      setLoadingToastId(toastId);
      console.log("values : ", values);
      // alert(JSON.stringify(values, null, 2));
      console.log("form is submited 🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚");
      await handleCreateCoupon(values);
      formik.resetForm();
      // showToastSuccess("Coupon Created Successfully", toastId);
      // setTimeout(() => {
      //   dispatch(resetState());
      //   navigate("/admin/coupon-list");
      // }, 3000);
    },
  });
  console.log("all the values initially are 😍😍", formik.values);

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

  return (
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
            {formik.touched.minimumCartValue && formik.errors.minimumCartValue}
          </div>

          {/* startDate */}

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
                Default radio
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
                Default radio
              </label>
            </button>
          </div>

          <div className="error">
            {formik.touched.isActive && formik.errors.isActive}
          </div>
          {/* <div className="form-controled">
            <input
              id="isActive"
              type="radio"
              label="Is Active"
              name="isActive"
              value={formik.values.isActive}
              onChange={formik.handleChange("isActive")}
              onBlur={formik.handleBlur("isActive")}
            />
            <label htmlFor="isActive">Is Active</label>
            
          </div> */}

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Coupon Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
