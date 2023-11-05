import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";

const SingleProduct = () => {
  const [orderedProduct, setOrderedProduct] = useState(true);
  return (
    <>
      <Meta title={"Product Name dynamically"} />
      <BreadCrumb title="Product Name dynamically" />

      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6"></div>
            <div className="col-6"></div>
          </div>
        </div>
      </div>
      {/* Description */}
      <section className="description-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4>Description</h4>
              <div className="description-inner-wrapper">
                <div className="bg-white p-3">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptate placeat, excepturi commodi, amet molestias beatae
                    reprehenderit in maiores adipisci maxime libero, iste
                    praesentium quas. Qui aliquam minima voluptas et expedita?.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Reviews */}
      <section className="reviews-wrapper   home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              {/* Review Wrapper */}
              <h3>Reviews</h3>
              <div className="review-inner-wrapper">
                <div className="review-head d-flex justify-content-between align-items-end">
                  {/* Customer Review  */}
                  <div>
                    <h4>Customer Reviews</h4>
                    <div className="d-flex align-items-center gap-10">
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        isHalf={true}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className="mb-0">Based on 2 reviews</p>
                    </div>
                  </div>
                  {/* Write Review Button */}
                  {orderedProduct && (
                    <div>
                      <a
                        className="text-dark text-decoration-underline"
                        href=""
                      >
                        Write a Review
                      </a>
                    </div>
                  )}
                </div>
                {/* Review Form Body */}
                <div className="review-form py-4">
                  <h4>Write a Review</h4>
                  <form action="" className="d-flex flex-column gap-15">
                    <div>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        isHalf={true}
                        edit={true}
                        activeColor="#ffd700"
                      />
                    </div>
                    <div>
                      <textarea
                        name=""
                        id=""
                        className="w-100 form-control"
                        cols="30"
                        rows="4"
                        placeholder="Comments"
                      ></textarea>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className="button border-0">Submit Review</button>
                    </div>
                  </form>
                </div>
                {/* Review List */}
                <div className="reviews mt-4">
                  {/* 👀👀👀 Review - 1 👀👀👀 */}
                  <div className="review">
                    <div className="review-head d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-10">
                        <ReactStars
                          count={5}
                          size={24}
                          value={4}
                          isHalf={true}
                          edit={true}
                          activeColor="#ffd700"
                        />
                        <h6 className="mb-0">John Doe</h6>
                      </div>
                      <p className="mb-0">2 days ago</p>
                    </div>
                    <div className="review-body">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, voluptas.
                      </p>
                    </div>
                  </div>
                  {/* 👀👀👀 Review - 2 👀👀👀 */}
                  <div className="review">
                    <div className="review-head d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-10">
                        <ReactStars
                          count={5}
                          size={24}
                          value={4}
                          isHalf={true}
                          edit={true}
                          activeColor="#ffd700"
                        />
                        <h6 className="mb-0">John Doe</h6>
                      </div>
                      <p className="mb-0">2 days ago</p>
                    </div>
                    <div className="review-body">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, voluptas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Popular Products */}
      <section className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Popular Products</h3>
            </div>
          </div>
          <div className="row">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
