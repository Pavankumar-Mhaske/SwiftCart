import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getABlog } from "../features/blog/BlogSlice";
import { useLocation, useNavigate } from "react-router-dom";

const SingleBlog = () => {
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[2];
  console.log("getBlogId in SingleBlog is : ", getBlogId);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getABlog(getBlogId));
  }, []);

  const blogState = useSelector((state) => state?.blog);
  const { blog } = blogState;
  console.log("blogState in Single blog is 🔥🔥 : ", blog);

  return (
    <>
      <Meta title={blog?.title} />
      <BreadCrumb title={blog?.title} />

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

          {/* 📄📃📃 Blog Card 📄📃📃  */}
          <div className="col-9">
            <div className="single-blog-card">
              <Link to="/blogs" className="d-flex align-items-center gap-10">
                <HiOutlineArrowLeft className="fs-4" /> Go Back to Blogs
              </Link>
              <h3 className="title">{blog?.title}</h3>
              <img
                className="img-fluid w-100 my-4"
                src={blog?.images ? blog?.images[0]?.url : "/images/blog-1.jpg"}
                alt="Blog"
              />

              <p>{blog?.description}</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
