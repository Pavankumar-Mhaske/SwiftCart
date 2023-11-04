import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";

const OurStore = () => {
  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />

      <div className="store-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              {/* 🍓🍒🍓 Filter-Card -1 🍓🍒🍓 */}
              <div className="filter-card mb-3">
                <h3 className="filter-title">Shop by Categories</h3>
                <div>
                  <ul className="ps-0">
                    <li>Watch</li>
                    <li>Tv</li>
                    <li>Camera</li>
                    <li>Laptop</li>
                  </ul>
                </div>
              </div>

              {/* 🍓🍒🍓 Filter-Card -2 🍓🍒🍓 */}
              <div className="filter-card mb-3">
                <h3 className="filter-title">Filter By </h3>
                <div>
                  {/* Availability 🥑🥑🥑🥑🥑🥑🥑🥑🥑🥑 */}
                  <h5 className="sub-title ">Availability</h5>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id=""
                      />
                      <label className="form-check-label" htmlFor="">
                        In Stock (3)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id=""
                      />
                      <label className="form-check-label" htmlFor="">
                        Out of Stock (0)
                      </label>
                    </div>
                  </div>

                  {/* Price 💲💲💲💲💲💲💲💲 💸💸💸💸💸💸💸 */}
                  <h5 className="sub-title ">Price</h5>
                  <div className="d-flex align-items-center gap-10">
                    {/* 🥧🥧 First Input 🥧🥧 */}
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="From"
                      />
                      <label htmlFor="floatingInput1">From</label>
                    </div>
                    {/* 🥧🥧 Second Input 🥧🥧 */}
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="floatingInput1"
                        placeholder="To"
                      />
                      <label htmlFor="floatingInput1">To</label>
                    </div>
                  </div>

                  {/* Colors 🔴🟥 🟡🟨 🟠🟧 ⚪⬜ 🔵🟦 🟢🟩  */}
                  <h5 className="sub-title ">Colors</h5>
                  <div>
                    <ul className="colors ps-0">
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>

                  {/* Size 🐁 -> 🐘 */}
                  <h5 className="sub-title ">Size</h5>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="color-1"
                      />
                      <label className="form-check-label" htmlFor="color-1">
                        S (2)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="color-2"
                      />
                      <label className="form-check-label" htmlFor="color-2">
                        M (2)
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* 🍓🍒🍓 Filter-Card -3 🍓🍒🍓 */}
              <div className="filter-card mb-3">
                <h3 className="filter-title">Product Tags</h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-items-center gap-10 ">
                    <span className="badge bg-light text-secondary  rounded-3 py-2 px-3 ">
                      Headphone
                    </span>
                    <span className="badge bg-light text-secondary  rounded-3 py-2 px-3 ">
                      Laptop
                    </span>
                    <span className="badge bg-light text-secondary  rounded-3 py-2 px-3 ">
                      Mobile
                    </span>
                    <span className="badge bg-light text-secondary  rounded-3 py-2 px-3 ">
                      Wire
                    </span>
                  </div>
                </div>
              </div>

              {/* 🍓🍒🍓 Filter-Card -4 🍓🍒🍓 */}
              <div className="filter-card mb-3">
                <h3 className="filter-title">Random Product</h3>
                <div>
                  <div className="random-products mb-3 d-flex">
                    <div className="w-50">
                      <img
                        className="img-fluid"
                        src="/images/watch.jpg"
                        alt="Watch"
                      />
                    </div>
                    <div className="w-50">
                      <h5>
                        Kids headphons bulk 10 packs multi colored for students
                      </h5>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        isHalf={true}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <b> $ 300</b>
                    </div>
                  </div>
                  <div className="random-products d-flex">
                    <div className="w-50">
                      <img
                        className="img-fluid"
                        src="/images/watch.jpg"
                        alt="Watch"
                      />
                    </div>
                    <div className="w-50">
                      <h5>
                        Kids headphons bulk 10 packs multi colored for students
                      </h5>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        isHalf={true}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <b> $ 300</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="filter-sort-grid">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0">Sort By</p>
                  <select name="" className="form-control form-select" id="">
                    <option value="manual">Featured</option>
                    <option value="best-selling" selected="selected">
                      Best Selling
                    </option>
                    <option value="title-ascending">Alphabetically, A-Z</option>
                    <option value="title-descending">
                      Alphabetically, Z-A
                    </option>
                    <option value="price-ascending">Price, low to high</option>
                    <option value="price-descending">Price, high to low</option>
                    <option value="created-ascending">Date, old to new</option>
                    <option value="created-descending">Date, new to old</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStore;
