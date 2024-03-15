import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { getBlogCategories } from "../features/blog-category/BlogCategorySlice";
import { uploadImages } from "../features/upload-blog-images/UploadSlice";
import { deleteImages } from "../features/upload-blog-images/UploadSlice";
import {
  getABlog,
  createBlog,
  resetState,
  updateBlog,
} from "../features/blog/BlogSlice";
import { useLocation, useNavigate } from "react-router-dom";
import {
  showToastLoading,
  showToastSuccess,
  showToastError,
  Toast,
} from "../utils/HotToastHandler";

const validMongoDBIdRegex = /^[0-9a-fA-F]{24}$/;

// ❗❗❗❗❗❗❗❗❗❗   yup Validations          ❗❗❗❗❗❗❗❗❗❗
let schema = yup.object().shape({
  title: yup.string().required("name is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  images: yup.array().required("Images are required"),
});

const AddBlog = () => {
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];
  console.log("getBlogId in AddBlog is : ", getBlogId);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newImageState, setNewImageState] = useState([]);
  const [loadingCreateToastId, setLoadingCreateToastId] = useState(null);
  const [loadingUpdateToastId, setLoadingUpdateToastId] = useState(null);
  const [garbageImageStates, setGarbageImageStates] = useState([]);

  useEffect(() => {
    dispatch(getBlogCategories());
    dispatch(uploadImages());
    dispatch(deleteImages());
  }, []);

  const blogCategoryState = useSelector(
    (state) => state.blogCategory.blogCategories
  );
  console.log("blogCategoryState in AddBlog is : ", blogCategoryState);

  const imageState = useSelector((state) => state.uploadBlogImage.images);
  console.log("imageState : ", imageState);

  const newBlog = useSelector((state) => state.blog);
  const { createdBlog, isSuccess, isLoading, isError, blog, updatedBlog } =
    newBlog;
  console.log("blog in AddBlog is : ", blog);

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);

  useEffect(() => {
    if (formik.isSubmitting) {
      console.log(`formik is submitting ❤❤🤍❤💙💙💚💛🧡❤
      createdBlog: ${createdBlog},isSuccess: ${isSuccess}, isLoading:${isLoading}, isError:${isError}, blog:${blog}, updatedBlog:${updatedBlog}
      `);
      if (isSuccess && createdBlog && Object.keys(createdBlog).length > 0) {
        showToastSuccess("Blog Created Successfully", loadingCreateToastId);
      } else if (
        isSuccess &&
        updatedBlog &&
        Object.keys(updatedBlog).length > 0
      ) {
        showToastSuccess("Blog Updated Successfully", loadingUpdateToastId);
      } else if (isError) {
        showToastError("Blog Creation Failed");
      }
    }
  }, [createdBlog, updatedBlog]);

  useEffect(() => {
    // Extract URLs from imageState and update newImageState
    setNewImageState(imageState.map((image) => image.url));
  }, [imageState]);
  console.log("newImageState : ", newImageState);

  useEffect(() => {
    if (newImageState && newImageState?.length > 0) {
      formik.setFieldValue("images", newImageState);
    }
  }, [newImageState]);

  const removeImageFromContainer = (publicId) => {
    // Use the setGarbageImageStates function to update the state
    setGarbageImageStates((prevValues) => [...prevValues, publicId]);
    // Filter newImageState without modifying it directly
    setNewImageState((prevImageState) =>
      prevImageState.filter((image) => image.public_id !== publicId)
    );
  };

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

  // async functions for dispatching createBlog
  const handleCreateBlog = async (values) => {
    try {
      const response = await dispatch(createBlog(values));
      console.log("response : ", response);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  // async functions for dispatching updateBlog
  const handleUpdateBlog = async (values) => {
    try {
      const response = await dispatch(updateBlog(values));
      console.log("response : ", response);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  // function to convert normal string into htmltext
  const plainToHtmlText = (text) => {
    const htmlText = `<p>${text}</p>`;
    return htmlText;
  };

  const initialValues = {
    title: blog?.title || "",
    category: blog?.category || "",
    description: blog?.description || "",
    images: blog?.images || [],
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log("getBlogId in AddBlog is given by🚁🚁 : ", getBlogId);
      if (getBlogId !== undefined) {
        const toastId = showToastLoading("updating Blog");
        setLoadingUpdateToastId(toastId);
        const data = {
          blogId: getBlogId,
          name: values.name,
          category: values.category,
          description: values.description,
        };
        await handleUpdateBlog(data);
      } else {
        const toastId = showToastLoading("Creating Blog");
        setLoadingCreateToastId(toastId);
        await handleCreateBlog(values);
      }

      console.log("garbageImageStates before: ", garbageImageStates);
      await handleDeleteImages();
      console.log("garbageImageStates after: ", garbageImageStates);
      // await handleCreateBlog(values);
      console.log("Blog created successfully 🎉🍾🎊🎉🍾🎊🎉🍾🎊🎉🍾🎊");

      console.log("values : ", values);
      // alert(JSON.stringify(values, null, 2));
      console.log("form is submited 🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚");
      formik.resetForm();
      dispatch(resetState());
      setNewImageState([]);
      setGarbageImageStates([]);
      setTimeout(() => {
        navigate("/admin/blog-list");
      }, 500);
      // chack all the created/ possible variables or arrays to be reseted

      // `);
    },
  });

  console.log("formik values : 🌹🌹", formik.values);

  // Function to extract text from HTML string
  const extractTextFromHTML = (htmlString) => {
    console.log("htmlString :🐱🐱 ", htmlString);
    console.log("typeof htmlString : ", typeof htmlString);
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;
    return tempElement.textContent || tempElement.innerText;
  };
  return (
    <div>
      <h3 className="mb-4 title">
        {getBlogId !== undefined ? `Edit` : `Add`} Blog
      </h3>
      <Toast />
      <div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3"
        >
          {/*🔼🔼📂📂📂📁 Images upload 📂📂📂📁🔼🔼  */}
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={async (acceptedFiles) => {
                const response = await dispatch(uploadImages(acceptedFiles));
                console.log("response 😂😂 : ", response);
              }}
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
          {/* ✔✔✔ Input ✔✔✔ */}
          <div className="mt-4">
            <CustomInput
              type="text"
              label="Enter Blog title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
          </div>
          {/*✅✅✅ Select blog Category ✅✅✅ */}
          <select
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Category</option>
            {blogCategoryState.map((category, key) => {
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
          {/* 📝📝📝✍🏻
          ✍🏻✍🏻 Description ✍🏻✍🏻✍🏻📝📝📝 */}
          <div className="mb-0">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={(htmlValue) => {
                console.log("htmlValue : ✅✅✅✅", htmlValue);
                // const plainText = extractTextFromHTML(htmlValue).trim();
                // console.log("plainText : 💖💖💖💖", plainText);
                formik.setFieldValue("description", htmlValue);
              }}
              value={formik.values.description}

              // onChange={(htmlValue) => {
              //   // Extract text without HTML tags
              //   console.log("htmlValue : ", htmlValue);
              //   const plainText = extractTextFromHTML(htmlValue).trim();
              //   console.log("plainText : ", plainText);
              //   // Set the plain text value to formik
              //   // formik.setFieldValue("description", plainText);
              //   // formik.handleChange("description")
              //   // formik.setFieldValue("description", htmlValue);
              // }}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBlogId !== undefined ? `Edit` : `Add`} Blog{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
