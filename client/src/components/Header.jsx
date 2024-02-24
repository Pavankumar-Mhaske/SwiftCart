import React from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../features/user/userSlice";
// import {compare.svg} from "../../public/images/compare.svg";
const Header = () => {
  const dispatch = useDispatch();
  let totalItemsInCart = 0;

  const userCartState = useSelector((state) => state.user);
  const { isSuccess, isLoading, isError, userCart, cart } = userCartState;
  const { items } = userCart;
  const authState = useSelector((state) => state.auth);
  const { user } = authState;
  // console.log("user in Header is 🛒 🎧🤕🤕 : ", user);
  // console.log("userCart in Header is 🛒 🎧🤕🤕 : ", userCart);

  const subTotal = userCart?.discountedCartPrice
    ? userCart?.discountedCartPrice
    : 0;

  userCart &&
    items &&
    items.map((item) => {
      totalItemsInCart += item.quantity;
    });

  useEffect(() => {
    dispatch(getUserCart());
  }, [userCart?.discountedCartPrice, cart]);

  // console.log("totalItemsInCart in Header is 🛒 🎧🤕🤕 : ", totalItemsInCart);
  // console.log("userCart in Header is 🛒 🎧🤕🤕 : ", userCart);
  // console.log("cart in Header is 🛒 🎧🤕🤕 : ", cart);
  return (
    <>
      {/* 1️⃣1️⃣1️⃣ Header - 1 1️⃣1️⃣1️⃣ */}
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:{" "}
                <a className="text-white" href="tel:+91 8530470684">
                  +91 8530470684
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 2️⃣2️⃣2️⃣ Header - 2 2️⃣2️⃣2️⃣ */}
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link className="text-white">DevCorner</Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                {/*🕗🕗🕜🕜  Compare Product 🕗🕗🕜🕜 */}
                <div>
                  <Link
                    to="/compare-product"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    {/* files in the public directory are served at the root path.
                        Instead of /public/images/compare.svg, use /images/compare.svg. */}
                    <img src="/images/compare.svg" alt="compare" />
                    <p className="mb-0">
                      Compare <br /> Products
                    </p>
                  </Link>
                </div>
                {/*🕗🕗🕜🕜  Favourite Wishlist 🕗🕗🕜🕜 */}
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="/images/wishlist.svg" alt="wishlist" />
                    <p className="mb-0">
                      Favourite <br /> Wishlist
                    </p>
                  </Link>
                </div>
                {/*🕗🕗🕜🕜  Login My Account 🕗🕗🕜🕜 */}
                <div>
                  <Link
                    to={user === null ? "/login" : "/profile"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="/images/user.svg" alt="user" />

                    {user === null ? (
                      <p className="mb-0">
                        Login <br /> My Account
                      </p>
                    ) : (
                      <p className="mb-0 ">
                        Welcome{" "}
                        <span className="user-details">
                          {" "}
                          &#x1F496;
                          {user?.firstname + " " + user?.lastname}
                        </span>
                      </p>
                    )}
                  </Link>
                </div>
                {/*🕗🕗🕜🕜  Cart 🕗🕗🕜🕜 */}
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="/images/cart.svg" alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">
                        {totalItemsInCart ? totalItemsInCart : 0}
                      </span>
                      <p className="mb-0">${subTotal}.00</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3️⃣3️⃣3️⃣ Header - 3 3️⃣3️⃣3️⃣ */}
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                {/*🔗🔗🔗🔗 dropdown list 🔗🔗🔗🔗 */}
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15  d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src="/images/menu.svg" alt="" />
                      <span className="me-5 d-inline-block">
                        Shop Categories
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/*🏡🏠🛒📜💁🏻‍♂️📞 sections 🏡🏠🛒📜💁🏻‍♂️📞  */}
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/store">Our Store</NavLink>
                    <NavLink to="/orders">My Orders</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
