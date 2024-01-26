import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFillHandbagFill, BsEye } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addRemoveProductInWishList } from "../features/product/ProductSlice";
const ProductCard = (props) => {
  const { data, grid } = props;
  let location = useLocation();
  // console.log(location);
  // console.log(location.pathname === "/store");
  // console.log(`col-${grid}`);
  // console.log("data in productCard is 🍠🍠🍠🍠🍠🍠 : ", data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addProductToWishList = async (productId) => {
    console.log("productId in addRemoveProductInWishList is : ", productId);
    dispatch(addRemoveProductInWishList(productId));
  };

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
                    grid === 12 ? `d-block` : `d-none`
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
