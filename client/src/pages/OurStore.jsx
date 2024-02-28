import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/ProductSlice";

const OurStore = () => {
  const [grid, setGrid] = useState(4);

  const productState = useSelector((state) => state.product);
  const { products } = productState;
  console.log("products in OurStore is : ", products);

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [colors, setColors] = useState([]);

  // Filter States
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [tag, setTag] = useState([]);
  const [color, setColor] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);

  const resetAllFilters = () => {
    setBrand([]);
    setCategory([]);
    setTag([]);
    setColor([]);
    setMinPrice(null);
    setMaxPrice(null);
    setSort(null);
  };

  useEffect(() => {
    let brands = [];
    let categories = [];
    let tags = [];
    let colors = [];
    if (products && products.length > 0) {
      for (let index = 0; index < products?.length; index++) {
        const product = products[index];
        brands.push(product?.brand);

        if (product.category && product.category.length > 0) {
          for (let i = 0; i < product.category.length; i++) {
            categories.push(product.category[i]?.name);
          }
        }

        if (product.tags && product.tags.length > 0) {
          for (let i = 0; i < product.tags.length; i++) {
            tags.push(product.tags[i]);
          }
        }

        if (product.colors && product.colors.length > 0) {
          for (let i = 0; i < product.colors.length; i++) {
            colors.push(product.colors[i]?.name);
          }
        }
      }
    }
    setBrands(brands);
    setCategories(categories);
    setTags(tags);
    setColors(colors);
  }, [products]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getProducts({ sort, tag, brand, category, color, minPrice, maxPrice })
    );
  }, [sort, tag, brand, category, color, minPrice, maxPrice]);

  console.log("brands in OurStore is : ", [...new Set(brands)]);
  console.log("categories in OurStore is : ", [...new Set(categories)]);
  console.log("tags in OurStore is : ", [...new Set(tags)]);
  console.log("colors in OurStore is : ", [...new Set(colors)]);
  console.log("brand in OurStore is : ", brand);
  console.log("category in OurStore is : ", category);
  console.log("tag in OurStore is : ", tag);
  console.log("color in OurStore is : ", color);
  console.log("minPrice in OurStore is : ", minPrice);
  console.log("maxPrice in OurStore is : ", maxPrice);
  console.log("sort in OurStore is : ", sort);

  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />

      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            {/* 🍓🍒🍓 Clear all filters 🍓🍒🍓 */}
            <div className="mb-3 d-flex flex-column justify-content-center align-items-center">
              <button className="button" onClick={resetAllFilters}>{`${
                sort ||
                tag.length ||
                brand.length ||
                category.length ||
                color.length ||
                minPrice ||
                maxPrice
                  ? "Clear Filters"
                  : "No Filters Applied"
              } `}</button>
            </div>
            {/* 🍓🍒🍓 Filter-Card -1 (Categories) 🍓🍒🍓 */}
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop by Categories</h3>
              <div>
                <ul className="ps-0">
                  {categories &&
                    [...new Set(categories)].map((category, index) => {
                      return (
                        <li key={index} onClick={() => setCategory(category)}>
                          {category}
                        </li>
                      );
                    })}
                  {/* <li>Watch</li>
                  <li>Tv</li>
                  <li>Camera</li>
                  <li>Laptop</li> */}
                </ul>
              </div>
            </div>

            {/* 🍓🍒🍓 Filter-Card -2 (Brands)🍓🍒🍓 */}
            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Brands</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10 ">
                  {brands &&
                    [...new Set(brands)].map((brand, index) => {
                      return (
                        <span
                          className="badge bg-light text-secondary  rounded-3 py-2 px-3"
                          style={{ cursor: "pointer" }}
                          key={index}
                          onClick={() => setBrand(brand)}
                        >
                          {brand}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* 🍓🍒🍓 Filter-Card -3 (Price, Color)🍓🍒🍓 */}
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By </h3>
              <div>
                {/* Availability 🥑🥑🥑🥑🥑🥑🥑🥑🥑🥑 */}
                {/* <h5 className="sub-title ">Availability</h5>
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
                </div> */}

                {/* Price 💲💲💲💲💲💲💲💲 💸💸💸💸💸💸💸 */}
                <h5 className="sub-title ">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  {/* 🥧🥧 First Input 🥧🥧 */}
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput1">From</label>
                  </div>
                  {/* 🥧🥧 Second Input 🥧🥧 */}
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>

                {/* Colors 🔴🟥 🟡🟨 🟠🟧 ⚪⬜ 🔵🟦 🟢🟩  */}
                <div style={{ marginTop: "40px" }}>
                  <h3 className="sub-title">Color :</h3>
                  <div>
                    <ul className="colors ps-0 ">
                      {colors &&
                        [...new Set(colors)].map((color, index) => {
                          return (
                            <li
                              key={index}
                              style={{
                                backgroundColor: color,
                                cursor: "pointer",
                              }}
                              onClick={() => setColor(color)}
                            ></li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 🍓🍒🍓 Filter-Card -4 (Tags) 🍓🍒🍓 */}
              <div style={{ marginTop: "50px" }}>
                <h3 className="sub-title">Product Tags</h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-items-center gap-10 ">
                    {brands &&
                      [...new Set(tags)].map((tag, index) => {
                        return (
                          <span
                            className="badge bg-light text-secondary  rounded-3 py-2 px-3"
                            style={{ cursor: "pointer" }}
                            key={index}
                            onClick={() => setTag(tag)}
                          >
                            {tag}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            {/* 🍓🍒🍓 Filter-Card -5 🍓🍒🍓 */}
            {/* <div className="filter-card mb-3">
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
            </div> */}
          </div>
          {/* 🍓🍒🍓 Products sections 🍓🍒🍓 */}
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                {/*🍎🍎 Left section of the top pannel🍎🍎  */}
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block" style={{ width: "100px" }}>
                    Sort By:
                  </p>
                  <select
                    name=""
                    className="form-control form-select"
                    id=""
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Select Filter Option
                    </option>
                    <option value="name">Alphabetically, A-Z</option>
                    <option value="-name">Alphabetically, Z-A</option>
                    <option value="price">Price, low to high</option>
                    <option value="-price">Price, high to low</option>
                    <option value="createdAt">Date, old to new</option>
                    <option value="-createdAt">Date, new to old</option>
                  </select>
                </div>
                {/*🍎🍎 Right section of the top pannel🍎🍎  */}
                <div className="d-flex align-items-center gap-10 ">
                  <p className="totalproducts mb-0">21 Products</p>
                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      className=" d-block img-fluid"
                      src="images/gr4.svg"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(4);
                      }}
                      className=" d-block img-fluid"
                      src="images/gr3.svg"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(6);
                      }}
                      className=" d-block img-fluid"
                      src="images/gr2.svg"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      className=" d-block img-fluid"
                      src="images/gr.svg"
                      alt="grid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                <ProductCard data={products} grid={grid} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
