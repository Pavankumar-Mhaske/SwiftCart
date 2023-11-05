import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
const SingleBlog = () => {
  return (
    <>
      <Meta title={"Dynamic Blog Name"} />
      <BreadCrumb title="Dynamic Blog Name" />

      <div className="blog-wrapper home-wrapper-2 py-5  ">
        <div className="container-xxl">
          <div className="row">
            {/* 🍓🍒🍓 Filter-Card 🍓🍒🍓 */}
            <div className="col-3">
              {/* 🍓🍒🍓 Filter-Card -1 🍓🍒🍓 */}
              <div className="filter-card mb-3">
                <h3 className="filter-title">Find by Categories</h3>
                <div>
                  <ul className="ps-0">
                    <li>Watch</li>
                    <li>Tv</li>
                    <li>Camera</li>
                    <li>Laptop</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* 📄📃📃 Blog Card 📄📃📃  */}
            <div className="col-9">
              <div className="single-blog-card">
                <Link to="/blogs" className="d-flex align-items-center gap-10">
                  <HiOutlineArrowLeft className="fs-4" /> Go Back to Blogs
                </Link>
                <h3 className="title">
                  A Beautiful Sunday Morning Renaissance
                </h3>
                <img
                  className="img-fluid w-100 my-4"
                  src="/images/blog-1.jpg"
                  alt="Blog"
                />

                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non
                  animi officiis a quos, deleniti praesentium reprehenderit.
                  Veritatis libero enim, excepturi ratione eveniet voluptatibus
                  velit quo unde asperiores similique animi impedit? Soluta
                  accusamus in cupiditate eveniet totam quaerat nostrum sequi
                  autem animi laudantium, quia tempore similique ullam aut
                  voluptatum dicta? Et voluptate minima cumque magnam harum est
                  necessitatibus autem earum nostrum! Placeat at eaque fugit
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
