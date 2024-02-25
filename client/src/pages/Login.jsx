import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login, resetState } from "../features/auth/authSlice";
import {
  showToastLoading,
  showToastSuccess,
  showToastError,
  Toast,
} from "../utils/HotToastHandler";

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

  const [loadingLoginToastId, setLoadingLoginToastId] = useState(null);

  const authState = useSelector((state) => state.auth);
  const { user, isSuccess, isError } = authState;
  console.log(" 📧 user in Login is : ", user);

  useEffect(() => {
    // console.log("inside of the useEffect for success or error message 💥💥");
    if (isSuccess && user && Object.keys(user).length > 0) {
      showToastSuccess("User Loged In Successfully!", loadingLoginToastId);
      navigate("/");
    } else if (isError) {
      showToastError("Something went wrong");
    }
  }, [user]);

  const handleLoginUser = async (values) => {
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
      alert(JSON.stringify(values, null, 2));
      console.log("inside of the formik submit 🤩🤩");
      const toastId = showToastLoading("Login User...");
      setLoadingLoginToastId(toastId);
      await handleLoginUser(values);

      console.log("values : ", values);
      console.log("form is submited 🚚🚚🚚🚚🚚🚚🚚🚚🚚🚚");
      formik.resetForm();
      // dispatch(resetState());
      // setTimeout(() => {
      //   navigate("/admin/brand-list");
      // }, 500);
    },
  });

  return (
    <>
      <Toast />

      <Meta title={"Login"} />
      <BreadCrumb title="Login" />
      {/* 📃📃📄📄 Login 📃📃📄📄 */}
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="title text-center mb-3">Login</h3>
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
                  <Link to="/forgot-password">Forgot your Password?</Link>
                  <div className=" mt-3 d-flex justify-content-center align-items-center gap-15 ">
                    <button type="submit" className="button border-0">
                      Login
                    </button>
                    <Link to="/signup" className="button signup">
                      SignUp
                    </Link>
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
