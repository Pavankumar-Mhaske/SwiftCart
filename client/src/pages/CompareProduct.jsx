import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Color from "../components/Color";

const CompareProduct = () => {
  return (
    <>
      <Meta title={"Compare Products"} />
      <BreadCrumb title="Compare Products" />
      {/* ⭐⭐⭐⭐ compare-product-wrapper  ⭐⭐⭐⭐ */}
      <div className="compare-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            {/* 🧭🧭🧭 compare-product-card - 1 🧭🧭🧭 */}
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
                <div className="product-card-image">
                  <img src="images/watch.jpg" alt="watch" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">
                    Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi_5G Tablet
                  </h5>
                  <h6 className="price mt-3 mb-3">$100.00</h6>
                  <div>
                    <div className="product-detail">
                      <h5>Brand</h5>
                      <p>Havels</p>
                    </div>
                    <div className="product-detail">
                      <h5>Type</h5>
                      <p>Watch</p>
                    </div>
                    <div className="product-detail">
                      <h5>Availability</h5>
                      <p>In Stock</p>
                    </div>
                    <div className="product-detail">
                      <h5>Color</h5>
                      <Color />
                    </div>
                    <div className="product-detail">
                      <h5>Size</h5>
                      <div className="d-flex gap-10">
                        <p>S</p>
                        <p>M</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 🧭🧭🧭 compare-product-card - 2 🧭🧭🧭 */}
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
                <div className="product-card-image">
                  <img src="images/watch.jpg" alt="watch" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">
                    Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi_5G Tablet
                  </h5>
                  <h6 className="price mt-3 mb-3">$100.00</h6>
                  <div>
                    <div className="product-detail">
                      <h5>Brand</h5>
                      <p>Havels</p>
                    </div>
                    <div className="product-detail">
                      <h5>Type</h5>
                      <p>Watch</p>
                    </div>
                    <div className="product-detail">
                      <h5>Availability</h5>
                      <p>In Stock</p>
                    </div>
                    <div className="product-detail">
                      <h5>Color</h5>
                      <Color />
                    </div>
                    <div className="product-detail">
                      <h5>Size</h5>
                      <div className="d-flex gap-10">
                        <p>S</p>
                        <p>M</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompareProduct;
