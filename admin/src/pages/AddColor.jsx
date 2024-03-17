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
  createColor,
  getAColor,
  resetState,
  updateColor,
} from "../features/color/ColorSlice";
import { Select } from "antd";
import { getColors } from "../features/color/ColorSlice";

// ❗❗❗❗❗❗❗❗❗❗   yup Validations          ❗❗❗❗❗❗❗❗❗❗
let schema = yup.object().shape({
  name: yup.string().required("Color name is required"),
});
import { ProductColorsEnum } from "../features/color/ProductColorsEnum";
import Meta from "../components/Meta";

const AddColor = () => {
  useEffect(() => {
    dispatch(getColors());
  }, []);

  const colorState = useSelector((state) => state.color.colors);
  // console.log("colorState : ", colorState);

  const location = useLocation();
  const getColorId = location.pathname.split("/")[3];
  console.log("getColorId in AddColor is : ", getColorId);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingCreateToastId, setLoadingCreateToastId] = useState(null);
  const [loadingUpdateToastId, setLoadingUpdateToastId] = useState(null);

  const newColor = useSelector((state) => state.color);
  const { createdColor, isSuccess, isLoading, isError, color, updatedColor } =
    newColor;

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getAColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);

  const colorOptions = Object.values(ProductColorsEnum)
    .filter((color) => !colorState.map((item) => item.name).includes(color))
    .map((color) => ({
      value: color,
      label: color,
    }));
  // console.log("anotherChoice : ", colorOptions);

  useEffect(() => {
    if (formik.isSubmitting) {
      console.log(`formik is submitting ❤❤🤍❤💙💙💚💛🧡❤
      createdColor: ${createdColor},isSuccess: ${isSuccess}, isLoading:${isLoading}, isError:${isError}, color:${color}, updatedColor:${updatedColor}
      `);
      if (isSuccess && createdColor && Object.keys(createdColor).length > 0) {
        showToastSuccess("Color Created Successfully", loadingCreateToastId);
      } else if (
        isSuccess &&
        updatedColor &&
        Object.keys(updatedColor).length > 0
      ) {
        showToastSuccess("Color Updated Successfully", loadingUpdateToastId);
      } else if (isError) {
        showToastError("Color Creation Failed");
      }
    }
  }, [createdColor, updatedColor]);

  // async functions for dispatching createColor
  const handleCreateColor = async (values) => {
    try {
      const response = await dispatch(createColor(values));
      console.log("response : ", response);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  // async functions for dispatching updateColor
  const handleUpdateColor = async (values) => {
    try {
      const response = await dispatch(updateColor(values));
      console.log("response : ", response);
    } catch (error) {
      console.log("error : ", error);
    }
  };
  const initialValues = {
    name: color?.name || "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log("getColorId in AddColor is given by🚁🚁 : ", getColorId);
      if (getColorId !== undefined) {
        const toastId = showToastLoading("updating Color");
        setLoadingUpdateToastId(toastId);
        const data = {
          colorId: getColorId,
          name: values.name,
        };
        await handleUpdateColor(data);
      } else {
        const toastId = showToastLoading("Creating Color");
        setLoadingCreateToastId(toastId);
        await handleCreateColor(values);
      }
      console.log("values : ", values);
      // alert(JSON.stringify(values, null, 2));
      console.log("form is submited 🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚");
      formik.resetForm();
      dispatch(resetState());
      setTimeout(() => {
        navigate("/admin/color-list");
      }, 500);
    },
  });

  const handleColorsChange = (event) => {
    // console.log("event 🔴🟢⚪ : ", event);
    formik.setFieldValue("name", event);
  };
  const onSearch = (value) => {
    // console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <Meta title={"Add Color"} />

      <div>
        <Toast />

        <h3 className="mb-4 title">
          {getColorId !== undefined ? `Edit` : `Add`} Color
        </h3>
        <div>
          <form action="" onSubmit={formik.handleSubmit}>
            <h5 className="color-headings ">
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
            <h5 className="color-headings ">
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
            <h5 className="color-headings ">
              Select Color From Dropdown{" "}
              <span className="example">
                (Choose from a Selection of Sample Colors, yet to be
                incorporated)
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
              {getColorId !== undefined ? `Edit` : `Add`} Color
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddColor;
