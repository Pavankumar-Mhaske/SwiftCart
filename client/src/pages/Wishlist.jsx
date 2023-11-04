import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";

const Wishlist = () => {
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <div className="wishlist-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            {/* 💖💖💖 wishlist-card - 1  💖💖💖 */}
            <div className="col-3">
              <div className="wishlist-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
                <div className="wishlist-card-image">
                  <img
                    src="images/watch.jpg"
                    className="img-fluid w-100"
                    alt="watch"
                  />
                </div>
                <div className="py-3 px-3">
                  <h5 className="title">
                    Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi_5G Tablet
                  </h5>
                  <h6 className="price">$ 100</h6>
                </div>
              </div>
            </div>
            {/* 💖💖💖 wishlist-card - 2  💖💖💖 */}
            <div className="col-3">
              <div className="wishlist-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
                <div className="wishlist-card-image">
                  <img
                    src="images/watch.jpg"
                    className="img-fluid w-100"
                    alt="watch"
                  />
                </div>
                <div className="py-3 px-3">
                  <h5 className="title">
                    Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi_5G Tablet
                  </h5>
                  <h6 className="price">$ 100</h6>
                </div>
              </div>
            </div>
            {/* 💖💖💖 wishlist-card - 3  💖💖💖 */}
            <div className="col-3">
              <div className="wishlist-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
                <div className="wishlist-card-image">
                  <img
                    src="images/watch.jpg"
                    className="img-fluid w-100"
                    alt="watch"
                  />
                </div>
                <div className="py-3 px-3">
                  <h5 className="title">
                    Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi_5G Tablet
                  </h5>
                  <h6 className="price">$ 100</h6>
                </div>
              </div>
            </div>
            {/* 💖💖💖 wishlist-card - 4  💖💖💖 */}
            <div className="col-3">
              <div className="wishlist-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
                <div className="wishlist-card-image">
                  <img
                    src="images/watch.jpg"
                    className="img-fluid w-100"
                    alt="watch"
                  />
                </div>
                <div className="py-3 px-3">
                  <h5 className="title">
                    Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi_5G Tablet
                  </h5>
                  <h6 className="price">$ 100</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
