import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/specialProduct";
import Container from "../components/Container";
import { services } from "../utils/Data";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../features/blog/BlogSlice";
import moment from "moment";
import { getProducts } from "../features/product/ProductSlice";
import ReactStars from "react-rating-stars-component";
import { addRemoveProductInWishList } from "../features/product/ProductSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
    dispatch(getProducts());
  }, []);

  const blogState = useSelector((state) => state?.blog?.blogs);
  console.log("blogState in blog is 🔥🔥 : ", blogState);

  const productState = useSelector((state) => state?.product?.products);
  console.log("productState in product is 🔥🔥 : ", productState);

  return (
    <>
      {/* 🍉🍉 Home Wrapper - 1 🍉🍉 */}
      <Container class1="home-wrapper-1 py-5 ">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative ">
              <img
                className="img-fluid rounded-3"
                src="/images/main-banner-1.jpg"
                alt="main-banner"
              />
              <div className="main-banner-content position-absolute ">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>
                  from $999.00 or $41.62/mo. <br /> for 24 mo. Footnote*{" "}
                </p>
                <Link className="button">BUY NOW</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10  justify-content-between align-items-center ">
              {/* Catbanner-1 */}
              <div className="small-banner position-relative ">
                <img
                  className="img-fluid rounded-3"
                  src="/images/catbanner-01.jpg"
                  alt="small-banner"
                />
                <div className="small-banner-content position-absolute ">
                  <h4>Best Sale</h4>
                  <h5>Laptops Max</h5>
                  <p>
                    from $1699.00 or <br /> $64.62/mo.
                  </p>
                  {/* <Link className="button">BUY NOW</Link> */}
                </div>
              </div>
              {/* Catbanner-2 */}
              <div className="small-banner position-relative ">
                <img
                  className="img-fluid rounded-3"
                  src="/images/catbanner-02.jpg"
                  alt="small-banner"
                />
                <div className="small-banner-content position-absolute ">
                  <h4>15% OFF</h4>
                  <h5>Smartwatch 7</h5>
                  <p>
                    shop the latest band <br /> styles and colors
                  </p>
                  {/* <Link className="button">BUY NOW</Link> */}
                </div>
              </div>
              {/* Catbanner-3 */}
              <div className="small-banner position-relative ">
                <img
                  className="img-fluid rounded-3"
                  src="/images/catbanner-03.jpg"
                  alt="small-banner"
                />
                <div className="small-banner-content position-absolute ">
                  <h4>NEW ARRIVAL.</h4>
                  <h5>Buy IPad Air.</h5>
                  <p>
                    from $999.00 or <br /> $49.91/mo. for 12 mo.
                  </p>
                  {/* <Link className="button">BUY NOW</Link> */}
                </div>
              </div>
              {/* Catbanner-4 */}
              <div className="small-banner position-relative ">
                <img
                  className="img-fluid rounded-3"
                  src="/images/catbanner-04.jpg"
                  alt="small-banner"
                />
                <div className="small-banner-content position-absolute ">
                  <h4>FREE ENGRAVING</h4>
                  <h5>AirPods Max</h5>
                  <p>
                    High-fidelity plaback & <br /> ultra-low distortion
                  </p>
                  {/* <Link className="button">BUY NOW</Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* 🍉🍉 Home Wrapper - 2 🍉🍉 */}
      <Container class1="home-wrapper-2 py-5 ">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {services?.map((service, index) => {
                return (
                  <>
                    {/* 🎁🎁 Service 🎁🎁 */}
                    <div
                      key={index}
                      className="d-flex align-items-center gap-15"
                    >
                      <img src={service.image} alt="services" />
                      <div>
                        <h6>{service.title}</h6>
                        <p className="mb-0">{service.tagline}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
      {/* 🍉🍉 Home Wrapper - 3 🍉🍉 */}
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between flex-wrap align-items-center">
              {/* 🍉🍉 Category - 1 🍉🍉 */}
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Computers & Laptop</h6>
                  <p>10 Items</p>
                </div>
                <img src="/images/laptop.jpg" alt="camera" />
              </div>
              {/* 🍉🍉 Category - 2 🍉🍉 */}
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Cameras & Videos</h6>
                  <p>10 Items</p>
                </div>
                <img src="/images/camera.jpg" alt="camera" />
              </div>
              {/* 🍉🍉 Category - 3 🍉🍉 */}
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Smart Television</h6>
                  <p>10 Items</p>
                </div>
                <img src="/images/tv.jpg" alt="camera" />
              </div>
              {/* 🍉🍉 Category - 4 🍉🍉 */}
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Accessories</h6>
                  <p>10 Items</p>
                </div>
                <img src="/images/acc.jpg" alt="camera" />
              </div>
              {/* 🍉🍉 Category - 5 🍉🍉 */}
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Portable Speakers</h6>
                  <p>10 Items</p>
                </div>
                <img src="/images/speaker.jpg" alt="camera" />
              </div>
              {/* 🍉🍉 Category - 6 🍉🍉 */}
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Home Appliances</h6>
                  <p>10 Items</p>
                </div>
                <img src="/images/homeapp.jpg" alt="camera" />
              </div>
              {/* 🍉🍉 Category - 7 🍉🍉 */}
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Smartwatches</h6>
                  <p>10 Items</p>
                </div>
                <img src="/images/acc.jpg" alt="camera" />
              </div>
              {/* 🍉🍉 Category - 8 🍉🍉 */}
              <div className="d-flex gap-30 align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="/images/camera.jpg" alt="camera" />
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* 🍉🍉 Home Wrapper - 4 🍉🍉 */}
      {/* Featured Collections */}
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collections</h3>
          </div>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Container>
      {/* 🍉🍉 Home Wrapper - 5 🍉🍉 */}
      <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card black-background position-relative ">
              <img src="images/watch5.jpg" className="img-fluid" alt="watch" />
              <div className="famous-content position-absolute ">
                <h5 className="black-background">Big Screen</h5>
                <h6 className="black-background">Smart Watch Series 7</h6>
                <p className="black-background">
                  From $399 or $16.62/mo. for 24 mo.*
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              {/* <img src="images/watch2.webp" alt="" /> */}
              <img src="images/mobile1.jpg" className="img-fluid" alt="watch" />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Smartphones</h5>
                <h6 className="text-dark">Smartpnone 13 Pro</h6>
                <p className="text-dark">
                  Now in blue, silver, gold, and red. From $699 or $29.12/mo.
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative  ">
              <img src="images/alexa1.jpg" className="img-fluid" alt="watch" />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Home Speakers</h5>
                <h6 className="text-dark">Room-filling Sound</h6>
                <p className="text-dark">
                  From $699 or $116.58/mo. for 12 mo.{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative  ">
              <img src="images/tv1.jpg" className="img-fluid" alt="watch" />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Studio display</h5>
                <h6 className="text-dark">600 nits of brightness</h6>
                <p className="text-dark">27-inch 5k Ratina display</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* 🍉🍉 Home Wrapper - 6 🍉🍉 */}
      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
          {/* /* 🍉🍉 Special Product - 1 🍉🍉 */}
          {productState &&
            productState.map((item, index) => {
              if (index < 4 && item.tags.includes("SPECIAL")) {
                return (
                  <SpecialProduct
                    key={index}
                    title={item?.name}
                    brand={item?.brand}
                    price={item?.price}
                    rating={item?.rating}
                    stock={item?.stock}
                    images={item?.mainImages}
                    soldItems={item?.soldItems}
                  />
                );
              }
            })}
        </div>
      </Container>
      {/* 🍉🍉 Home Wrapper - 7 🍉🍉 */}
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState.map((item, index) => {
              if (index < 4 && item.tags.includes("SPECIAL")) {
                return (
                  <div
                    key={index}
                    className={`${
                      // location.pathname === "/store" ||
                      // location.pathname === "/product/:id"
                      //   ? `gr-${grid}`
                      // :
                      "col-3"
                    }`}
                  >
                    <Link
                      // to={`${
                      //   location.pathname === "/" ? "/product/:id" : "/product/:id"
                      // }`}
                      className="product-card position-relative"
                    >
                      <div className="wishlist-icon position-absolute">
                        <button
                          type="button"
                          className="border-0 bg-transparent"
                          onClick={(event) => {
                            // event.stopPropagation(); // Prevents the Link from being clicked
                            if (item?._id) {
                              addProductToWishList(item._id);
                            }
                          }}
                        >
                          <img src="/images/wish.svg" alt="wishlist" />
                        </button>
                      </div>
                      <div
                        className="product-image"
                        style={{ height: "auto", width: "auto" }}
                      >
                        <img
                          className="img-fluid"
                          src={item?.mainImages[0]?.url} //😀
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          // src="/images/watch1.jpeg" //😀
                          alt="Product Image"
                        />
                        <img
                          className="img-fluid"
                          src={item?.mainImages[1]?.url}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          // src="/images/watch2.jpeg"
                          alt="Product Image"
                        />
                      </div>
                      <div className="product-details">
                        <h6 className="brand">{item.brand}</h6>
                        <h5 className="product-title">{item?.name}</h5>
                        <ReactStars
                          count={5}
                          size={24}
                          value={item.rating}
                          isHalf={true}
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <p
                          className={`description ${
                            // grid === 12 ? `d-block` :
                            `d-none`
                          }`}
                        >
                          {/* dangerouslySetInnerHTML={{ __html: item?.description }} */}
                          {item?.description}
                        </p>

                        <p className="price">${item.price}</p>
                      </div>
                      <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                          <button className="border-0 bg-transparent">
                            <img
                              src="/images/prodcompare.svg"
                              alt="Compare Products"
                            />
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
                );
                {
                  /* 🌹 */
                }
              }
            })}
        </div>
      </Container>
      {/* 🍉🍉 Home Wrapper - 8 🍉🍉 */}
      <Container class1="marquee-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                {/* 🍏🍏 Card - 1 🍏🍏*/}
                <div className="mx-4 w-25">
                  <img src="/images/brand-01.png" alt="brand" />
                </div>
                {/* 🍏🍏 Card - 2 🍏🍏*/}
                <div className="mx-4 w-25">
                  <img src="/images/brand-02.png" alt="brand" />
                </div>
                {/* 🍏🍏 Card - 3 🍏🍏*/}
                <div className="mx-4 w-25">
                  <img src="/images/brand-03.png" alt="brand" />
                </div>
                {/* 🍏🍏 Card - 4 🍏🍏*/}
                <div className="mx-4 w-25">
                  <img src="/images/brand-04.png" alt="brand" />
                </div>
                {/* 🍏🍏 Card - 5 🍏🍏*/}
                <div className="mx-4 w-25">
                  <img src="/images/brand-05.png" alt="brand" />
                </div>
                {/* 🍏🍏 Card - 6 🍏🍏*/}
                <div className="mx-4 w-25">
                  <img src="/images/brand-06.png" alt="brand" />
                </div>
                {/* 🍏🍏 Card - 7 🍏🍏*/}
                <div className="mx-4 w-25">
                  <img src="/images/brand-07.png" alt="brand" />
                </div>
                {/* 🍏🍏 Card - 8 🍏🍏*/}
                <div className="mx-4 w-25">
                  <img src="/images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
      {/* 🍉🍉 Home Wrapper - 9 🍉🍉 */}
      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
        </div>
        <div className="row">
          {blogState.map((item, index) => {
            {
              /* 🧭🧭 Blog Card - 1 🧭🧭 */
            }
            if (index < 4) {
              return (
                <div className="col-3 mb-3" key={index}>
                  <BlogCard
                    id={item?._id}
                    title={item?.title}
                    description={item?.description}
                    image={item?.images[0]?.url}
                    date={moment(item?.createdAt).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  />
                </div>
              );
            }
          })}
          {/* <div className="col-3">
            <BlogCard />
          </div>
          <div className="col-3">
            <BlogCard />
          </div>
          <div className="col-3">
            <BlogCard />
          </div>
          <div className="col-3">
            <BlogCard />
          </div> */}
        </div>
      </Container>
    </>
  );
};

export default Home;
