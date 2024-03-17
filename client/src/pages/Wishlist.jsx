import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishList } from "../features/user/UserSlice";
import { addRemoveProductInWishList } from "../features/product/ProductSlice";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserWishList());
  }, []);

  const wishListState = useSelector((state) => state.user.wishlist);
  console.log("wishListState in Wishlist is : ", wishListState);

  const updatedWishlist = useSelector((state) => state.product.wishlist);
  console.log("wishlist in Wishlist is 🔥🔥 : ", updatedWishlist);

  useEffect(() => {
    dispatch(getUserWishList());
  }, [updatedWishlist]);

  const removeProductFromWishList = (productId) => {
    console.log("productId is : ", productId);
    dispatch(addRemoveProductInWishList(productId));
  };

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      {/* ⭐⭐⭐⭐ wishlist-wrapper  ⭐⭐⭐⭐ */}
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {/* 💖💖💖 wishlist-card - 1  💖💖💖 */}
          {wishListState && wishListState?.length === 0 ? (
            <div className="col-12">
              <h1 className="text-center">No Products in Wishlist</h1>
            </div>
          ) : (
            ""
          )}
          {wishListState &&
            wishListState?.map((item, index) => {
              return (
                <div className="col-3 " key={index}>
                  <div className="wishlist-card position-relative mb-3 border">
                    <img
                      onClick={() => removeProductFromWishList(item._id)}
                      src="images/cross.svg"
                      alt="cross"
                      className="position-absolute cross img-fluid"
                    />
                    <div className="wishlist-card-image product-image-container">
                      <img
                        src={
                          item?.mainImages[0]?.url
                            ? item?.mainImages[0]?.url
                            : "images/watch.jpg"
                        }
                        className="img-fluid w-100"
                        alt="watch"
                      />
                    </div>
                    <div className="py-3 px-3 product-card-details">
                      <h5
                        className="title"
                        style={{
                          maxHeight: "3em", // Adjust the height as per your requirement
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        onClick={() => {
                          navigate(`/product/${item?._id}`);
                        }}
                      >
                        {item.name}{" "}
                      </h5>
                      <h6
                        className="price"
                        onClick={() => {
                          navigate(`/product/${item?._id}`);
                        }}
                      >
                        $ {item.price}
                      </h6>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
