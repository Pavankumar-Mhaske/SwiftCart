import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";

const Login = () => {

  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />
      {/* 📃📃📄📄 Login 📃📃📄📄 */}
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="title text-center mb-3">Login</h3>
              {/* 📜📜📜 Form 📜📜📜 */}
              <form action="" className="d-flex flex-column gap-15">
                {/* 📧📧📧 Email 📧📧📧 */}
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="form-control"
                />

                {/* 🔐🔐🔐 Password 🔐🔐🔐 */}
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="form-control "
                />

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
