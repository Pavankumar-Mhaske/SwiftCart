import React from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";

const Checkout = () => {
  return (
    <>
      <div className="checkout-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-7">
              <div className="checkout-left-data">
                <h3 className="website-name">Dev Corner</h3>
                <nav
                  style={{ "--bs-breadcrumb-divider": ">" }}
                  aria-label="breadcrumb"
                >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item active">
                      <Link className="cart-link" to="/cart">
                        Cart
                      </Link>
                    </li>
                    <div className="mx-2 d-flex justify-content-center align-items-center">
                      <IoIosArrowForward />
                    </div>
                    <li
                      className="breadcrumb-item text-dark "
                      aria-current="page"
                    >
                      {/* <li className="breadcrumb-item active" aria-current="page"> */}
                      Information
                    </li>
                    <div className="mx-2 d-flex justify-content-center align-items-center">
                      <IoIosArrowForward />
                    </div>
                    <li className="breadcrumb-item active">Shipping</li>
                    <div className="mx-2 d-flex justify-content-center align-items-center">
                      <IoIosArrowForward />
                    </div>
                    <li className="breadcrumb-item active" aria-current="page">
                      Payment
                    </li>
                  </ol>
                </nav>
                <h4 className="title">Contact Information</h4>
                <p className="user-details">
                  Pavankumar Mhaske (mhaskepavankumar@gmail.com)
                </p>
                {/* 📃📃📃📃 Info. Form  📃📃📃📃 */}
                <form
                  action=""
                  className="d-flex gap-15 flex-wrap justify-content-between"
                >
                  {/* Country  */}
                  <div className="w-100">
                    <select name="" id="" className="form-control form-select">
                      <option value="" selected disabled>
                        {" "}
                        Select Country
                      </option>
                    </select>
                  </div>
                  {/* First Name */}
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="form-control"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="form-control"
                    />
                  </div>
                  {/* Address */}
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Address"
                      className="form-control"
                    />
                  </div>
                  {/* Apartment */}
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Apartment, Suite, etc, (optional)"
                      className="form-control"
                    />
                  </div>
                  {/* City */}
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="City"
                      className="form-control"
                    />
                  </div>
                  {/* State */}
                  <div className="flex-grow-1">
                    <select name="" id="" className="form-control form-select">
                      <option value="" selected disabled>
                        Select State
                      </option>
                    </select>
                  </div>
                  {/* Zip Code */}
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Zip Code"
                      className="form-control"
                    />
                  </div>
                  {/* Return to Cart / Continue To Shipping */}
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="/cart" className="text-dark">
                        <BiArrowBack className="fs-5 me-2" /> Return to Cart
                      </Link>
                      <Link to="/shipping" className="button">
                        Continue To Shipping
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-5"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
