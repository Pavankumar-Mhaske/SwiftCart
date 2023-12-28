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
import { deleteImages } from "../features/upload-product-images/UploadSlice";
import { createProduct } from "../features/product/ProductSlice";

const validMongoDBIdRegex = /^[0-9a-fA-F]{24}$/;

// ❗❗❗❗❗❗❗❗❗❗   yup Validations          ❗❗❗❗❗❗❗❗❗❗
let schema = yup.object().shape({
  name: yup.string().required("name is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required"),
  category: yup.string().required("Category is required"),
  // color: yup.array().required("Colors are required"),
  colors: yup
    .array()
    .of(
      yup
        .string()
        .matches(validMongoDBIdRegex, "Invalid MongoDB ID")
        .required("Color ID is required")
    )
    .min(1, "At least one color must be selected") // Adjust the minimum number of selected colors
    .required("Colors are required"),
  // other fields

  brand: yup.string().required("Brand is required"),
  stock: yup.number().required("stock is required"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  // const [color, setColor] = useState([]);
  const [newImageState, setNewImageState] = useState([]);
  const [garbageImageStates, setGarbageImageStates] = useState([]);
  // console.log("color in color : ", color);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getProductCategories());
    dispatch(getColors());
    dispatch(uploadImages());
    dispatch(deleteImages());
  }, []);

  const productCategoryState = useSelector(
    (state) => state.productCategory.productCategories
  );
  // console.log("productCategoryState : ", productCategoryState);

  const colorState = useSelector((state) => state.color.colors);
  console.log("colorState : ", colorState);

  const brandState = useSelector((state) => state.brand.brands);
  // console.log("brandState : ", brandState);

  const imageState = useSelector((state) => state.uploadProductImage.images);
  console.log("imageState : ", imageState);

  useEffect(() => {
    // Extract URLs from imageState and update newImageState
    setNewImageState(imageState.map((image) => image.url));
  }, [imageState]);
  console.log("newImageState : ", newImageState);

  const removeImageFromContainer = (publicId) => {
    // Use the setGarbageImageStates function to update the state
    setGarbageImageStates((prevValues) => [...prevValues, publicId]);
    // Filter newImageState without modifying it directly
    setNewImageState((prevImageState) =>
      prevImageState.filter((image) => image.public_id !== publicId)
    );
  };

  const colors = [];
  colorState.forEach((color, key) => {
    colors.push({
      id: key + 1,
      color: color.name,
    });
  });

  const deleteImageAsync = async (publicId) => {
    try {
      console.log("Deleting image: ", publicId);
      await dispatch(deleteImages(publicId));
      console.log("Image deleted successfully: ", publicId);
    } catch (error) {
      console.error("Error deleting image: ", publicId, error);
      // Handle the error as needed
    }
  };

  const handleDeleteImages = async () => {
    // for (const publicId of garbageImageStates) {
    while (garbageImageStates.length > 0) {
      // Remove the first element (pop) and get its value
      const publicId = garbageImageStates.shift();
      await deleteImageAsync(publicId);
      console.log(
        "garbageImageStates in handleDeleteImages is 💔: ",
        garbageImageStates
      );
    }
    console.log("All images deleted");
  };

  const initialValues = {
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
    colors: colorState.length > 0 ? [colorState[0]] : [],
  };

  // console.log("initialValues : ", initialValues);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log("values : ", values);
      alert(JSON.stringify(values, null, 2));
      console.log("garbageImageStates before: ", garbageImageStates);
      // await handleDeleteImages();
      console.log("form is submited 🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚");
      console.log("garbageImageStates after: ", garbageImageStates);
      // dispatch(createProduct(values));
    },
  });

  // Function to extract text from HTML string
  const extractTextFromHTML = (htmlString) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;
    return tempElement.textContent || tempElement.innerText;
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
          {/* name, description, price, category, color, brand, stock, images, */}
          {/* 🙏🏻🙏🏻🙏🏻🙏🏻🙏🏻 name 🙏🏻🙏🏻🙏🏻🙏🏻🙏🏻 */}
          <CustomInput
            type="text"
            label="Enter Product name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          {/* 📝📝📝✍🏻✍🏻✍🏻 Description ✍🏻✍🏻✍🏻📝📝📝 */}
          <div className="mb-0">
            <ReactQuill
              theme="snow"
              name="description"
              // value={formik.values.description}
              // onChange={formik.handleChange("description")}
              onChange={(htmlValue) => {
                // Extract text without HTML tags
                console.log("htmlValue : ", htmlValue);
                const plainText = extractTextFromHTML(htmlValue).trim();
                console.log("plainText : ", plainText);
                // Set the plain text value to formik
                formik.setFieldValue("description", plainText);
                // formik.handleChange("description")
              }}
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
                <option key={key} value={category._id}>
                  {category.name}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          {/*✅✅✅🔴🟠🟡🟢🔵🟣🟤⚫🔘⬛⬜ Select Color 🔴🟠🟡🟢🔵🟣🟤⚫🔘⬛⬜ ✅✅✅ */}
          <Multiselect
            name="colors"
            dataKey="id"
            textField="color"
            defaultValue={[1]}
            data={colors}
            onChange={(event) => {
              console.log("event 🔴🟢⚪ : ", event);

              const colorIds = [];
              event.map((color, key) => {
                // console.log("color 🔴🟢⚪ : ", color);
                // from this id find id in the colorState
                const parentColor = colorState.find(
                  (colorState) => colorState.name === color.color
                );
                // and map this id's into the formik.values.colors array
                // console.log(`parentColor ${key} 🔴🟢⚪ : `, parentColor);
                colorIds.push(parentColor._id);
              });
              // console.log("colorIds 🔴🟢⚪ : ", colorIds);
              formik.setFieldValue("colors", colorIds);
              // formik.setFieldValue("colors", event);
            }}
          />
          <div className="error">
            {formik.touched.colors && formik.errors.colors}
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
          {/*📈📈📈📈📈📈📈📈 stock 📈📈📈📈📈📈📈📈 */}
          <CustomInput
            type="number"
            label="Enter Product stock"
            name="stock"
            value={formik.values.stock}
            onChange={formik.handleChange("stock")}
            onBlur={formik.handleBlur("stock")}
          />
          <div className="error">
            {formik.touched.stock && formik.errors.stock}
          </div>
          {/*🔼🔼📂📂📂📁 Images upload 📂📂📂📁🔼🔼  */}

          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImages(acceptedFiles))}
            >
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
          <div className="showImages d-flex flex-wrap ">
            {newImageState?.map((image, key) => {
              {
                /* console.log("Image in the imageState : ", image); */
              }
              return (
                <div
                  key={key}
                  className="uploadedImage p-1 col-4 position-relative "
                >
                  <button
                    onClick={() => removeImageFromContainer(image.public_id)}
                    className="removeImage btn-close position-absolute rounded-circle "
                    style={{ top: "10px", right: "10px" }}
                    type="button"
                  ></button>
                  <img
                    src={image.url}
                    alt="Uploaded Image"
                    className="img-fluid border  "
                  />
                </div>
              );
            })}
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
