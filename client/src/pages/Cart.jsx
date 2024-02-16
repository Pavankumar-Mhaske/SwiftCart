import React, { useEffect } from "react";
import Meta from "../components/Meta";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import watch from "../../public/images/watch.jpg";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaCircleXmark } from "react-icons/fa6";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { getUserCart } from "../features/user/userSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const userCartState = useSelector((state) => state.user);
  const { isSuccess, isLoading, isError, userCart } = userCartState;

  const subTotal = userCart?.discountedCartPrice
    ? userCart?.discountedCartPrice
    : 0;
  const { items } = userCart;
  console.log("userCart in Cart is 🛒 : ", userCart);
  console.log("items in Cart is 🍎🍎🍎 : ", items);
  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />

      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            {/* 🎈🎈🎈 Cart Headings 🎈🎈🎈 */}
            <div className="cart-header cart-border-bottom py-3 d-flex justify-content-between align-items-center ">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
              <h4 className="cart-col-5">Discounted Price</h4>
            </div>
            {/* 🎃🎃🎃 Cart Data 🎃🎃🎃 */}
            {userCart &&
              items &&
              items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="cart-data cart-border-bottom py-3 d-flex justify-content-between align-items-center "
                  >
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
                        <h5 className="title">{item?.productId?.name} </h5>
                        <div className="d-flex gap-10 align-items-center my-2 ">
                          <h3 className="product-heading">Size :</h3>
                          <p className="product-data">M</p>
                        </div>
                        <div className="d-flex gap-10 align-items-center my-2 ">
                          <h3 className="product-heading">Color :</h3>
                          <ul className="product-data colors ps-0">
                            {item?.productId?.colors &&
                              item?.productId?.colors?.map((color, index) => {
                                return (
                                  <li
                                    key={index}
                                    style={{
                                      backgroundColor: color?.name,
                                      cursor: "pointer",
                                    }}
                                    onClick={() => setColor(color?._id)}
                                  ></li>
                                );
                              })}
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* price */}
                    <div className="cart-col-2">
                      <p className="price">${item?.productId?.price}.00</p>
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
                          value={item?.quantity}
                        />
                        {/* defaultValue={1} // Set the default value to 1 */}
                      </div>
                      <div className="">
                        <RiDeleteBin6Fill className="delete-img fs-3 me-2" />
                      </div>
                    </div>
                    {/* Total */}
                    <div className="cart-col-4">
                      <p className="price">${userCart?.totalCartPrice}.00</p>
                    </div>
                    {/* Final Price */}
                    <div className="cart-col-5 d-flex flex-column align-items-center justify-content-center">
                      {userCart?.coupon === null ? (
                        <h6 className="red d-flex flex-column align-items-center justify-content-center">
                          <FaCircleXmark style={{ fontSize: "1.6em" }} />
                          <p className="mt-1">Coppon not applied</p>
                        </h6>
                      ) : (
                        <h6 className="green">
                          <IoMdCheckmarkCircle style={{ fontSize: "2em" }} />
                          <p className="mt-1">Coppon applied</p>
                        </h6>
                      )}
                      <p className="price">
                        ${userCart?.discountedCartPrice}.00
                      </p>
                    </div>
                  </div>
                );
              })}

            {/* 🎃🎃🎃 Cart Data 🎃🎃🎃 */}

            {/* 🔽⏬⏬⏬ bottom section ⏬⏬⏬🔽  */}
            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-between align-items-baseline">
                <Link to="/product" className="button">
                  Continue to Shopping
                </Link>
                <div className="d-flex flex-column justify-content-end align-items-end">
                  <div className="d-flex gap-10  align-items-center my-2 ">
                    <h4 className="cart-product-heading">SubTotal :</h4>
                    <h4 className="cart-product-data">${subTotal}.00</h4>
                  </div>
                  <p>Taxes and Shipping calculated at chackout</p>
                  <Link to="/checkouts" className="button">
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
