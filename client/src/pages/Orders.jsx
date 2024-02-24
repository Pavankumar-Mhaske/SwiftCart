import React, { useEffect } from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { getUserOrders } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.user);
  const { orders, isLoading, isSuccess, isError, message } = orderState;
  console.log("orders in Orders is 🍔🍔 : ", orders);

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  return (
    <>
      <Meta title={"Orders"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="col-12">
          <div className="row">
            <div className="col-3">
              <h5>Order Id</h5>
            </div>
            <div className="col-3">
              <h5>Total Amount</h5>
            </div>
            <div className="col-3">
              <h5>Total amount after discount</h5>
            </div>
            <div className="col-3">
              <h5>Status</h5>
            </div>
          </div>
          <div className="col-12 mt-3">
            {orders &&
              orders?.map((item, index) => {
                return (
                  <div
                    className="row my-3 pt-3"
                    key={index}
                    style={{
                      backgroundColor: "lightgray",
                      borderRadius: "10px",
                    }}
                  >
                    <div className="col-3">
                      <p>{item?._id}</p>
                    </div>
                    <div className="col-3">
                      <p>{item?.orderPrice}</p>
                    </div>
                    <div className="col-3">
                      <p>{item?.discountedOrderPrice}</p>
                    </div>
                    <div className="col-3">
                      <p>{item?.status}</p>
                    </div>
                    <div className="col-12">
                      <div
                        className="row py-3"
                        style={{ backgroundColor: "#232f3e" }}
                      >
                        <div className="col-3">
                          <h6 className="text-white">Product Name</h6>
                        </div>
                        <div className="col-3">
                          <h6 className="text-white">Quantity</h6>
                        </div>
                        <div className="col-3">
                          <h6 className="text-white">Price</h6>
                        </div>
                        <div className="col-3">
                          <h6 className="text-white">Brand</h6>
                        </div>
                        {item &&
                          item?.items &&
                          item?.items?.map((product, index) => {
                            return (
                              <div className="col-12" key={index}>
                                <div className="row py-3">
                                  <div className="col-3">
                                    <p className="text-white">
                                      {product?.productId?.name}
                                    </p>
                                  </div>
                                  <div className="col-3">
                                    <p className="text-white">
                                      {product?.quantity}
                                    </p>
                                  </div>
                                  <div className="col-3">
                                    <p className="text-white">
                                      {product?.productId?.price}
                                    </p>
                                  </div>
                                  <div className="col-3">
                                    <p className="text-white">
                                      {product?.productId?.brand}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Orders;
