import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import { BsFillHandbagFill, BsEye } from "react-icons/bs";
const ProductCard = (props) => {
  const { grid } = props;
  let location = useLocation();
  console.log(location);
  console.log(location.pathname === "/store");
  console.log(`col-${grid}`);
  return (
    <>
      <div
        className={`${
          location.pathname === "/store" || location.pathname === "/product/:id"
            ? `gr-${grid}`
            : "col-3"
        }`}
      >
        <Link to="/product/:id" className="product-card position-relative">
          <div className="wishlist-icon position-absolute">
            <button className="border-0 bg-transparent">
              <img src="/images/wish.svg" alt="wishlist" />
            </button>
          </div>
          <div className="product-image">
            <img
              className="img-fluid"
              src="/images/watch1.jpeg"
              alt="Product Image"
            />
            <img
              className="img-fluid"
              src="/images/watch2.jpeg"
              alt="Product Image"
            />
          </div>
          <div className="product-details">
            <h6 className="brand">Havels</h6>
            <h5 className="product-title">
              Kids headphones bulk 10 pack multi colored for students
            </h5>
            <ReactStars
              count={5}
              size={24}
              value={4}
              isHalf={true}
              edit={false}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? `d-block` : `d-none`}`}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              quibusdam, voluptatum, quia, quod voluptatem a -- a-- eligendi
              voluptates voluptas doloribus quos quae natus?
            </p>

            <p className="price">$100</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <button className="border-0 bg-transparent">
                <img src="/images/prodcompare.svg" alt="Compare Products" />
                {/* <BsFillHandbagFill /> */}
              </button>
              <button className="border-0 bg-transparent">
                <img src="/images/view.svg" alt="AddCart" />
                {/* <BsEye /> */}
              </button>
              <button className="border-0 bg-transparent">
                <img src="/images/add-cart.svg" alt="AddCart" />
                {/* <BsFillHandbagFill /> */}
              </button>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
