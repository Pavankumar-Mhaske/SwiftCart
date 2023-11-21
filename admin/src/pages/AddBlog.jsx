import React, { useRef, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { Stepper } from "react-form-stepper";
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

const AddBlog = () => {
  const [description, setDescription] = useState();

  const handleDescription = (value) => {
    setDescription(value);
    // console.log(value);
  };
  return (
    <div>
      <h3 className="mb-4">Add Blog</h3>
      {/* <Stepper
        steps={[
          { label: "Add Blog Details" },
          { label: "Upload Images" },
          { label: "Finish" },
        ]}
        activeStep={1}
      /> */}
      <div>
        <form action="">
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
          {/* ✔✔✔ Input ✔✔✔ */}
          <div className="mt-4">
            <CustomInput type="text" label="Enter Blog title" />
          </div>
          {/*✅✅✅ Select blog Category ✅✅✅ */}
          <select name="" className="form-control py-3 mb-3" id="">
            <option value="">Select Blog Category</option>
          </select>
          {/* 📝📝📝✍🏻✍🏻✍🏻 Description ✍🏻✍🏻✍🏻📝📝📝 */}
          <ReactQuill
            theme="snow"
            value={description}
            onChange={(event) => {
              handleDescription(event);
            }}
          />
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
