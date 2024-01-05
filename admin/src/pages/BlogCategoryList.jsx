import React from "react";
import { Table, Tag } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBlogCategories } from "../features/blog-category/BlogCategorySlice";

const columns = [
  {
    title: "S_No",
    dataIndex: "key",
  },
  {
    title: "Blog Category",
    dataIndex: "blogCategory",
    sorter: (a, b) => a.blogCategory.length - b.blogCategory.length,
  },
  {
    title: "Owner",
    dataIndex: "owner",
    sorter: (a, b) => a.owner.length - b.owner.length,
    render: (owner) => (
      <>
        <Tag color="blue">{owner}</Tag>
      </>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    render: () => (
      <>
        <Link to="#">
          <BiEdit className="fs-5 me-2 " />
        </Link>
        <Link to="#">
          <MdDelete className="fs-5 text-danger" />
        </Link>
      </>
    ),
  },
];

const BlogCategoryList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogCategories());
  }, []);

  const blogCategoryState = useSelector(
    (state) => state.blogCategory.blogCategories
  );
  console.log("blogCategoryState in blogCategoryList is : ", blogCategoryState);

  const data1 = [];
  for (let i = 0; i < blogCategoryState.length; i++) {
    data1.push({
      key: i + 1,
      blogCategory: blogCategoryState[i].name,
      owner: blogCategoryState[i].owner,
      action: "action",
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Blog Category List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default BlogCategoryList;
