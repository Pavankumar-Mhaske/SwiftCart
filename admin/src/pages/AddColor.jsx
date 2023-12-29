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
import { createColor } from "../features/color/ColorSlice";

// ❗❗❗❗❗❗❗❗❗❗   yup Validations          ❗❗❗❗❗❗❗❗❗❗
let schema = yup.object().shape({
  name: yup.string().required("Color name is required"),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingToastId, setLoadingToastId] = useState(null);

  const newColor = useSelector((state) => state.color);
  const { createdColor, isSuccess, isLoading, isError } =
    newColor;

  useEffect(() => {
    if (formik.isSubmitting) {
      if (isSuccess && createdColor) {
        console.log("loadingToastId 💘💘 : ", loadingToastId);
        showToastSuccess(
          "Color Created Successfully",
          loadingToastId
        );
      }
      if (isError) {
        showToastError("Color Creation Failed");
      }
    }
  }, [createdColor, isSuccess, isLoading, isError]);

  // async functions for dispatching createColor
  const handleCreateColor = async (values) => {
    try {
      const response = await dispatch(createColor(values));
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
      const toastId = showToastLoading("Creating Color");
      console.log("toastId during formik operation 🚚🚚 : ", toastId);
      setLoadingToastId(toastId);
      console.log("values : ", values);
      // alert(JSON.stringify(values, null, 2));
      console.log("form is submited 🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚");
      await handleCreateColor(values);
      formik.resetForm();
      // showToastSuccess("Color Created Successfully", toastId);
      // setTimeout(() => {
      //   navigate("/admin/color-list");
      // }, 3000);
    },
  });

  return (
    <div>
      <Toast />

      <h3 className="mb-4 title">Add Color</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            id="color"
            type="color"
            label="Enter Color"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>

          {/* Another way to choossing the color by manual word choice */}
          <CustomInput
            id="color"
            type="text"
            label="Enter Color"
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
            Add Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
