import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../features/blog/BlogSlice";
import moment from "moment";
const Blog = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);

  // Filter States
  const [category, setCategory] = useState([]);

  const blogState = useSelector((state) => state?.blog?.blogs);
  // console.log("blogState in blog is 🔥🔥 : ", blogState);

  const resetAllFilters = () => {
    setCategory([]);
  };

  console.log("categories in blog is : 💖", categories);
  console.log("category in OurStore is : 💖", category);

  useEffect(() => {
    dispatch(getBlogs({ category }));
  }, [category]);

  useEffect(() => {
    let blogCategories = [];
    if (blogState && blogState?.length > 0) {
      for (let index = 0; index < blogState.length; index++) {
        const blog = blogState[index];
        if (blog.category && blog.category.length > 0) {
          for (let i = 0; i < blog.category.length; i++) {
            blogCategories.push(blog.category[i]?.name);
          }
        }
      }
      setCategories(blogCategories);
    }
  }, [blogState]);

  console.log("categories in Blog is : ", [...new Set(categories)]);

  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="Blogs" />
      <Container class1="blog-wrapper home-wrapper-2 py-5  ">
        <div className="row">
          {/* 🍓🍒🍓 Filter-Card 🍓🍒🍓 */}
          <div className="col-3">
            <div className="mb-3 d-flex flex-column justify-content-center align-items-center">
              <button className="button" onClick={resetAllFilters}>{`${
                category.length ? "Clear Filters" : "No Filters Applied"
              } `}</button>
            </div>
            {/* 🍓🍒🍓 Filter-Card -1 🍓🍒🍓 */}
            <div className="filter-card mb-3">
              <h3 className="filter-title">Find by Categories</h3>
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
                </ul>
              </div>
              {/* <div>
                <ul className="ps-0">
                  <li>Watch</li>
                  <li>Tv</li>
                  <li>Camera</li>
                  <li>Laptop</li>
                </ul>
              </div> */}
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
                      id={item?._id}
                      title={item?.title}
                      description={item?.description}
                      image={item?.images[0]?.url}
                      date={moment(item?.createdAt).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Blog;
