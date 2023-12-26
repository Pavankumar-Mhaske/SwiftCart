import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const displatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      displatch(login(values));
    },
  });

  const authState = useSelector((state) => state);

  const { user, isLoading, isError, isSuccess, message } = authState.auth;
  useEffect(() => {
    if (isSuccess) {
      navigate("/admin");
    } else {
      navigate("");
    }
  }, [user, isLoading, isError, isSuccess, message]);

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center  title">Login</h3>
        <p className="text-center">Login to your account to continue</p>
        <div className="error text-center">
          {message.message == "Rejected" ? "You are not an Admin" : ""}
        </div>

        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="email"
            label="Email Address"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <CustomInput
            type="password"
            name="password"
            label="Password"
            id="password"
            onChange={formik.handleChange("password")}
            value={formik.values.password}
          />
          <div className="error">
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="mb-3 text-end">
            <Link to="forgot-password" className="text-decoration-none">
              {" "}
              Forgot Password?
            </Link>
          </div>
          <button
            // to="/admin"
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
