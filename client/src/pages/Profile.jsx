import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

let schema = yup.object().shape({
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: yup
    .string()
    .required("Mobile Number is required")
    .min(10, "Mobile number must be of 10 digits")
    .max(10, "Mobile number must be of 10 digits"),
  password: yup.string().required("Password is required"),
});

const Profile = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.auth);
  const { user } = userState;
  console.log("user in Profile is 🍔🍔 : ", user);

  const initialValues = {
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    password: "",
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log("values in Profile is 🍔🍔 : ", values);
    },
  });

  return (
    <>
      <Meta title={"Profile"} />
      <BreadCrumb title="Profile" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="col-12">
          <form onSubmit={formik.handleSubmit}>
            {/* Firstname */}
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">
                Firstname
              </label>
              <input
                className="form-control"
                id="firstname"
                type="text"
                name="firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange("firstname")}
                onBlur={formik.handleBlur("firstname")}
              />
              <div className="error">
                {formik.touched.firstname && formik.errors.firstname ? (
                  <div className="error">{formik.errors.firstname}</div>
                ) : null}
              </div>
            </div>
            {/* Lastname */}
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">
                Lastname
              </label>
              <input
                className="form-control"
                id="lastname"
                type="text"
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange("lastname")}
                onBlur={formik.handleBlur("lastname")}
              />
              <div className="error">
                {formik.touched.lastname && formik.errors.lastname ? (
                  <div className="error">{formik.errors.lastname}</div>
                ) : null}
              </div>
            </div>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
              />

              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
              <div className="error">
                {formik.touched.email && formik.errors.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : null}
              </div>
            </div>
            {/* Mobile */}
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">
                Mobile
              </label>
              <input
                className="form-control"
                id="mobile"
                type="tel"
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange("mobile")}
                onBlur={formik.handleBlur("mobile")}
              />
              <div className="error">
                {formik.touched.mobile && formik.errors.mobile ? (
                  <div className="error">{formik.errors.mobile}</div>
                ) : null}
              </div>
            </div>
            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                className="form-control"
                id="password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
              />
              <div className="error">
                {formik.touched.password && formik.errors.password ? (
                  <div className="error">{formik.errors.password}</div>
                ) : null}
              </div>
            </div>

            {/* Save button */}
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Profile;
