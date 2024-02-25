import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { resetForgottenPassword } from "../features/user/userSlice";

let schema = yup.object().shape({
  password: yup.string().required("Password is required"),
  confirmPassword: yup.string().required("Confirm Password is required"),
});

const ResetPassword = () => {
  const location = useLocation();
  const resetToken = location.pathname.split("/")[2];
  // console.log("resetToken in reset-password is : ", resetToken);
  const [passwordMatched, setPasswordMatched] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      const data = {
        newPassword: values.confirmPassword,
        resetToken: resetToken,
      };

      const password = {
        newPassword: values.confirmPassword,
      };

      const message =
        "Please review your information before submitting:\n \n" +
        JSON.stringify(password, null, 2);

      alert(message);
      console.log("data in ResetPassword is 🍔🍔 : ", data);
      resetForgottenPassword(data);
      alert("Password reset successfully");
      navigate("/login");
    },
  });

  // console.log("formik 🍌🍌🍌🍌", formik.values.password);

  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />
      {/* 📃📃📄📄 Login 📃📃📄📄 */}
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="title text-center mb-3">Reset Password</h3>
              {/* 📜📜📜 Form 📜📜📜 */}
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                {/* 📧📧📧 Email 📧📧📧 */}

                {/* 🔐🔐🔐 Password 🔐🔐🔐 */}
                <CustomInput
                  id="password"
                  type="password"
                  name="password"
                  label="Enter your password"
                  value={formik.values.password}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setPasswordMatched(
                      e.target.value === formik.values.confirmPassword
                    );
                  }}
                  onBlur={formik.handleBlur("password")}
                />

                <div className="error">
                  {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                  ) : null}
                </div>

                {/* 🔐🔐🔐 Confirm Password 🔐🔐🔐 */}
                <CustomInput
                  id="password"
                  type="password"
                  name="confirmPassword"
                  label="Confirm your password"
                  value={formik.values.confirmPassword}
                  // onChange={formik.handleChange("confirmPassword")}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setPasswordMatched(
                      e.target.value === formik.values.password
                    );
                  }}
                  onBlur={formik.handleBlur("confirmPassword")}
                />
                <div className="error">
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div className="error">{formik.errors.confirmPassword}</div>
                  ) : null}
                </div>

                {/* ✔️✔️  Password matched  ✔️✔️ */}
                {passwordMatched ? (
                  <div
                    className="pawword-matched text-center transition-effect"
                    style={{ width: "100%", height: "20px", opacity: 1 }}
                  >
                    <p className="green-text">
                      Password Matched
                      <span>&#x2714;</span>{" "}
                    </p>
                  </div>
                ) : (
                  <div
                    className="empty-component transition-effect"
                    style={{ width: "100%", height: "20px", opacity: 0 }}
                  ></div>
                )}

                {/* 🔗🔗🔗 Links 🔗🔗🔗 */}
                <div className="form-group">
                  <div className=" mt-3 d-flex justify-content-center align-items-center gap-15 ">
                    <button
                      type="submit"
                      className={` border-0
                      ${passwordMatched ? "button" : "button-inActive "}
                      `}
                      disabled={!passwordMatched}
                    >
                      Submit
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

export default ResetPassword;
