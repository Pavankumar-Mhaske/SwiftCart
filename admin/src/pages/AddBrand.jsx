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
  createBrand,
  getABrand,
  resetState,
  updateBrand,
} from "../features/brand/BrandSlice";

// ❗❗❗❗❗❗❗❗❗❗   yup Validations          ❗❗❗❗❗❗❗❗❗❗
let schema = yup.object().shape({
  name: yup.string().required("Brand name is required"),
});

const AddBrand = () => {
  const location = useLocation();
  const getBrandId = location.pathname.split("/")[3];
  console.log("getBrandId in AddBrand is : ", getBrandId);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingCreateToastId, setLoadingCreateToastId] = useState(null);
  const [loadingUpdateToastId, setLoadingUpdateToastId] = useState(null);

  const newBrand = useSelector((state) => state.brand);
  const { createdBrand, isSuccess, isLoading, isError, brand, updatedBrand } =
    newBrand;
  console.log("brand in AddBrand is : ", brand);

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  useEffect(() => {
    if (formik.isSubmitting) {
      console.log(`formik is submitting ❤❤🤍❤💙💙💚💛🧡❤
      createdBrand: ${createdBrand},isSuccess: ${isSuccess}, isLoading:${isLoading}, isError:${isError}, brand:${brand}, updatedBrand:${updatedBrand}
      `);
      if (isSuccess && createdBrand && Object.keys(createdBrand).length > 0) {
        showToastSuccess("Brand Created Successfully", loadingCreateToastId);
      } else if (
        isSuccess &&
        updatedBrand &&
        Object.keys(updatedBrand).length > 0
      ) {
        showToastSuccess("Brand Updated Successfully", loadingUpdateToastId);
      } else if (isError) {
        showToastError("Brand Creation Failed");
      }
    }
  }, [createdBrand, updatedBrand]);

  // async functions for dispatching createBrand
  const handleCreateBrand = async (values) => {
    try {
      const response = await dispatch(createBrand(values));
      console.log("response : ", response);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  // async functions for dispatching updateBrand
  const handleUpdateBrand = async (values) => {
    try {
      const response = await dispatch(updateBrand(values));
      console.log("response : ", response);
    } catch (error) {
      console.log("error : ", error);
    }
  };
  const initialValues = {
    name: brand?.name || "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log("getBrandId in AddBrand is given by🚁🚁 : ", getBrandId);
      if (getBrandId !== undefined) {
        const toastId = showToastLoading("updating Brand");
        setLoadingUpdateToastId(toastId);
        const data = {
          brandId: getBrandId,
          name: values.name,
        };
        await handleUpdateBrand(data);
      } else {
        const toastId = showToastLoading("Creating Brand");
        setLoadingCreateToastId(toastId);
        await handleCreateBrand(values);
      }
      console.log("values : ", values);
      // alert(JSON.stringify(values, null, 2));
      console.log("form is submited 🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚");
      formik.resetForm();
      dispatch(resetState());
      setTimeout(() => {
        navigate("/admin/brand-list");
      }, 500);
    },
  });

  return (
    <div>
      <Toast />
      <h3 className="mb-4 title">
        {getBrandId !== undefined ? `Edit` : `Add`} Brand
      </h3>
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
            {getBrandId !== undefined ? `Edit` : `Add`} Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
