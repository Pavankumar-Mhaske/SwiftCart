import React, { useState, useEffect } from "react";
import { Table, Tag } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteBlogCategory,
  getBlogCategories,
} from "../features/blog-category/BlogCategorySlice";
import CustomModal from "../components/CustomModal";
import {
  showToastLoading,
  showToastSuccess,
  showToastError,
  Toast,
} from "../utils/HotToastHandler";

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
  },
];

const BlogCategoryList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogCategories());
  }, []);

  // deleting functionality
  const [loadingDeleteToastId, setLoadingDeleteToastId] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteBlogCategoryId, setDeleteBlogCategoryId] = useState("");
  const showModal = (blogCategoryId) => {
    setOpen(true);
    setDeleteBlogCategoryId(blogCategoryId);
  };
  console.log(
    "blogCategoryId in blogCategoryList is Id: ",
    deleteBlogCategoryId
  );
  const hideModal = () => {
    setOpen(false);
  };
  const deleteBlogCategoryHelper = (blogCategoryId) => {
    const toastId = showToastLoading("Deleting BlogCategory!");
    setLoadingDeleteToastId(toastId);
    console.log("deleteBlogCategory is called");
    dispatch(deleteBlogCategory(blogCategoryId));
    setOpen(false);
    // hideModal();
  };

  const newBlogCategory = useSelector((state) => state.blogCategory);
  const { isSuccess, isError, deletedBlogCategory } = newBlogCategory;
  console.log(
    "deletedBlogCategory in BlogCategoryList is : ",
    deletedBlogCategory
  );

  useEffect(() => {
    if (
      isSuccess &&
      deletedBlogCategory &&
      Object.keys(deletedBlogCategory).length > 0
    ) {
      showToastSuccess(
        "BlogCategory Deleted Successfully",
        loadingDeleteToastId
      );
      dispatch(getBlogCategories());
    } else if (isError) {
      showToastError("BlogCategory Deletion Failed");
    }
  }, [deletedBlogCategory]);

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
      action: (
        <>
          <Link to={`/admin/blog-category/${blogCategoryState[i]._id}`}>
            <BiEdit className="fs-5 me-2 " />
          </Link>
          <button
            onClick={() => showModal(blogCategoryState[i]._id)}
            className="bg-transparent border-0"
          >
            <MdDelete className="fs-5  text-danger" />
          </button>
        </>
      ),
    });
  }

  return (
    <div>
      <Toast />
      <h3 className="mb-4 title">Blog Category List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        title="Are You Sure to Delete This BlogCategory?"
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlogCategoryHelper(deleteBlogCategoryId);
        }}
      />
    </div>
  );
};

export default BlogCategoryList;
