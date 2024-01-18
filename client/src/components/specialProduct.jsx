import React from "react";
import ReactStars from "react-rating-stars-component";
import { NavLink, Link } from "react-router-dom";
const SpecialProduct = (props) => {
  const { title, brand, price, rating, stock, images, soldItems } = props;
  return (
    <div className="col-6 mb-3">
      <div className="special-product-card">
        <div className="d-flex justify-content-between ">
          <div
            className="product-image product-image-container"
            // style={{ width: "50%", height: "auto" }}
          >
            <img
              className="img-fluid"
              src={images[0]?.url} //😀
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              // src="/images/watch1.jpeg" //😀
              alt="Product Image"
            />
            <img
              className="img-fluid"
              src={images[1]?.url}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              // src="/images/watch2.jpeg"
              alt="Product Image"
            />
          </div>
          <div
            className="special-product-content"
            style={{ width: "45%", height: "auto" }}
          >
            <h5 className="brand">{brand}</h5>
            <h6 className="title">{title}</h6>
            <ReactStars
              count={5}
              size={24}
              value={rating}
              isHalf={true}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price">
              <span className="red-p">
                &nbsp; ${price} <strike> ${price * 2}</strike>
              </span>
            </p>
            <div className="discount-till d-flex align-items-center gap-10">
              <p className="mb-0">
                <b>5</b>days
              </p>
              <div className="d-flex gap-10 align-items-center">
                <span className="badge rounded-circle p-3 bg-danger">1</span>:
                <span className="badge rounded-circle p-3 bg-danger">1</span>:
                <span className="badge rounded-circle p-3 bg-danger">1</span>
              </div>
            </div>
            <div className="prod-count my-3">
              <p>Only Left : {stock - soldItems}</p>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${((stock - soldItems) / stock) * 100}%`,
                  }}
                  aria-valuenow={((stock - soldItems) / stock) * 100}
                  aria-valuemin={soldItems}
                  aria-valuemax={stock}
                ></div>
              </div>
            </div>
            <Link className="button"> Add to Cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
