import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
/** upload images */
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const AddProduct = () => {
  const [description, setDescription] = useState();

  const handleDescription = (value) => {
    setDescription(value);
    // console.log(value);
  };

  return (
    <div>
      <h3 className="mb-4">Add Product</h3>
      <div>
        <form action="">
          {/* title, description, price, category, color, brand, quantity, images, */}
          <CustomInput type="text" label="Enter Product Title" />
          {/* 📝📝📝✍🏻✍🏻✍🏻 Description ✍🏻✍🏻✍🏻📝📝📝 */}
          <div className="mb-3">
            <ReactQuill
              theme="snow"
              value={description}
              onChange={(event) => {
                handleDescription(event);
              }}
            />
          </div>
          <CustomInput type="number" label="Enter Product Price" />
          {/* 👑👑👑 Category, Color, Brand❓👑👑👑 */}
          {/*✅✅✅ Select Category ✅✅✅ */}
          <select name="" className="form-control py-3 mb-3" id="">
            <option value="">Select Category</option>
          </select>
          {/*✅✅✅ Select Color ✅✅✅ */}
          <select name="" className="form-control py-3 mb-3" id="">
            <option value="">Select Color</option>
          </select>
          {/*✅✅✅ Select Brand ✅✅✅ */}
          <select name="" className="form-control py-3 mb-3" id="">
            <option value="">Select Brand</option>
          </select>

          <CustomInput type="number" label="Enter Product Quantity" />

          {/*🔼🔼📂📂📂📁 Images upload 📂📂📂📁🔼🔼  */}
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
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
