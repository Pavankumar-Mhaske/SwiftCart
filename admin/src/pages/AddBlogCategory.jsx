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
  createBlogCategory,
  getABlogCategory,
  resetState,
  updateBlogCategory,
} from "../features/blog-category/BlogCategorySlice";

// ❗❗❗❗❗❗❗❗❗❗   yup Validations          ❗❗❗❗❗❗❗❗❗❗
let schema = yup.object().shape({
  name: yup.string().required("BlogCategory name is required"),
});

const AddBlogCategory = () => {
  const location = useLocation();
  const getBlogCategoryId = location.pathname.split("/")[3];
  console.log("getBlogCategoryId in AddBlogCategory is : ", getBlogCategoryId);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingCreateToastId, setLoadingCreateToastId] = useState(null);
  const [loadingUpdateToastId, setLoadingUpdateToastId] = useState(null);

  const newBlogCategory = useSelector((state) => state.blogCategory);
  const {
    createdBlogCategory,
    isSuccess,
    isLoading,
    isError,
    blogCategory,
    updatedBlogCategory,
  } = newBlogCategory;
  // console.log("createdBlogCategory in AddBlogCategory is : ", createdBlogCategory);

  useEffect(() => {
    if (getBlogCategoryId !== undefined) {
      dispatch(getABlogCategory(getBlogCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogCategoryId]);

  useEffect(() => {
    if (formik.isSubmitting) {
      console.log(`formik is submitting ❤❤🤍❤💙💙💚💛🧡❤
      createdBlogCategory: ${createdBlogCategory}, isSuccess: ${isSuccess}, isLoading:${isLoading}, isError:${isError}, blogCategory:${blogCategory}, updatedBlogCategory:${updatedBlogCategory}
      `);
      if (
        isSuccess &&
        createdBlogCategory &&
        Object.keys(createdBlogCategory).length > 0
      ) {
        showToastSuccess(
          "BlogCategory Created Successfully",
          loadingCreateToastId
        );
      } else if (
        isSuccess &&
        updatedBlogCategory &&
        Object.keys(updatedBlogCategory).length > 0
      ) {
        showToastSuccess(
          "BlogCategory Updated Successfully",
          loadingUpdateToastId
        );
      } else if (isError) {
        showToastError("BlogCategory Creation Failed");
      }
    }
  }, [createdBlogCategory, updatedBlogCategory]);

  // async functions for dispatching createBlogCategory
  const handleCreateBlogCategory = async (values) => {
    try {
      const response = await dispatch(createBlogCategory(values));
      console.log("response : ", response);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  // async functions for dispatching updateBlogCategory
  const handleUpdateBlogCategory = async (values) => {
    try {
      const response = await dispatch(updateBlogCategory(values));
      console.log("response : ", response);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const initialValues = {
    name: blogCategory?.name || "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log(
        "getBlogCategoryId in AddBlogCategory is given by🚁🚁 : ",
        getBlogCategoryId
      );
      if (getBlogCategoryId !== undefined) {
        const toastId = showToastLoading("updating BlogCategory");
        setLoadingUpdateToastId(toastId);
        const data = {
          blogCategoryId: getBlogCategoryId,
          name: values.name,
        };
        await handleUpdateBlogCategory(data);
      } else {
        const toastId = showToastLoading("Creating BlogCategory");
        setLoadingCreateToastId(toastId);
        await handleCreateBlogCategory(values);
      }
      console.log("values : ", values);
      // alert(JSON.stringify(values, null, 2));
      console.log("form is submited 🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚");
      formik.resetForm();
      dispatch(resetState());
      setTimeout(() => {
        navigate("/admin/blog-category-list");
      }, 500);
    },
  });

  return (
    <div>
      <Toast />
      <h3 className="mb-4 title">
        {getBlogCategoryId !== undefined ? `Edit` : `Add`} BlogCategory
      </h3>
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
            {getBlogCategoryId !== undefined ? `Edit` : `Add`} BlogCategory
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
