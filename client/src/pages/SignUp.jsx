import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import Container from "../components/Container";

const SignUp = () => {
  return (
    <>
      <Meta title={"SignUp"} />
      <BreadCrumb title="SignUp" />
      {/* 📃📃📄📄 Login 📃📃📄📄 */}
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="title text-center mb-3">Sign Up</h3>
              {/* 📜📜📜 Form 📜📜📜 */}
              <form action="" className="d-flex flex-column gap-15">
                {/* 📧📧📧 Name 📧📧📧 */}
                <div className="form-group">
                  {/* <label htmlFor="email">Email</label> */}
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your Name"
                    className="form-control"
                  />
                </div>

                {/* 📧📧📧 Email 📧📧📧 */}
                <div className="form-group">
                  {/* <label htmlFor="email">Email</label> */}
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="form-control"
                  />
                </div>

                {/* 📞📞📞 Mobile 📞📞📞 */}
                <div className="form-group mt-1 ">
                  {/* <label htmlFor="password">Password</label> */}
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Enter your Mobile Number"
                    className="form-control "
                  />
                </div>

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

                {/* 🔘🔘🔘 Buttons 🔘🔘🔘 */}
                <div className="form-group">
                  <div className=" mt-3 d-flex justify-content-center align-items-center gap-15 ">
                    <button type="submit" className="button border-0">
                      Sign Up
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

export default SignUp;
