import React, { useState, useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { FaHome } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaInfo } from "react-icons/fa";
import Container from "../components/Container";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createEnquiry, resetState } from "../features/contact/ContactSlice";
import {
  showToastLoading,
  showToastSuccess,
  showToastError,
  Toast,
} from "../utils/HotToastHandler";
import CustomInput from "../components/CustomInput";

let schema = yup.object().shape({
  name: yup.string().required("First Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: yup.string().required("Mobile Number is required"),
  comment: yup.string().required("Comment is required"),
});

const Contact = () => {
  const dispatch = useDispatch();
  const [loadingEnquiryToastId, setLoadingEnquiryToastId] = useState(null);

  const newEnquiry = useSelector((state) => state.contact);
  const { isSuccess, isError, enquiry } = newEnquiry;
  console.log(" 📧 newEnquiry in Contact : ", enquiry);

  useEffect(() => {
    console.log("inside of the useEffect for success or error message 💥💥");
    if (isSuccess && enquiry && Object.keys(enquiry).length > 0) {
      showToastSuccess(
        "Enquiry Submitted Successfully!",
        loadingEnquiryToastId
      );
    } else if (isError) {
      showToastError("Something went wrong");
    }
  }, [enquiry]);

  const handleEnquiry = async (values) => {
    try {
      const response = await dispatch(createEnquiry(values));
      console.log(" 📧 response in Contact : ", response);
    } catch (error) {
      console.log(" 📧 error in Contact : ", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      comment: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      console.log("inside of the formik submit 🤩🤩");
      const toastId = showToastLoading("Submitting Enquiry, Please wait...");
      setLoadingEnquiryToastId(toastId);
      await handleEnquiry(values);

      console.log("values in Contact are : ", values);
      console.log("form is submited 🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚");
      formik.resetForm();
      dispatch(resetState());
    },
  });

  return (
    <>
      <Toast />

      <Meta title={"Contact Us"} />
      <BreadCrumb title="Contact Us" />
      <Container class1="contact-wrapper  py-5 home-wrapper-2">
        <div className="row">
          {/* 🌎🌍🌏 Map 🌎🌍🌏 */}
          <div className="col-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242117.7090705773!2d73.6981536539019!3d18.524870610167344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699117425229!5m2!1sen!2sin"
              width="600"
              height="450"
              className="border-0 w-100"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          {/* 🙋🏻‍♂️🙋🏻‍♀️🙋🏻‍♂️🙋🏻‍♀️🙋🏻‍♂️🙋🏻‍♀️🙋🏻‍♂️🙋🏻‍♀️ Bottom Pannel 🙋🏻‍♂️🙋🏻‍♀️🙋🏻‍♂️🙋🏻‍♀️🙋🏻‍♂️🙋🏻‍♀️🙋🏻‍♂️🙋🏻‍♀️ */}
          <div className="col-12 mt-5">
            <div className="contact-inner-wrapper d-flex justify-content-between ">
              {/* 📞 💁🏻 👋🏻 Contact 📞 💁🏻 👋🏻  */}
              <div>
                <h3 className="contact-title mb-4">Contact</h3>

                <form
                  action=""
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column gap-15"
                >
                  <div>
                    <CustomInput
                      type="text"
                      label="Name"
                      name="name"
                      className="form-control"
                      value={formik.values.name}
                      onChange={formik.handleChange("name")}
                      onBlur={formik.handleBlur("name")}
                    />
                    <div className="error">
                      {formik.touched.name && formik.errors.name}
                    </div>
                  </div>

                  <div>
                    <CustomInput
                      type="email"
                      label="Email"
                      name="email"
                      className="form-control"
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                    />
                    <div className="error">
                      {formik.touched.email && formik.errors.email}
                    </div>
                  </div>

                  <div>
                    <CustomInput
                      type="tel"
                      label="Mobile Number"
                      name="mobile"
                      className="form-control"
                      value={formik.values.mobile}
                      onChange={formik.handleChange("mobile")}
                      onBlur={formik.handleBlur("mobile")}
                    />
                    <div className="error">
                      {formik.touched.mobile && formik.errors.mobile}
                    </div>
                  </div>
                  <div>
                    <textarea
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      name="comment"
                      placeholder="Comments"
                      value={formik.values.comment}
                      onChange={formik.handleChange("comment")}
                      onBlur={formik.handleBlur("comment")}
                    ></textarea>
                    <div className="error">
                      {formik.touched.comment && formik.errors.comment}
                    </div>
                  </div>
                  <div>
                    <button className="button border-0" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              {/* 📞 💁🏻 👋🏻 Get In Touch With us 📞 💁🏻 👋🏻  */}
              <div>
                <h3 className="contact-title mb-4">Get in Touch with Us</h3>
                <div>
                  <ul className="ps-0">
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <FaHome className="fs-5" />
                      {/* adding the dummy address */}
                      <address className="address mb-0">
                        Hno:227 , Near ABC Chowk, Pune, Maharashtra, India
                      </address>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <IoCall className="fs-5" />
                      <a href="tel:+91 8530470684">+91 8530470684</a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <MdEmail className="fs-5" />
                      <a
                        className="email"
                        href="mailto:mhaskepavankumar@gmail.com"
                      >
                        mhaskepavankumar@gmail.com
                      </a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <FaInfo className="fs-5" />
                      <p className="mb-0"> Monday - Friday 10 AM - 8 PM</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
