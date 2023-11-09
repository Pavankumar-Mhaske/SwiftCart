import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";

const ForgotPassword = () => {
  return (
    <>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title="Forgot Password" />

      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="title text-center mb-3">Reset your Password</h3>
              <p className="text-center my-2 mb-3">
                We will send you an email to reset your password
              </p>
              {/* 📜📜📜 Reset Password Form 📜📜📜 */}
              <form action="" className="d-flex flex-column gap-15">
                {/* 📧📧📧 Email 📧📧📧 */}
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="form-control"
                />

                {/* 📝📝📝 Forgot Password 📝📝📝 */}
                <div className="form-group">
                  <div className=" mt-3 d-flex flex-column justify-content-center align-items-center gap-15 ">
                    <button type="submit" className="button border-0">
                      Submit
                    </button>
                    <Link to="/login" className="button cancel mt-1">
                      Cancel
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

export default ForgotPassword;
