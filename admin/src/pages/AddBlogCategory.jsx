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
import { createBlogCategory } from "../features/blog-category/BlogCategorySlice";

// ❗❗❗❗❗❗❗❗❗❗   yup Validations          ❗❗❗❗❗❗❗❗❗❗
let schema = yup.object().shape({
  name: yup.string().required("BlogCategory name is required"),
});

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingToastId, setLoadingToastId] = useState(null);

  const newBlogCategory = useSelector((state) => state.blogCategory);
  const { createdBlogCategory, isSuccess, isLoading, isError } =
    newBlogCategory;
  // console.log("createdBlogCategory in AddBlogCategory is : ", createdBlogCategory);
  useEffect(() => {
    if (formik.isSubmitting) {
      if (isSuccess && createdBlogCategory) {
        console.log("toastId : ", loadingToastId);
        showToastSuccess("BlogCategory Created Successfully", loadingToastId);
      }
      if (isError) {
        showToastError("BlogCategory Creation Failed");
      }
    }
  }, [createdBlogCategory, isSuccess, isLoading, isError]);

  // async functions for dispatching createBlogCategory
  const handleCreateBlogCategory = async (values) => {
    try {
      const response = await dispatch(createBlogCategory(values));
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
      const toastId = showToastLoading("Creating BlogCategory");
      setLoadingToastId(toastId);
      console.log("values : ", values);
      // alert(JSON.stringify(values, null, 2));
      console.log("form is submited 🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚");
      await handleCreateBlogCategory(values);
      formik.resetForm();
      // showToastSuccess("BlogCategory Created Successfully", toastId);
      // setTimeout(() => {
      //   navigate("/admin/brand-list");
      // }, 3000);
    },
  });

  return (
    <div>
      <Toast />
      <h3 className="mb-4 title">Add blog Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            id="blog-category"
            type="text"
            label="Enter Blog Category"
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
            Add Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
