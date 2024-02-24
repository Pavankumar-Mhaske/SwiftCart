import React from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

const Orders = () => {
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
            <div className="row">
              <div className="col-3">
                <p>Order Id</p>
              </div>
              <div className="col-3">
                <p>Total Amount</p>
              </div>
              <div className="col-3">
                <p>Total amount after discount</p>
              </div>
              <div className="col-3">
                <p>Status</p>
              </div>
              <div className="col-12">
                <div className="row bg-secondary p-3">
                  <div className="col-3">
                    <p>Order Id</p>
                  </div>
                  <div className="col-3">
                    <p>Total Amount</p>
                  </div>
                  <div className="col-3">
                    <p>Total amount after discount</p>
                  </div>
                  <div className="col-3">
                    <p>Status</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Orders;
