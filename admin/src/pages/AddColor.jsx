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
import { Select } from "antd";
import { getColors } from "../features/color/ColorSlice";

// ❗❗❗❗❗❗❗❗❗❗   yup Validations          ❗❗❗❗❗❗❗❗❗❗
let schema = yup.object().shape({
  name: yup.string().required("Color name is required"),
});
import { ProductColorsEnum } from "../features/color/ProductColorsEnum";

const AddColor = () => {
  useEffect(() => {
    dispatch(getColors());
  }, []);

  const colorState = useSelector((state) => state.color.colors);
  console.log("colorState : ", colorState);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingToastId, setLoadingToastId] = useState(null);

  const newColor = useSelector((state) => state.color);
  const { createdColor, isSuccess, isLoading, isError } = newColor;

  // const colorOptions = [];
  // colorState.forEach((color, key) => {
  //   colorOptions.push({
  //     label: color.name,
  //     value: color._id,
  //   });
  // });

  // const colorOptions = Object.values(ProductColorsEnum).filter(
  //   (color) => !colorState.map((item) => item.name).includes(color)
  // );

  const colorOptions = Object.values(ProductColorsEnum)
    .filter((color) => !colorState.map((item) => item.name).includes(color))
    .map((color) => ({
      value: color,
      label: color,
    }));
  console.log("anotherChoice : ", colorOptions);

  useEffect(() => {
    if (formik.isSubmitting) {
      if (isSuccess && createdColor) {
        console.log("loadingToastId 💘💘 : ", loadingToastId);
        showToastSuccess("Color Created Successfully", loadingToastId);
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
      formik.values.name = "";
      formik.resetForm();

      // showToastSuccess("Color Created Successfully", toastId);
      setTimeout(() => {
        navigate("/admin/color-list");
      }, 3000);
    },
  });

  const handleColorsChange = (event) => {
    // console.log("event 🔴🟢⚪ : ", event);
    formik.setFieldValue("name", event);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div>
      <Toast />

      <h3 className="mb-4 title">Add Color</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <h5 className="headings">
            Choose Color{" "}
            <span className="example">
              (Choose from Color picker- RGB / HSL / HEX )
            </span>
          </h5>

          <CustomInput
            id="color"
            type="color"
            label="Enter Color"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
          />
          <div className="error mt-3">
            {formik.touched.name && formik.errors.name}
          </div>

          {/* Another way to choossing the color by manual word choice */}
          <h5 className="headings">
            Enter Color Name or HEX Code{" "}
            <span className="example">(ex. RED / #FF0000)</span>
          </h5>
          <CustomInput
            id="color"
            type="text"
            label="Enter Color"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
          />
          <div className="error mt-3">
            {formik.touched.name && formik.errors.name}
          </div>

          {/* Another way to choossing the color by manual word choice */}
          <h5 className="headings">
            Select Color From Dropdown{" "}
            <span className="example">
              (Choose from a Selection of Sample Colors, yet to be incorporated)
            </span>
          </h5>
          <Select
            showSearch
            className="w-100 "
            style={{ width: "100%" }}
            placeholder="Select a Color"
            optionFilterProp="children"
            // onChange={onChange}
            onChange={(event) => {
              handleColorsChange(event);
            }}
            onSearch={onSearch}
            filterOption={filterOption}
            options={colorOptions}
          />
          <div className="error mt-3">
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
