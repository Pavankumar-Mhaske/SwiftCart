import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import watch from "../../public/images/watch.jpg";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
const Cart = () => {
  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />

      <section className="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              {/* 🎈🎈🎈 Cart Headings 🎈🎈🎈 */}
              <div className="cart-header cart-border-bottom py-3 d-flex justify-content-between align-items-center ">
                <h4 className="cart-col-1">Product</h4>
                <h4 className="cart-col-2">Price</h4>
                <h4 className="cart-col-3">Quantity</h4>
                <h4 className="cart-col-4">Total</h4>
              </div>
              {/* 🎃🎃🎃 Cart Data 🎃🎃🎃 */}
              <div className="cart-data cart-border-bottom py-3 d-flex justify-content-between align-items-center ">
                {/* Image, size, color */}
                <div className="cart-col-1 gap-10 d-flex align-items-center">
                  {/* img */}
                  <div className="w-25">
                    <img
                      src={watch}
                      className="img-fluid"
                      alt="Product Image"
                    />
                  </div>
                  {/* size, color */}
                  <div className="w-75 p-3">
                    <h5 className="title">
                      Kids headphones Bulk 10 Pack Multi Colored For Students{" "}
                    </h5>
                    <div className="d-flex gap-10 align-items-center my-2 ">
                      <h3 className="product-heading">Size :</h3>
                      <p className="product-data">M</p>
                    </div>
                    <div className="d-flex gap-10 align-items-center my-2 ">
                      <h3 className="product-heading">Color :</h3>
                      <p className="product-data">Grey</p>
                    </div>
                  </div>
                </div>
                {/* price */}
                <div className="cart-col-2">
                  <p className="price">$100.00</p>
                </div>
                {/* Quantity */}
                <div className="cart-col-3 d-flex align-items-center gap-15">
                  <div>
                    <input
                      className="form-control"
                      type="number"
                      name="quantity"
                      min={1}
                      max={10}
                      defaultValue={0} // Set the default value to 1
                      style={{ width: "70px", height: "50px" }}
                      id=""
                    />
                    {/* defaultValue={1} // Set the default value to 1 */}
                  </div>
                  <div className="">
                    <RiDeleteBin6Fill className="delete-img fs-3 me-2" />
                  </div>
                </div>
                {/* Total */}
                <div className="cart-col-4">
                  <p className="price">$100.00</p>
                </div>
              </div>
              {/* 🎃🎃🎃 Cart Data 🎃🎃🎃 */}
              <div className="cart-data cart-border-bottom py-3 d-flex justify-content-between align-items-center ">
                {/* Image, size, color */}
                <div className="cart-col-1 gap-10 d-flex align-items-center">
                  {/* img */}
                  <div className="w-25">
                    <img
                      src={watch}
                      className="img-fluid"
                      alt="Product Image"
                    />
                  </div>
                  {/* size, color */}
                  <div className="w-75 p-3">
                    <h5 className="title">
                      Kids headphones Bulk 10 Pack Multi Colored For Students{" "}
                    </h5>
                    <div className="d-flex gap-10 align-items-center my-2 ">
                      <h3 className="product-heading">Size :</h3>
                      <p className="product-data">M</p>
                    </div>
                    <div className="d-flex gap-10 align-items-center my-2 ">
                      <h3 className="product-heading">Color :</h3>
                      <p className="product-data">Grey</p>
                    </div>
                  </div>
                </div>
                {/* price */}
                <div className="cart-col-2">
                  <p className="price">$100.00</p>
                </div>
                {/* Quantity */}
                <div className="cart-col-3 d-flex align-items-center gap-15">
                  <div>
                    <input
                      className="form-control"
                      type="number"
                      name="quantity"
                      min={1}
                      max={10}
                      defaultValue={0} // Set the default value to 1
                      style={{ width: "70px", height: "50px" }}
                      id=""
                    />
                    {/* defaultValue={1} // Set the default value to 1 */}
                  </div>
                  <div className="">
                    <RiDeleteBin6Fill className="delete-img fs-3 me-2" />
                  </div>
                </div>
                {/* Total */}
                <div className="cart-col-4">
                  <p className="price">$100.00</p>
                </div>
              </div>
              <div className="col-12 py-2 mt-4">
                <div className="d-flex justify-content-between align-items-baseline">
                  <Link to="/product" className="button">
                    Continue to Shopping
                  </Link>
                  <div className="d-flex flex-column justify-content-end align-items-end">
                    <div className="d-flex gap-10  align-items-center my-2 ">
                      <h4 className="cart-product-heading">SubTotal :</h4>
                      <h4 className="cart-product-data">$4000</h4>
                    </div>
                    <p>Taxes and Shipping calculated at chackout</p>
                    <Link to="/checkout" className="button">
                      Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
