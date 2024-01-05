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
  createProductCategory,
  getAProductCategory,
  resetState,
  updateProductCategory,
} from "../features/product-category/ProductCategorySlice";

// ❗❗❗❗❗❗❗❗❗❗   yup Validations          ❗❗❗❗❗❗❗❗❗❗
let schema = yup.object().shape({
  name: yup.string().required("ProductCategory name is required"),
});

const AddProductCategory = () => {
  const location = useLocation();
  const getProductCategoryId = location.pathname.split("/")[3];
  console.log(
    "getProductCategoryId in AddProductCategory is : ",
    getProductCategoryId
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingCreateToastId, setLoadingCreateToastId] = useState(null);
  const [loadingUpdateToastId, setLoadingUpdateToastId] = useState(null);

  const newProductCategory = useSelector((state) => state.productCategory);
  const {
    createdProductCategory,
    isSuccess,
    isLoading,
    isError,
    productCategory,
    updatedProductCategory,
  } = newProductCategory;
  console.log("productCategory in AddProductCategory is : ", productCategory);

  useEffect(() => {
    if (getProductCategoryId !== undefined) {
      dispatch(getAProductCategory(getProductCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getProductCategoryId]);

  useEffect(() => {
    if (formik.isSubmitting) {
      console.log(`formik is submitting ❤❤🤍❤💙💙💚💛🧡❤
        createdProductCategory: ${createdProductCategory},isSuccess: ${isSuccess}, isLoading:${isLoading}, isError:${isError}, productCategory:${productCategory}, updatedProductCategory:${updatedProductCategory}
        `);
      if (
        isSuccess &&
        createdProductCategory &&
        Object.keys(createdProductCategory).length > 0
      ) {
        showToastSuccess(
          "ProductCategory Created Successfully",
          loadingCreateToastId
        );
      } else if (
        isSuccess &&
        updatedProductCategory &&
        Object.keys(updatedProductCategory).length > 0
      ) {
        showToastSuccess(
          "ProductCategory Updated Successfully",
          loadingUpdateToastId
        );
      } else if (isError) {
        showToastError("ProductCategory Creation Failed");
      }
    }
  }, [createdProductCategory, updatedProductCategory]);

  // async functions for dispatching createProductCategory
  const handleCreateProductCategory = async (values) => {
    try {
      const response = await dispatch(createProductCategory(values));
      console.log("response : ", response);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  // async functions for dispatching updateProductCategory
  const handleUpdateProductCategory = async (values) => {
    try {
      const response = await dispatch(updateProductCategory(values));
      console.log("response : ", response);
    } catch (error) {
      console.log("error : ", error);
    }
  };
  const initialValues = {
    name: productCategory?.name || "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log(
        "getProductCategoryId in AddProductCategory is given by🚁🚁 : ",
        getProductCategoryId
      );
      if (getProductCategoryId !== undefined) {
        const toastId = showToastLoading("updating ProductCategory");
        setLoadingUpdateToastId(toastId);
        const data = {
          productCategoryId: getProductCategoryId,
          name: values.name,
        };
        await handleUpdateProductCategory(data);
      } else {
        const toastId = showToastLoading("Creating ProductCategory");
        setLoadingCreateToastId(toastId);
        await handleCreateProductCategory(values);
      }
      console.log("values : ", values);
      // alert(JSON.stringify(values, null, 2));
      console.log("form is submited 🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚");
      formik.resetForm();
      dispatch(resetState());
      setTimeout(() => {
        navigate("/admin/product-category-list");
      }, 500);
    },
  });

  return (
    <div>
      <Toast />
      <h3 className="mb-4 title">
        {getProductCategoryId !== undefined ? "Update" : "Add"}
        ProductCategory
      </h3>
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
            {getProductCategoryId !== undefined ? "Update" : "Add"}
            ProductCategory
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductCategory;
