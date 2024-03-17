import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFillHandbagFill, BsEye } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addRemoveProductInWishList } from "../features/product/ProductSlice";
const ProductCard = (props) => {
  const { data, grid } = props;
  let location = useLocation();
  const [updatingWishList, setUpdatingWishList] = useState(false);
  // console.log(location);
  // console.log(location.pathname === "/store");
  // console.log(`col-${grid}`);
  // console.log("data in productCard is 🍠🍠🍠🍠🍠🍠 : ", data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addProductToWishList = async (productId) => {
    console.log("productId in addRemoveProductInWishList is : ", productId);
    dispatch(addRemoveProductInWishList(productId));
    console.log(
      "updatingWishList in addRemoveProductInWishList is : 🍠🍠🍠🍠🍠🍠"
    );
    setUpdatingWishList(true);
  };

  const wishListState = useSelector((state) => state.user.wishlist);
  console.log("wishListState in Wishlist is : 😺😺😺😺😺😺", wishListState);

  const updatedWishlist = useSelector((state) => state.product.wishlist);
  console.log("wishlist in Wishlist is 😺😺😺😺😺😺 : ", updatedWishlist);

  useEffect(() => {
    console.log(`😺😺😺😺😺😺
    updatingWishList : ${updatingWishList}
    updatedWishlist : ${updatedWishlist}
    updatedWishlist?.length : ${updatedWishlist?.length}
    `);
    if (
      updatingWishList === true &&
      updatedWishlist &&
      updatedWishlist?.length > 0
    ) {
      navigate("/wishlist");
      setUpdatingWishList(false);
    }
  }, [updatedWishlist?.length]);

  return (
    <>
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className={`${
              location.pathname === "/store" ||
              location.pathname === "/product/:id"
                ? `gr-${grid}`
                : "col-3"
            }`}
          >
            <div
              // to={`${
              //   location.pathname === "/" ? "/product/:id" : "/product/:id"
              // }`}
              className="product-card position-relative mb-3"
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
              {/* <div className="product-section"> */}
              <div className="product-image product-image-container">
                <img
                  className="img-fluid"
                  src={item?.mainImages[0]?.url} //😀
                  // src="/images/watch1.jpeg" //😀
                  alt="Product Image"
                />
                <img
                  className="img-fluid"
                  src={item?.mainImages[1]?.url}
                  // src="/images/watch2.jpeg"
                  alt="Product Image"
                />
              </div>
              <div className="product-details">
                <h6 className="brand">{item.brand}</h6>
                <h5
                  className="product-title"
                  style={{
                    maxHeight: "3em", // Adjust the height as per your requirement
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {/* {item?.name} */}
                  {item?.name && item?.name?.length > 70
                    ? item?.name?.substring(0, 60) + "..."
                    : item?.name}
                </h5>
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
                    grid === 12 ? `d-block` : `d-none`
                  }`}
                >
                  {/* dangerouslySetInnerHTML={{ __html: item?.description }} */}
                  {/* {item?.description} */}
                  {item?.description && item?.description?.length > 70
                    ? item?.description?.substring(0, 80) + "..."
                    : item?.description}
                </p>

                <p className="price">${item.price}</p>
              </div>
              {/* </div> */}
              {/* More Options */}
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <button className="border-0 bg-transparent">
                    <img src="/images/prodcompare.svg" alt="Compare Products" />
                    {/* <BsFillHandbagFill /> */}
                  </button>
                  <button
                    className="border-0 bg-transparent"
                    onClick={() => {
                      navigate(`/product/${item?._id}`);
                    }}
                  >
                    <img src="/images/view.svg" alt="AddCart" />
                    {/* <BsEye /> */}
                  </button>
                  <button className="border-0 bg-transparent">
                    <img src="/images/add-cart.svg" alt="AddCart" />
                    {/* <BsFillHandbagFill /> */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
