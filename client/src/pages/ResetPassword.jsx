import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

let schema = yup.object().shape({
  password: yup.string().required("Password is required"),
  confirmPassword: yup.string().required("Confirm Password is required"),
});

const ResetPassword = () => {
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
      alert(JSON.stringify(values, null, 2));
    },
  });

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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div className="error">{formik.errors.confirmPassword}</div>
                  ) : null}
                </div>
                {/* 🔗🔗🔗 Links 🔗🔗🔗 */}
                <div className="form-group">
                  <div className=" mt-3 d-flex justify-content-center align-items-center gap-15 ">
                    <button type="submit" className="button border-0">
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
