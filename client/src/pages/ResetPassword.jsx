import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";

const ResetPassword = () => {
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
              <form action="" className="d-flex flex-column gap-15">
                {/* 📧📧📧 Email 📧📧📧 */}

                {/* 🔐🔐🔐 Password 🔐🔐🔐 */}
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="form-control "
                />

                {/* 🔐🔐🔐 Confirm Password 🔐🔐🔐 */}
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Confirm your password"
                  className="form-control "
                />
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
