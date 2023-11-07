import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
// import ReactImageZoom from "react-image-zoom";
import ReactImageMagnify from "react-image-magnify";
import Color from "../components/Color";
import { Link } from "react-router-dom";
import { IoGitCompare } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { FcShipped } from "react-icons/fc";
import { GiMaterialsScience } from "react-icons/gi";
import { RxDimensions } from "react-icons/rx";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";

import CopyToClipboard from "../components/copy.jsx";

const SingleProduct = () => {
  const grid = 2;
  const [copiedText, setCopiedText] = useState(""); // State to hold the text to be copied
  const pRef = useRef(); // Create a ref for the <p> element
  useEffect(() => {
    setCopiedText(pRef.current.textContent);
  }, []);

  const [orderedProduct, setOrderedProduct] = useState(true);

  return (
    <>
      <Meta title={"Product Name dynamically"} />
      <BreadCrumb title="Product Name dynamically" />

      {/* Product Details */}
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            {/* 🌳🌲🌲🌳 Product Images Section 🌳🌲🌲🌳 */}
            <div className="col-6">
              {/* 📸📷📸 Main Product Images 📸📷📸 */}
              <div className="main-product-image">
                <div>
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "Wristwatch by Ted Baker London",
                        isFluidWidth: true,
                        src: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1694713300/Croma%20Assets/Communication/Wearable%20Devices/Images/300848_0_hyu5ar.png?tr=w-640",
                      },
                      largeImage: {
                        src: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1694713300/Croma%20Assets/Communication/Wearable%20Devices/Images/300848_0_hyu5ar.png?tr=w-640",
                        width: 1200,
                        height: 1200,
                        alt: "Wristwatch by Ted Baker London",
                      },
                      enlargedImageContainerClassName: "enlargedImageContainer",
                    }}
                  />
                </div>
              </div>
              {/* 📸📷📸 Other Product Images 📸📷📸 */}
              <div className="other-product-images d-flex flex-wrap gap-15 ">
                {/* 🎀🎀🎀 Image - 1  🎀🎀🎀 */}
                <div>
                  <img
                    className="img-fluid"
                    // src="/images/watch.jpg"
                    src="https://m.media-amazon.com/images/I/71YdE55GwjL._SX679_.jpg"
                    alt="watch"
                  />
                </div>
                {/* 🎀🎀🎀 Image - 2  🎀🎀🎀 */}
                <div>
                  <img
                    className="img-fluid"
                    // src="/images/watch.jpg"
                    src="https://m.media-amazon.com/images/I/71Fh4UiXnUL._SX679_.jpg"
                    alt="watch"
                  />
                </div>
                {/* 🎀🎀🎀 Image - 3  🎀🎀🎀 */}
                <div>
                  <img
                    className="img-fluid"
                    // src="/images/watch.jpg"
                    src="https://m.media-amazon.com/images/I/811GOkDSOaL._SX679_.jpg"
                    alt="watch"
                  />
                </div>
                {/* 🎀🎀🎀 Image - 4  🎀🎀🎀 */}
                <div>
                  <img
                    className="img-fluid"
                    // src="/images/watch.jpg"
                    src="https://m.media-amazon.com/images/I/71Q-4X6lBhL._SX679_.jpg"
                    alt="watch"
                  />
                </div>
              </div>
            </div>
            {/* 🌳🌲🌲🌳 Product Details Section 🌳🌲🌲🌳 */}
            <div className="col-6">
              <div className="main-product-details">
                {/* Title and all */}
                <div className="border-bottom">
                  <h3 className="title">
                    Kids headphones Bulk 10 Pack Multi Colored For Students{" "}
                  </h3>
                </div>
                {/* Price, Ratings and Write a Review */}
                <div className="border-bottom py-3">
                  <p className="price">$ 100</p>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      isHalf={true}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0 t-review">( 2 reviews )</p>
                  </div>
                  <a className="review-btn" href="#review">
                    {" "}
                    Write a Review
                  </a>
                </div>
                {/* Each Details */}
                <div className="border-bottom py-3 ">
                  <div className="d-flex gap-10 align-items-center my-2 ">
                    <h3 className="product-heading">Type :</h3>
                    <p className="product-data">Watch</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2 ">
                    <h3 className="product-heading">Brand :</h3>
                    <p className="product-data">Apple</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2 ">
                    <h3 className="product-heading">Category :</h3>
                    <p className="product-data">
                      Airpods, Camera's, Computer and Laptops, mini speaker, our
                      Store, Portable Speakers, smart phones, Smart Television,
                      Smartwatches
                    </p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2 ">
                    <h3 className="product-heading">Tags :</h3>
                    <p className="product-data">
                      headphones laptops mobile oppo speaker
                    </p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2 ">
                    <h3 className="product-heading">SKU :</h3>
                    <p className="product-data">SKU027</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2 ">
                    <h3 className="product-heading">Availability :</h3>
                    <p className="product-data"> 541 In Stock</p>
                  </div>
                  <div className="d-flex gap-10 flex-column mt-2 mb-3 ">
                    <h3 className="product-heading">Size :</h3>
                    <div className="d-flex flex-wrap gap-15">
                      <span className="badge border border-1 bg-white text-dark border-secondary ">
                        S
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary ">
                        M
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary ">
                        L
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary ">
                        XL
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary ">
                        XXL
                      </span>
                    </div>
                  </div>
                  <div className="d-flex gap-10 flex-column mt-2 mb-3 ">
                    <h3 className="product-heading">Color :</h3>
                    <Color />
                  </div>
                  {/* Quantity Input , ADD TO CART, BUY IT NOW */}
                  <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3 ">
                    <h3 className="product-heading">Quantity :</h3>
                    <div className="">
                      <input
                        type="number"
                        name="quntity"
                        min={1}
                        max={10}
                        defaultValue={1} // Set the default value to 1
                        className="form-control"
                        style={{ width: "70px" }}
                        id=""
                      />
                    </div>
                    <div className="cart-buy d-flex align-items-center gap-30 ms-5">
                      <button type="submit" className="button border-0">
                        Add To Cart
                      </button>
                      <button to="/signup" className="button signup">
                        Buy It Now
                      </button>
                    </div>
                  </div>
                  {/* Add to Compare | Add to Wishlist */}
                  <div className="d-flex align-items-center gap-15 mt-4 mb-3">
                    <div>
                      <a href="">
                        {" "}
                        <IoGitCompare className="fs-5 me-2" /> Add to Compare
                      </a>
                    </div>
                    <div>
                      <a href="">
                        {" "}
                        <AiOutlineHeart className="fs-5 me-2" /> Add to Wishlist
                      </a>
                    </div>
                  </div>
                  {/* Accordion  */}
                  <div
                    className="accordion py-5"
                    id="accordionPanelsStayOpenExample"
                  >
                    {/* Shiping & Returns */}
                    <div className="accordion-item">
                      <h2
                        className="accordion-header"
                        id="panelsStayOpen-headingOne"
                      >
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapseOne"
                          aria-expanded="true"
                          aria-controls="panelsStayOpen-collapseOne"
                        >
                          <FcShipped className="fs-5 me-2" /> Shiping & Returns
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="panelsStayOpen-headingOne"
                      >
                        <div className="accordion-body">
                          <p>
                            Free shipping and returns available on all orders!{" "}
                            <br />
                            WE ship all Us domestic orders within{" "}
                            <strong>5-10 business days!</strong>{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Materials */}
                    <div className="accordion-item">
                      <h2
                        className="accordion-header"
                        id="panelsStayOpen-headingTwo"
                      >
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapseTwo"
                          aria-expanded="false"
                          aria-controls="panelsStayOpen-collapseTwo"
                        >
                          <GiMaterialsScience className="fs-5 me-2" /> Materials
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="panelsStayOpen-headingTwo"
                      >
                        <div className="accordion-body">
                          Crafted with top-quality and durable materials. Our
                          products are built to last and withstand everyday use.
                        </div>
                      </div>
                    </div>
                    {/* Dimensions */}
                    <div className="accordion-item">
                      <h2
                        className="accordion-header"
                        id="panelsStayOpen-headingThree"
                      >
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapseThree"
                          aria-expanded="false"
                          aria-controls="panelsStayOpen-collapseThree"
                        >
                          <RxDimensions className="fs-5 me-2" /> Dimensions
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="panelsStayOpen-headingThree"
                      >
                        <div className="accordion-body">
                          Product dimensions: 10" x 12". Designed to fit
                          seamlessly into your space and provide the perfect
                          size for your needs.
                          {/* <code>.accordion-body</code> */}
                        </div>
                      </div>
                    </div>
                    {/* Care Instruction */}
                    <div className="accordion-item">
                      <h2
                        className="accordion-header"
                        id="panelsStayOpen-headingThree"
                      >
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapseThree"
                          aria-expanded="false"
                          aria-controls="panelsStayOpen-collapseThree"
                        >
                          <MdOutlineHealthAndSafety className="fs-5 me-2" />{" "}
                          Care Instructions
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="panelsStayOpen-headingThree"
                      >
                        <div className="accordion-body">
                          For longevity, hand wash the product in cold water
                          with mild detergent. Air dry the item for best
                          results, avoiding excessive heat or direct sunlight.
                          Refer to our care instructions for more specific
                          product maintenance tips.
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Copy Product Link */}
                  <div className="d-flex gap-10 justify-content-between align-items-center my-2 mx-3 ">
                    <h3 className="product-heading">
                      {" "}
                      <AiOutlineLink className="fs-5 me-2" /> Copy Product Link
                      :
                    </h3>
                    <p ref={pRef} className="product-data product-link">
                      https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1694713300/Croma%20Assets/Communication/Wearable%20Devices/Images/300848_0_hyu5ar.png?tr=w-640
                    </p>
                    <div className="copyIcon">
                      <CopyToClipboard textData={copiedText} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
              <h3 id="review">Reviews</h3>
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
      {/* You may also like */}
      <section className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">You May Also Like</h3>
            </div>
          </div>
          <div className="row">
            <ProductCard grid={grid} />
            <ProductCard grid={grid} />
            <ProductCard grid={grid} />
            <ProductCard grid={grid} />
            <ProductCard grid={grid} />
            <ProductCard grid={grid} />
            <ProductCard grid={grid} />
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
