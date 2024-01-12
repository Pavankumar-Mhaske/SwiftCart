import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../features/blog/BlogSlice";

const Blog = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  const blogState = useSelector((state) => state?.blog?.blogs);
  console.log("blogState in blog is 🔥🔥 : ", blogState);

  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="Blogs" />
      <Container class1="blog-wrapper home-wrapper-2 py-5  ">
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
              {blogState.map((item, index) => {
                {
                  /* 🧭🧭 Blog Card - 1 🧭🧭 */
                }
                return (
                  <div className="col-6 mb-3" key={index}>
                    <BlogCard
                      id={item._id}
                      title={item.title}
                      description={item.description}
                      image={item.images[0].url}
                    />
                  </div>
                );
              })}

              {/* <div className="col-6 mb-3">
                <BlogCard />
              </div>
              <div className="col-6 mb-3">
                <BlogCard />
              </div>
              <div className="col-6 mb-3">
                <BlogCard />
              </div>  */}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Blog;
