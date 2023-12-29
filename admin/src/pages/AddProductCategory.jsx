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
import { createProductCategory } from "../features/product-category/ProductCategorySlice";

// ❗❗❗❗❗❗❗❗❗❗   yup Validations          ❗❗❗❗❗❗❗❗❗❗
let schema = yup.object().shape({
  name: yup.string().required("ProductCategory name is required"),
});

const AddProductCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingToastId, setLoadingToastId] = useState(null);

  const newProductCategory = useSelector((state) => state.productCategory);
  const { createdProductCategory, isSuccess, isLoading, isError } =
    newProductCategory;

  useEffect(() => {
    if (formik.isSubmitting) {
      if (isSuccess && createdProductCategory) {
        console.log("loadingToastId 💘💘 : ", loadingToastId);
        showToastSuccess(
          "ProductCategory Created Successfully",
          loadingToastId
        );
      }
      if (isError) {
        showToastError("ProductCategory Creation Failed");
      }
    }
  }, [createdProductCategory, isSuccess, isLoading, isError]);

  // async functions for dispatching createProductCategory
  const handleCreateProductCategory = async (values) => {
    try {
      const response = await dispatch(createProductCategory(values));
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
      const toastId = showToastLoading("Creating ProductCategory");
      console.log("toastId during formik operation 🚚🚚 : ", toastId);
      setLoadingToastId(toastId);
      console.log("values : ", values);
      // alert(JSON.stringify(values, null, 2));
      console.log("form is submited 🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚");
      await handleCreateProductCategory(values);
      formik.resetForm();
      // showToastSuccess("ProductCategory Created Successfully", toastId);
      // setTimeout(() => {
      //   navigate("/admin/product-category-list");
      // }, 3000);
    },
  });

  return (
    <div>
      <Toast />
      <h3 className="mb-4 title">Add Product Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            id="product-category"
            type="text"
            label="Enter Product Category"
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
            Add Product Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductCategory;
