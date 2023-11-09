import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import Container from "../components/Container";

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
                  <div className="form-group mt-1 ">
                    {/* <label htmlFor="password">Password</label> */}
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className="form-control "
                    />
                  </div>

                  {/* 🔐🔐🔐 Confirm Password 🔐🔐🔐 */}
                  <div className="form-group mt-1 ">
                    {/* <label htmlFor="password">Password</label> */}
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      className="form-control "
                    />
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
