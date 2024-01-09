import React, { useState, useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { register, resetState } from "../features/auth/AuthSlice";
import {
  showToastLoading,
  showToastSuccess,
  showToastError,
  Toast,
} from "../utils/HotToastHandler";

let schema = yup.object().shape({
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: yup.string().required("Mobile Number is required"),
  password: yup.string().required("Password is required"),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const [loadingRegisterToastId, setLoadingRegisterToastId] = useState(null);

  const newAuth = useSelector((state) => state.auth);
  const { isSuccess, isError, user } = newAuth;
  console.log(" 📧 user in SignUp : ", user);

  useEffect(() => {
    console.log("inside of the useEffect for success or error message 💥💥");
    if (isSuccess && user && Object.keys(user).length > 0) {
      showToastSuccess("User Registered Successfully!", loadingRegisterToastId);
    } else if (isError) {
      showToastError("Something went wrong");
    }
  }, [user]);

  const handleRegisterUser = async (values) => {
    try {
      const response = await dispatch(register(values));
      console.log(" 📧 response in SignUp : ", response);
    } catch (error) {
      console.log(" 📧 error in SignUp : ", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      mobile: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      console.log("inside of the formik submit 🤩🤩");
      const toastId = showToastLoading("Registering User...");
      setLoadingRegisterToastId(toastId);
      await handleRegisterUser(values);

      console.log("values : ", values);
      // alert(JSON.stringify(values, null, 2));
      console.log("form is submited 🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚");
      formik.resetForm();
      dispatch(resetState());
    },
  });

  return (
    <>
      <Toast />

      <Meta title={"SignUp"} />
      <BreadCrumb title="SignUp" />
      {/* 📃📃📄📄 Login 📃📃📄📄 */}

      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              {/* 📜📜📜 Title 📜📜📜 */}
              <h3 className="title text-center mb-3">Sign Up</h3>
              {/* 📜📜📜 Form 📜📜📜 */}
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                {/* 📧📧📧 First Name 📧📧📧 */}
                <CustomInput
                  type="text"
                  name="firstname"
                  label="First Name"
                  id="firstname"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname ? (
                    <div className="error">{formik.errors.firstname}</div>
                  ) : null}
                </div>
                {/* 📧📧📧 Last Name 📧📧📧 */}
                <CustomInput
                  type="text"
                  name="lastname"
                  label="Last Name"
                  id="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">
                  {formik.touched.lastname && formik.errors.lastname ? (
                    <div className="error">{formik.errors.lastname}</div>
                  ) : null}
                </div>

                {/* 📧📧📧 Email 📧📧📧 */}
                <CustomInput
                  type="email"
                  name="email"
                  label="Email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                  ) : null}
                </div>
                {/* 📞📞📞 Mobile 📞📞📞 */}
                <CustomInput
                  type="tel"
                  name="mobile"
                  label="Mobile"
                  id="mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile ? (
                    <div className="error">{formik.errors.mobile}</div>
                  ) : null}
                </div>
                {/* 🔐🔐🔐 Password 🔐🔐🔐 */}
                <CustomInput
                  type="password"
                  name="password"
                  label="Password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                  ) : null}
                </div>
                {/* 🔘🔘🔘 Buttons 🔘🔘🔘 */}
                <div className="form-group">
                  <div className=" mt-3 d-flex justify-content-center align-items-center gap-15 ">
                    <button type="submit" className="button border-0">
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SignUp;
