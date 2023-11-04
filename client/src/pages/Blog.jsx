import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
const Blog = () => {
  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="Blogs" />
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
            {/* 📄📃📃 Blog Cards 📄📃📃  */}
            <div className="col-9">
              <div className="row">
                {/* 🧭🧭 Blog Card - 1 🧭🧭 */}
                <div className="col-6 mb-3">
                  <BlogCard />
                </div>
                {/* 🧭🧭 Blog Card - 2 🧭🧭 */}
                <div className="col-6 mb-3">
                  <BlogCard />
                </div>
                {/* 🧭🧭 Blog Card - 3 🧭🧭 */}
                <div className="col-6 mb-3">
                  <BlogCard />
                </div>
                {/* 🧭🧭 Blog Card - 4 🧭🧭 */}
                <div className="col-6 mb-3">
                  <BlogCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
