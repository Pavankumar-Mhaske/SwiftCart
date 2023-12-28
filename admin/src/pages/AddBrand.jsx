import React, { useEffect } from "react";
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
import { createBrand } from "../features/brand/BrandSlice";
// ❗❗❗❗❗❗❗❗❗❗   yup Validations          ❗❗❗❗❗❗❗❗❗❗
let schema = yup.object().shape({
  name: yup.string().required("Brand name is required"),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let toastId = "";
  const newBrand = useSelector((state) => state.brand);
  const { createdBrand, isSuccess, isLoading, isError } = newBrand;
  console.log("createdBrand in AddBrand is : ", createdBrand);
  useEffect(() => {
    if (isSuccess && createdBrand) {
      console.log("toastId : ", toastId);
      showToastSuccess("Brand Created Successfully", toastId);
    }
    if (isError) {
      showToastError("Brand Creation Failed", toastId);
    }
  }, [createdBrand, isSuccess, isLoading, isError]);
  
  // async functions for dispatching createBrand
  const handleCreateBrand = async (values) => {
    try {
      const response = await dispatch(createBrand(values));
      console.log("response : ", response);
    } catch (error) {
      console.log("error : ", error);
    }
  };
  const initialValues = {
    name: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      toastId = showToastLoading("Creating Brand");
      console.log("values : ", values);
      // alert(JSON.stringify(values, null, 2));
      console.log("form is submited 🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚");
      await handleCreateBrand(values);
      formik.resetForm();
      // showToastSuccess("Brand Created Successfully", toastId);
      // setTimeout(() => {
      //   navigate("/admin/brand-list");
      // }, 3000);
    },
  });

  return (
    <div>
      <Toast />
      <h3 className="mb-4 title">Add Brand Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            id="brand"
            type="text"
            label="Enter Brand Category"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Brand Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
