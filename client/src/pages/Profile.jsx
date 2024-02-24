import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";

const Profile = () => {
  return (
    <>
      <Meta title={"Profile"} />
      <BreadCrumb title="Profile" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="col-12">
          <form>
            {/* Firstname */}
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">
                Firstname
              </label>
              <input type="text" className="form-control" id="firstname" />
            </div>
            {/* Lastname */}
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">
                Lastname
              </label>
              <input type="text" className="form-control" id="lastname" />
            </div>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            {/* Mobile */}
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">
                Mobile
              </label>
              <input type="text" className="form-control" id="mobile" />
            </div>
            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input type="password" className="form-control" id="password" />
            </div>

            {/* Save button */}
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Profile;
