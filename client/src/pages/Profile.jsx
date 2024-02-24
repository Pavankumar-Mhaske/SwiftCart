import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../features/user/userSlice";
import CustomInput from "../components/CustomInput";

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
  const userState = useSelector((state) => state.user);
  const { user, updatedUser, isSuccess, isError } = userState;
  console.log("user in Profile is  : ", user);
  console.log("updatedUser in Profile is 🍔🍔 : ", updatedUser);

  useEffect(() => {
    if (isSuccess && updatedUser && Object.keys(updatedUser).length > 0) {
      alert("User Profile Updated Successfully!");
      localStorage.setItem("user", JSON.stringify(updatedUser));
      console.log("updatedUser in login auth is : ", updatedUser);
      // showToastSuccess("User Profile Updated Successfully!");
    } else if (isError) {
      alert("Something went wrong");
    }
  }, [updatedUser]);

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

      const message =
        "Please review your information before submitting:\n \n" +
        JSON.stringify(values, null, 2);
      alert(message);
      dispatch(updateUserProfile(values));
    },
  });

  return (
    <>
      <Meta title={"Profile"} />
      <BreadCrumb title="Profile" />

      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h3>Update Profile</h3>
            </div>
          </div>

          <div className="col-12">
            <div className="auth-card">
              {/* 📜📜📜 Title 📜📜📜 */}
              <h3 className="title text-center mb-3">Update Profile</h3>
              {/* 📜📜📜 Form 📜📜📜 */}
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                {/* Firstname */}
                <div className="">
                  <CustomInput
                    className="form-control"
                    id="firstname"
                    type="text"
                    name="firstname"
                    label="First Name"
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
                <div className="">
                  <CustomInput
                    className="form-control"
                    id="lastname"
                    type="text"
                    name="lastname"
                    label="Last Name"
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
                <div className="">
                  <CustomInput
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    type="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  />

                  <div className="error">
                    {formik.touched.email && formik.errors.email ? (
                      <div className="error">{formik.errors.email}</div>
                    ) : null}
                  </div>
                  <div id="emailHelp" className="form-text mt-2">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                {/* Mobile */}
                <div className="">
                  <CustomInput
                    className="form-control"
                    id="mobile"
                    type="tel"
                    name="mobile"
                    label="Mobile"
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
                <div className="">
                  <CustomInput
                    className="form-control"
                    id="password"
                    type="password"
                    name="password"
                    label="Password"
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
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
