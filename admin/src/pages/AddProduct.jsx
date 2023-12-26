import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getProductCategories } from "../features/product-category/ProductCategorySlice";
import { getColors } from "../features/color/ColorSlice";
import { getBrands } from "../features/brand/BrandSlice";
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";
import Dropzone from "react-dropzone";
import { uploadImages } from "../features/upload-product-images/UploadSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required"),
  category: yup.string().required("Category is required"),
  // color: yup.array().required("Colors are required"),
  color: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().required("Color ID is required"),
        color: yup.string().required("Color name is required"),
      })
    )
    .min(1, "At least one color must be selected") // Adjust the minimum number of selected colors
    .required("Colors are required"),
  // other fields

  brand: yup.string().required("Brand is required"),
  quantity: yup.number().required("Quantity is required"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const [color, setColor] = useState([]);
  // console.log("color in color : ", color);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getProductCategories());
    dispatch(getColors());
    formik.values.color = color;
  }, []);

  const productCategoryState = useSelector(
    (state) => state.productCategory.productCategories
  );
  // console.log("productCategoryState : ", productCategoryState);

  const colorState = useSelector((state) => state.color.colors);
  // console.log("colorState : ", colorState);

  const colors = [];
  colorState.forEach((color, key) => {
    colors.push({
      id: key + 1,
      color: color.name,
    });
  });
  // console.log("colors : ", colors);

  const brandState = useSelector((state) => state.brand.brands);
  // console.log("brandState : ", brandState);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      color: [],
      brand: "",
      quantity: "",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      alert(JSON.stringify(valuesWithColors, null, 2));
      // displatch(login(values));
    },
  });

  const [description, setDescription] = useState();
  const handleDescription = (value) => {
    setDescription(value);
    // console.log(value);
  };

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3"
        >
          {/* title, description, price, category, color, brand, quantity, images, */}
          {/* 🙏🏻🙏🏻🙏🏻🙏🏻🙏🏻 title 🙏🏻🙏🏻🙏🏻🙏🏻🙏🏻 */}
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          {/* 📝📝📝✍🏻✍🏻✍🏻 Description ✍🏻✍🏻✍🏻📝📝📝 */}
          <div className="mb-0">
            <ReactQuill
              theme="snow"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange("description")}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          {/* 💸💸💸💰💰💰  Price 💸💸💸💰💰💰  */}
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange("price")}
            onBlur={formik.handleBlur("price")}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          {/* 👑👑👑 Category, Color, Brand❓👑👑👑 */}
          {/*✅✅✅ Select Category ✅✅✅ */}
          <select
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Category</option>
            {productCategoryState.map((category, key) => {
              return (
                <option key={key} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          {/*✅✅✅ Select Color ✅✅✅ */}
          <Multiselect
            name="color"
            dataKey="id"
            textField="color"
            defaultValue={[1]}
            data={colors}
            onChange={(event) => {
              setColor(event);
            }}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>
          {/* ✅✅✅ Select Brand ✅✅✅ */}
          <select
            name="brand"
            value={formik.values.brand}
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Brand</option>
            {brandState.map((brand, key) => {
              return (
                <option key={key} value={brand.name}>
                  {brand.name}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          {/*📈📈📈📈📈📈📈📈 Quantity 📈📈📈📈📈📈📈📈 */}
          <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange("quantity")}
            onBlur={formik.handleBlur("quantity")}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          {/*🔼🔼📂📂📂📁 Images upload 📂📂📂📁🔼🔼  */}

          <div className="bg-white border-1 p-5 text-center">
            <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImages(acceptedFiles))}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
