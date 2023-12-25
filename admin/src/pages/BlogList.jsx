import React from "react";
import { Table, Tag } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBlogs } from "../features/blog/BlogSlice";

const columns = [
  {
    title: "S_No",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  // Category
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  // numberOfViews
  {
    title: "Views",
    dataIndex: "views",
    sorter: (a, b) => a.views - b.views,
  },
  // likes
  {
    title: "Likes",
    dataIndex: "likes",
    sorter: (a, b) => a.likes - b.likes,
  },
  // dislikes
  {
    title: "Dislikes",
    dataIndex: "dislikes",
    sorter: (a, b) => a.dislikes - b.dislikes,
  },
  // author
  {
    title: "Author",
    dataIndex: "author",
    sorter: (a, b) => a.author.length - b.author.length,
  },
  // Action
  {
    title: "Action",
    dataIndex: "action",
    render: () => (
      <>
        <Link to="#">
          <BiEdit className="fs-5 ms-3 me-5 " />
        </Link>
        <Link to="#">
          <MdDelete className="fs-5 ms-3 me-5 text-danger" />
        </Link>
      </>
    ),
  },
];

const BlogList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  const blogState = useSelector((state) => state.blog.blogs);
  console.log("blogState in blogList is : ", blogState);

  const data1 = [];
  for (let i = 0; i < blogState.length; i++) {
    data1.push({
      key: i + 1,
      title: blogState[i].title,
      category: blogState[i].category,
      views: blogState[i].numberOfViews,
      likes: blogState[i].likes.length,
      dislikes: blogState[i].dislikes.length,
      author: blogState[i].author,
      action: "action",
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Blogs List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default BlogList;
