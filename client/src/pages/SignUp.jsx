import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";

let schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: yup.string().required("Mobile Number is required"),
  password: yup.string().required("Password is required"),
});

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Meta title={"SignUp"} />
      <BreadCrumb title="SignUp" />
      {/* 📃📃📄📄 Login 📃📃📄📄 */}
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
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
                  name="firstName"
                  label="First Name"
                  id="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">
                  {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="error">{formik.errors.firstName}</div>
                  ) : null }

                </div>

                {/* 📧📧📧 Last Name 📧📧📧 */}
                <CustomInput
                  type="text"
                  name="name"
                  placeholder="Enter your Last Name"
                  className="form-control"
                />

                {/* 📧📧📧 Email 📧📧📧 */}
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="form-control"
                />

                {/* 📞📞📞 Mobile 📞📞📞 */}
                <CustomInput
                  type="tel"
                  name="mobile"
                  placeholder="Enter your Mobile Number"
                  className="form-control "
                />

                {/* 🔐🔐🔐 Password 🔐🔐🔐 */}
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="form-control "
                />

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
