import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import watch from "../../public/images/watch.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import { base_url } from "../utils/base_url";
import { config } from "../utils/AxiosConfig";
import axios from "axios";
import { createAddress, getUserCart } from "../features/user/userSlice";

const schema = yup.object().shape({
  country: yup.string().required("Country is required"),
  addressLine1: yup.string().required("Address line 1 is required"),
  addressLine2: yup.string().required("Address line 2 is required"),
  addressLine3: yup.string(),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  pincode: yup.string().required("Zip code is required"),
  deliveryinfo: yup.string(),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const [addressId, setAddressId] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const ShippingFee = 5;
  const userState = useSelector((state) => state.user);
  const { isSuccess, isLoading, isError, userCart, cart, addresses } =
    userState;
  // console.log("addresses in checkout is : 🍎🍎 ", addresses);
  // const addressId = addresses[addresses.length - 1]?._id;
  // console.log("addressId in checkout is :Ⓜ️Ⓜ️ ", addressId);
  const subTotal = userCart?.discountedCartPrice
    ? userCart?.discountedCartPrice
    : 0;
  const { items } = userCart;

  // console.log("userCart in checkout is : ", userCart);

  const initialValues = {
    country: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    city: "",
    state: "",
    pincode: "",
    deliveryinfo: "",
  };

  const handleCreateAddress = async (values) => {
    // console.log("values ✌️✌️: ", values);
    try {
      const response = await dispatch(createAddress(values));
      // console.log("response in checkout is : ", response);
      const addresses = response.payload.data.address;
      const recentAddress = addresses[addresses.length - 1];
      const addressId = recentAddress._id;
      // console.log("addressId in checkout is : ⭐⭐ ", addressId);
      // After creating the address, update the addressId
      setAddressId(addressId);
    } catch (error) {
      console.log("error in checkout is : ", error);
    }
  };

  // checkOutHandler only when the addressId is updated
  useEffect(() => {
    if (addressId !== "") {
      checkOutHandler();
    }
  }, [addressId]);

  // fetch the user cart after the order is placed
  useEffect(() => {
    if (orderPlaced === true) {
      dispatch(getUserCart());
      setOrderPlaced(false);
      formik.setValues(initialValues);
    }
  }, [orderPlaced]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      // console.log("values in checkout formik is : ", values);
      // alert(JSON.stringify(values, null, 2));
      await handleCreateAddress(values);
      // checkOutHandler();
    },
  });

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const checkOutHandler = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const urlGenerateRazorpayOrder = `${base_url}orders/provider/razorpay`;
    // console.log("addressId 🤦‍♂️🤦‍♂️ : ", addressId);
    const response = await axios.post(
      urlGenerateRazorpayOrder,
      { addressId: addressId },
      config
    );
    if (!response) {
      alert("Razorpay order creation failed. Please try again");
      return;
    }
    // console.log("data in checkout is : ", response);

    const { amount, id: order_id, currency } = response.data.data;
    // console.log("amount in checkout is : ", amount);
    const options = {
      key: "rzp_test_ZqUn0SYce8KAwL", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Pavankumar Mhaske.",
      description: "Test Transaction",
      // image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          // razorpayPaymentId: response.razorpay_payment_id,
          // razorpayOrderId: response.razorpay_order_id,
          // razorpaySignature: response.razorpay_signature,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };
        // console.log("checkout data is 🗝️🗝️: ", data);

        const urlVerifyRazorpayPayment = `${base_url}orders/provider/razorpay/verify-payment`;

        const result = await axios.post(urlVerifyRazorpayPayment, data, config);

        // console.log("result in checkout is : ", result);
        if (result.data.success === true) {
          setOrderPlaced(true);
        }
        alert(result.data.message);
      },
      prefill: {
        name: "Pavankumar Mhaske",
        email: "mhaskepavankumar@gmail.com",
        contact: "8530470684",
      },
      notes: {
        address: "Pavankumar Mhaske Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

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
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
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
                onSubmit={formik.handleSubmit}
              >
                {/* Country  */}
                <div className="w-100">
                  <select
                    id=""
                    className="form-control form-select"
                    name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange("country")}
                    onBlur={formik.handleBlur("country")}
                  >
                    <option value="" selected disabled>
                      {" "}
                      Select Country
                    </option>
                    <option value="India" selected>
                      {" "}
                      India
                    </option>
                    <option value="US"> US</option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>

                {/* Address line 1 */}
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="123 Main Street, Redwood"
                    className="form-control"
                    name="addressLine1"
                    value={formik.values.addressLine1}
                    onChange={formik.handleChange("addressLine1")}
                    onBlur={formik.handleBlur("addressLine1")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.addressLine1 && formik.errors.addressLine1}
                  </div>
                </div>
                {/* Address line 2 */}
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="San Francisco Bay Area"
                    className="form-control"
                    name="addressLine2"
                    value={formik.values.addressLine2}
                    onChange={formik.handleChange("addressLine2")}
                    onBlur={formik.handleBlur("addressLine2")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.addressLine2 && formik.errors.addressLine2}
                  </div>
                </div>
                {/* Apartment */}
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Near the Springfield Mall, etc, (optional)"
                    className="form-control"
                    name="addressLine3"
                    value={formik.values.addressLine3}
                    onChange={formik.handleChange("addressLine3")}
                    onBlur={formik.handleBlur("addressLine3")}
                  />
                </div>
                {/* City */}
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                {/* State */}
                <div className="flex-grow-1">
                  <select
                    id=""
                    className="form-control form-select"
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange("state")}
                    onBlur={formik.handleBlur("state")}
                  >
                    <option value="" selected disabled>
                      Select State
                    </option>
                    <option value="Maharashtra" selected>
                      Maharashtra
                    </option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                {/* Zip Code */}
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Zip Code"
                    className="form-control"
                    name="pincode"
                    value={formik.values.pincode}
                    onChange={formik.handleChange("pincode")}
                    onBlur={formik.handleBlur("pincode")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>
                </div>
                {/* Delivery Information */}
                <div className="flex-grow-1">
                  <textarea
                    id=""
                    className="w-100 form-control"
                    cols="30"
                    rows="4"
                    name="deliveryinfo"
                    placeholder="Special Delivery Instructions (optional)"
                    value={formik.values.deliveryinfo}
                    onChange={formik.handleChange("deliveryinfo")}
                    onBlur={formik.handleBlur("deliveryinfo")}
                  ></textarea>
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
                    <button className="button" type="submit">
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* 💰🛒🛒🛒 Order Information 🛒🛒🛒💰 */}
          <div className="col-5 order-info py-5">
            {/* Cart Section */}
            <div className="border-bottom py-4">
              {userCart &&
                items &&
                items.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex gap-10 mb-2 justify-content-between align-items-center"
                    >
                      <div className="w-75 d-flex gap-10">
                        <div className="w-25 position-relative">
                          <span
                            style={{ top: "-10px", right: "-5px" }}
                            className="badge bg-secondary text-white rounded-circle position-absolute"
                          >
                            {item?.quantity || 0}
                          </span>
                          <img
                            className="img-fluid"
                            src={item?.productId?.mainImages[0]?.url || watch}
                            alt="Products"
                          />
                        </div>
                        <div className="w-75  d-flex flex-column justify-content-evenly position-relative ">
                          <h5 className="cart-title">
                            {item?.productId?.name}
                          </h5>
                          <div className="cart-sub-title d-flex gap-2  align-items-center">
                            <p className="final-products-price mb-0"> S / </p>
                            <ul className="colors ps-0 mb-0">
                              {item?.productId?.colors &&
                                item?.productId?.colors?.map((color, index) => {
                                  return (
                                    <li
                                      key={index}
                                      style={{
                                        backgroundColor: color?.name,
                                        cursor: "pointer",
                                      }}
                                    ></li>
                                  );
                                })}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="w-25 flex-grow-1 d-flex justify-content-end ">
                        <div className="">
                          <p className="final-products-price">
                            ${item?.productId?.price * item.quantity}.00
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            {/* Pricing Section */}
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="subtotal">SubTotal</p>
                <p className="shipping-total">${subTotal}.00</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 shipping">Shipping</p>
                <p className="mb-0 shipping-price">${ShippingFee}.00</p>
              </div>
            </div>
            {/* Final Pricing Section */}
            <div className="border-bottom py-4 d-flex justify-content-between align-items-center">
              <h4 className="total">Total</h4>
              <h5 className="total-price">
                <span>USD</span> ${subTotal + ShippingFee}.00
              </h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
