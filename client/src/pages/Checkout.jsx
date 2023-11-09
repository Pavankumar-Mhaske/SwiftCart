import React from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import watch from "../../public/images/watch.jpg";
import Container from "../components/Container";
const Checkout = () => {
  return (
    <>
      <Container class1="checkout-wrapper home-wrapper-2">
        <div className="row">
          {/* ⛪⛪⛪ Customer Information ⛪⛪⛪ */}
          <div className="col-7 py-5">
            <div className="checkout-left-data">
              <h3 className="website-name">Dev Corner</h3>
              {/* Progress Breadcrumb */}
              <div className="my-4">
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
              </div>
              {/* Contact Information */}
              <div className="">
                <h4 className="title">Contact Information</h4>
                <div className="d-flex justify-content-between">
                  <p className="user-details">
                    Pavankumar Mhaske (mhaskepavankumar@gmail.com)
                  </p>
                  <p className="user-details">Mobile 8530470684 </p>
                </div>
              </div>

              {/* Email me with news and offers */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label" for="flexCheckDefault">
                    Email me with news and offers
                  </label>
                </div>
              </div>

              {/* Shipping Address */}
              <h4 className="mb-2 address-title">Shipping address</h4>
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
                <div className="w-100  my-4">
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
          {/* 💰🛒🛒🛒 Order Information 🛒🛒🛒💰 */}
          <div className="col-5 order-info py-5">
            {/* Cart Section */}
            <div className="border-bottom py-4">
              <div className="d-flex gap-10 mb-2 justify-content-between align-items-center">
                <div className="w-75 d-flex gap-10">
                  <div className="w-25 position-relative">
                    <span
                      style={{ top: "-10px", right: "-5px" }}
                      className="badge bg-secondary text-white rounded-circle position-absolute"
                    >
                      1
                    </span>
                    <img className="img-fluid" src={watch} alt="Products" />
                  </div>
                  <div className="w-75  d-flex flex-column justify-content-evenly position-relative ">
                    <h5 className="cart-title">
                      Honor T1 7.0 1GB RAM 8GB ROM 7 inch with Wi-Fi+3G Tablet
                    </h5>
                    <p className="cart-sub-title">S / #B5CEDE</p>
                  </div>
                </div>
                <div className="w-25 flex-grow-1 d-flex justify-content-end ">
                  <div className="">
                    <p className="final-products-price">$ 410.00</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Pricing Section */}
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="subtotal">SubTotal</p>
                <p className="shipping-total">$ 410.00</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 shipping">Shipping</p>
                <p className="mb-0 shipping-price">$ 19.00</p>
              </div>
            </div>
            <div className="border-bottom py-4 d-flex justify-content-between align-items-center">
              <h4 className="total">Total</h4>
              <h5 className="total-price">
                <span>USD</span> $ 429.00
              </h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
