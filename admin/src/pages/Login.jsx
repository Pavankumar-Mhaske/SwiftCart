import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useState } from "react";
import Container from "../components/Container";
import { IoMdArrowRoundBack } from "react-icons/io";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: yup.string().required("Mobile Number is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adminValidation, setAdminValidation] = useState(false);

  const handleLoginAdmin = async (values) => {
    try {
      const response = await dispatch(login(values));
      console.log(" 📧 response in Login : ", response);
    } catch (error) {
      console.log(" 📧 error in Login : ", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const message =
        "Please review your information before submitting:\n \n" +
        JSON.stringify(values, null, 2);
      alert(message);
      console.log("inside of the formik submit 🤩🤩");
      // alert(JSON.stringify(values, null, 2));
      await handleLoginAdmin(values);
      console.log("values : ", values);
      console.log("form is submited 🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚");
      formik.resetForm();
    },
  });

  const authState = useSelector((state) => state);
  console.log("authState in Login is : 🌹🌹", authState.auth);
  const { user, isLoading, isError, isSuccess, message } = authState.auth;
  useEffect(() => {
    if (user !== null && isSuccess) {
      navigate("/admin");
      window.location.reload();
    } else if (isError && !isSuccess) {
      setAdminValidation(true);
    } else {
      navigate("");
    }
  }, [user, isLoading, isError, isSuccess, message]);
  const goBack = () => {
    navigate(-1);
  };
  return (
    // <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
    //   <br />
    //   <br />
    //   <br />
    //   <br />
    //   <br />
    //   <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
    //     <h3 className="text-center  title">Login</h3>

    //     {adminValidation ? (
    //       <p
    //         className="text-center"
    //         style={{
    //           color: "red",
    //         }}
    //       >
    //         Make sure you are Admin to login !
    //       </p>
    //     ) : (
    //       <p className="text-center">Login to your account to continue</p>
    //     )}
    //     <div className="error text-center">
    //       {message.message == "Rejected" ? "You are not an Admin" : ""}
    //     </div>

    //     <form action="" onSubmit={formik.handleSubmit}>
    //       <CustomInput
    //         type="text"
    //         name="email"
    //         label="Email Address"
    //         id="email"
    //         value={formik.values.email}
    //         onChange={formik.handleChange("email")}
    //       />
    //       <div className="error">
    //         {formik.touched.email && formik.errors.email ? (
    //           <div>{formik.errors.email}</div>
    //         ) : null}
    //       </div>
    //       <CustomInput
    //         type="password"
    //         name="password"
    //         label="Password"
    //         id="password"
    //         onChange={formik.handleChange("password")}
    //         value={formik.values.password}
    //       />
    //       <div className="error">
    //         {formik.touched.password && formik.errors.password ? (
    //           <div>{formik.errors.password}</div>
    //         ) : null}
    //       </div>
    //       {/* Forgot Password? */}
    //       {/* <div className="mb-3 text-end">
    //         <Link to="forgot-password" className="text-decoration-none">
    //           {" "}
    //           Forgot Password?
    //         </Link>
    //       </div> */}
    //       <button
    //         // to="/admin"
    //         className="border-0 px-3 py-2 mt-3 text-white fw-bold w-100 text-center text-decoration-none fs-5"
    //         style={{ background: "#ffd333" }}
    //         type="submit"
    //       >
    //         Login
    //       </button>
    //     </form>
    //   </div>
    // </div>

    <>
      {/* <Toast /> */}

      <Meta title={"Admin Login"} />
      <BreadCrumb title="Admin-Login" />
      {/* 📃📃📄📄 Login 📃📃📄📄 */}
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="title text-center mb-3">Admin Login</h3>

              {/* Validation */}
              {adminValidation ? (
                <p
                  className="text-center"
                  style={{
                    color: "red",
                  }}
                >
                  Make sure you are Admin to login !
                </p>
              ) : (
                <p className="text-center">Login to your account to continue</p>
              )}
              {/* <div className="error text-center">
                {message.message == "Rejected" ? "You are not an Admin" : ""}
              </div> */}
              {/* 📜📜📜 Form 📜📜📜 */}
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
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

                {/* 🔐🔐🔐 Password 🔐🔐🔐 */}

                {/* 🔗🔗🔗 Links 🔗🔗🔗 */}
                <div className="form-group">
                  {/* <Link to="/forgot-password">Forgot your Password?</Link> */}
                  <div className=" mt-3 d-flex justify-content-center align-items-center gap-15 ">
                    <button type="submit" className="button border-0">
                      Login
                    </button>
                    {/* <Link to="/signup" className="button signup">
                      SignUp
                    </Link> */}
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

export default Login;
