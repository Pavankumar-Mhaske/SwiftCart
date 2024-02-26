import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
// import ReactImageZoom from "react-image-zoom";
import ReactImageMagnify from "react-image-magnify";
import Color from "../components/Color";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoGitCompare } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { FcShipped } from "react-icons/fc";
import { GiMaterialsScience } from "react-icons/gi";
import { RxDimensions } from "react-icons/rx";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";

import CopyToClipboard from "../components/copy.jsx";
import Container from "../components/Container.jsx";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  addReviewsAndRating,
  getAProduct,
  getProducts,
} from "../features/product/ProductSlice.jsx";

import {
  showToastLoading,
  showToastSuccess,
  showToastError,
  Toast,
} from "../utils/HotToastHandler";
import {
  addItemOrUpdateItemQuantity,
  getUserCart,
} from "../features/user/UserSlice.jsx";
import { multiFormatDateString } from "../utils/DateFormate.js";

const SingleProduct = () => {
  const location = useLocation();
  const getProductId = location.pathname.split("/")[2];
  // console.log("getProductId in SingleProduct is : ", getProductId);

  const navigate = useNavigate();
  const [color, setColor] = useState(null);
  // console.log("Color is : ", color);
  const [quantity, setQuantity] = useState(1);
  // console.log("Quantity is : ", quantity);

  const [loadingCartToastId, setLoadingCartToastId] = useState(null);
  const [loadingWishlistToastId, setLoadingWishlistToastId] = useState(null);

  const newCart = useSelector((state) => state.user);
  // console.log("newCart is 🛒🛒", newCart);
  const { wishlist, isSuccess, isLoading, isError, cart } = newCart;
  useEffect(() => {
    if (isSuccess && cart && Object.keys(cart).length > 0) {
      showToastSuccess("Item added to cart successfully", loadingCartToastId);
    }
    if (isSuccess && wishlist && Object.keys(wishlist).length > 0) {
      showToastSuccess(
        "Item added to wishlist successfully",
        loadingWishlistToastId
      );
    }
  }, [cart]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getUserCart());
    dispatch(getProducts());
  }, []);

  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const userCartState = useSelector((state) => state.user);
  const { userCart } = userCartState;
  // console.log("userCart is here 😂🤣😂",  userCart);

  // console.log"userCart.items[index].productId._id is  : ", userCart?.items.length);
  useEffect(() => {
    if (userCart && Object.keys(userCart).length > 0) {
      // console.log("id is here 🗝️🗝️🗝️🗝️🗝️",userCart?.items[0]?.productId?._id)

      for (let i = 0; i < userCart?.items?.length; i++) {
        if (getProductId === userCart?.items[i]?.productId?._id) {
          // console.log("userCart.items[index].productId._id is 🗝️🗝️🗝️🗝️🗝️: ",userCart?.items[0]?.productId?._id)
          setAlreadyAdded(true);
        }
      }
    }
  }, [userCart]);

  const uploadCart = (productId, quantity) => {
    if (color === null) {
      showToastError("please choose color!");
    } else {
      const toastId = showToastLoading("Adding to cart...");
      setLoadingCartToastId(toastId);
      dispatch(
        addItemOrUpdateItemQuantity({
          productId: productId,
          quantity: quantity,
        })
      );
      navigate("/cart");
    }
  };

  const productState = useSelector((state) => state?.product);
  const { products, product } = productState;
  console.log("product in Single product is ✌️✌️✌️✌️✌️✌️✌️ : ", product);

  const grid = 2;
  const [copiedText, setCopiedText] = useState(""); // State to hold the text to be copied
  const pRef = useRef(); // Create a ref for the <p> element
  useEffect(() => {
    setCopiedText(pRef.current.textContent);
  }, []);

  const [orderedProduct, setOrderedProduct] = useState(true);
  const loadingImage = "/images/Loading.png";
  const smallImageUrl =
    (product?.mainImages && product.mainImages[0]?.url) || loadingImage;
  const largeImageUrl =
    (product?.mainImages && product.mainImages[0]?.url) || loadingImage;
  const subImageOne =
    (product?.subImages && product.subImages[0]?.url) || loadingImage;
  const subImageTwo =
    (product?.subImages && product.subImages[1]?.url) || loadingImage;
  const subImageThree =
    (product?.subImages && product.subImages[2]?.url) || loadingImage;
  const subImageFour =
    (product?.subImages && product.subImages[3]?.url) || loadingImage;
  const ratings = product?.rating;
  // const ratings = useSelector((state) => state?.product.product?.rating);

  // console.log("ratings in SingleProduct is : 💖 ", ratings);

  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      let data = [];
      for (let index = 0; index < products?.length; index++) {
        const product = products[index];
        if (product?.tags.includes("POPULAR")) {
          data.push(product);
        }
      }
      setPopularProducts(data);
    }
  }, [productState]);

  // console.log("popularProduct in SingleProduct is 😹😹: ", popularProducts);

  const [stars, setstars] = useState(null);
  const [comment, setComment] = useState(null);
  const handleAddReviewsAndRating = (event) => {
    event.preventDefault();
    if (stars === null) {
      alert("Please give rating");
    } else if (comment === null) {
      alert("Please give comment");
    } else {
      const data = {
        productId: getProductId,
        finalData: {
          rating: stars,
          comment: comment,
        },
      };
      dispatch(addReviewsAndRating(data));
    }
  };

  const { reviews } = product;
  // console.log("reviews in SingleProduct is : 😹😹 ", reviews);
  // console.log("stars in SingleProduct is : ", stars);
  // console.log("comment in SingleProduct is : ", comment);

  return (
    <>
      <Meta title={product?.name} />
      <BreadCrumb title={product?.name} />

      <Toast />
      {/* Product Details */}
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
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
                      // src: product?.mainImages[0]?.url,
                      src: smallImageUrl,
                      // src: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1694713300/Croma%20Assets/Communication/Wearable%20Devices/Images/300848_0_hyu5ar.png?tr=w-640",
                    },
                    largeImage: {
                      // src: product?.mainImages[0]?.url,
                      src: largeImageUrl,
                      // src: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1694713300/Croma%20Assets/Communication/Wearable%20Devices/Images/300848_0_hyu5ar.png?tr=w-640",
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
                  // src="https://m.media-amazon.com/images/I/71YdE55GwjL._SX679_.jpg"
                  // src={product?.subImages[0]?.url}
                  src={subImageOne}
                  alt="watch"
                />
              </div>
              {/* 🎀🎀🎀 Image - 2  🎀🎀🎀 */}
              <div>
                <img
                  className="img-fluid"
                  // src="/images/watch.jpg"
                  // src="https://m.media-amazon.com/images/I/71Fh4UiXnUL._SX679_.jpg"
                  src={subImageTwo}
                  alt="watch"
                />
              </div>
              {/* 🎀🎀🎀 Image - 3  🎀🎀🎀 */}
              <div>
                <img
                  className="img-fluid"
                  // src="/images/watch.jpg"
                  // src="https://m.media-amazon.com/images/I/811GOkDSOaL._SX679_.jpg"
                  src={subImageThree}
                  alt="watch"
                />
              </div>
              {/* 🎀🎀🎀 Image - 4  🎀🎀🎀 */}
              <div>
                <img
                  className="img-fluid"
                  // src="/images/watch.jpg"
                  // src="https://m.media-amazon.com/images/I/71Q-4X6lBhL._SX679_.jpg"
                  src={subImageFour}
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
                  {product?.name}
                  {/* Kids headphones Bulk 10 Pack Multi Colored For Students{" "} */}
                </h3>
              </div>
              {/* Price, Ratings and Write a Review */}
              <div className="border-bottom py-3">
                <p className="price">${product?.price}</p>
                <div className="d-flex align-items-center gap-10">
                  {/* {console.log("Product Rating:", product?.rating)} */}

                  {/* <ReactStars
                    count={5}
                    size={24}
                    value={ratings}
                    isHalf={true}
                    edit={false}
                    activeColor="#ffd700"
                  /> */}
                  {ratings !== undefined ? (
                    <ReactStars
                      count={5}
                      size={24}
                      value={ratings}
                      isHalf={true}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  ) : (
                    // You can show a loading indicator or any placeholder while the data is being fetched
                    <p>Loading...</p>
                  )}
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
                  <p className="product-data">{product?.brand}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2 ">
                  <h3 className="product-heading">Category :</h3>
                  <p className="product-data">
                    {product?.category?.name}
                    {/* TODO: */}
                    {/* Airpods, Camera's, Computer and Laptops, mini speaker, our
                    Store, Portable Speakers, smart phones, Smart Television,
                    Smartwatches */}
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2 ">
                  <h3 className="product-heading">Tags :</h3>
                  <p className="product-data">
                    {product?.tags}
                    {/* headphones laptops mobile oppo speaker */}
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2 ">
                  <h3 className="product-heading">SKU :</h3>
                  <p className="product-data">SKU027</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2 ">
                  <h3 className="product-heading">Availability :</h3>
                  <p className="product-data"> {product?.stock} In Stock</p>
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
                  {alreadyAdded === false && (
                    <>
                      <h3 className="product-heading">Color :</h3>
                      <Color
                        color={color}
                        setColor={setColor}
                        colors={product.colors}
                      />
                    </>
                  )}
                </div>
                {/* Quantity Input , ADD TO CART, BUY IT NOW */}
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3 ">
                  {alreadyAdded === false && (
                    <>
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
                          onChange={(event) => setQuantity(event.target.value)}
                        />
                      </div>
                    </>
                  )}
                  <div className="cart-buy d-flex align-items-center gap-30 ms-5">
                    <button
                      className="button border-0"
                      // data-bs-toggle="modal"
                      // data-bs-target="#staticBackdrop"
                      type="button"
                      onClick={() => {
                        alreadyAdded
                          ? navigate("/cart")
                          : uploadCart(product?._id, quantity);
                      }}
                    >
                      {alreadyAdded ? "Go To Cart" : "Add To Cart"}
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
                        seamlessly into your space and provide the perfect size
                        for your needs.
                        {/* <code>.accordion-body</code> */}
                      </div>
                    </div>
                  </div>
                  {/* Care Instruction */}
                  <div className="accordion-item">
                    <h2
                      className="accordion-header"
                      id="panelsStayOpen-headingFour"
                    >
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseFour"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseFour"
                      >
                        <MdOutlineHealthAndSafety className="fs-5 me-2" /> Care
                        Instructions
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseFour"
                      className="accordion-collapse collapse"
                      aria-labelledby="panelsStayOpen-headingFour"
                    >
                      <div className="accordion-body">
                        For longevity, hand wash the product in cold water with
                        mild detergent. Air dry the item for best results,
                        avoiding excessive heat or direct sunlight. Refer to our
                        care instructions for more specific product maintenance
                        tips.
                      </div>
                    </div>
                  </div>
                </div>
                {/* Copy Product Link */}
                <div className="d-flex gap-10 justify-content-between align-items-center my-2 mx-3 ">
                  <h3 className="product-heading">
                    {" "}
                    <AiOutlineLink className="fs-5 me-2" /> Copy Product Link :
                  </h3>
                  <p ref={pRef} className="product-data product-link">
                    {/* https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1694713300/Croma%20Assets/Communication/Wearable%20Devices/Images/300848_0_hyu5ar.png?tr=w-640 */}
                    {window.location.href}
                  </p>
                  <div className="copyIcon">
                    <CopyToClipboard textData={copiedText} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* Description */}
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="description-inner-wrapper">
              <div className="bg-white p-3">
                <p>
                  {product?.description}
                  {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptate placeat, excepturi commodi, amet molestias beatae
                  reprehenderit in maiores adipisci maxime libero, iste
                  praesentium quas. Qui aliquam minima voluptas et expedita?. */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* Reviews */}
      <Container class1="reviews-wrapper   home-wrapper-2">
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
                    <a className="text-dark text-decoration-underline" href="">
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              {/* Review Form Body */}
              <div className="review-form py-4">
                <h4>Write a Review</h4>
                <form
                  action=""
                  className="d-flex flex-column gap-15"
                  onSubmit={(event) => handleAddReviewsAndRating(event)}
                >
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={0}
                      isHalf={true}
                      edit={true}
                      activeColor="#ffd700"
                      onChange={(newRating) => setstars(newRating)}
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
                      onChange={(event) => setComment(event.target.value)}
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="button border-0" type="submit">
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
              {/*   TODO: */}

              {/* Review List */}
              <div className="reviews mt-4">
                {/* 👀👀👀 Review - 1 👀👀👀 */}
                {reviews &&
                  reviews.length > 0 &&
                  reviews.map((review, index) => {
                    return (
                      <div className="review">
                        <div
                          key={index}
                          className="review-head d-flex justify-content-between align-items-center"
                        >
                          <div className="d-flex align-items-center gap-10">
                            <ReactStars
                              count={5}
                              size={24}
                              value={review?.rating}
                              isHalf={true}
                              edit={false}
                              activeColor="#ffd700"
                            />
                            <h6 className="mb-0">
                              {review?.user?.firstname +
                                " " +
                                review?.user?.lastname}
                            </h6>
                          </div>
                          <p className="mb-0">
                            {multiFormatDateString(review?.createdAt)}
                          </p>
                        </div>
                        <div className="review-body">
                          <p>{review?.comment}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* You may also like */}
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">You May Also Like</h3>
          </div>
        </div>
        <div className="row ">
          <ProductCard data={popularProducts} grid={grid} />
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
