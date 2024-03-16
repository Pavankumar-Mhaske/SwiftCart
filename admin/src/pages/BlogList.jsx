import React, { useState, useEffect } from "react";
import { Table, Tag } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBlog, getBlogs } from "../features/blog/BlogSlice";
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
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  // Category
  {
    title: "Category",
    dataIndex: "category",
    // sorter: (a, b) => a.category.length - b.category.length,
    render: (categories) => (
      <>
        <ul className=" categories text-center d-flex flex-column ps-0">
          {categories &&
            categories.map((category, index) => {
              return <li key={index}>{category?.name}</li>;
            })}
        </ul>
      </>
    ),
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
  },
];

const BlogList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  // deleting functionality
  const [loadingDeleteToastId, setLoadingDeleteToastId] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState("");
  const showModal = (blogId) => {
    setOpen(true);
    setDeleteBlogId(blogId);
  };
  console.log("blogId in blogList is Id: ", deleteBlogId);
  const hideModal = () => {
    setOpen(false);
  };
  const deleteBlogHelper = (blogId) => {
    const toastId = showToastLoading("Deleting Blog!");
    setLoadingDeleteToastId(toastId);
    console.log("deleteBlog is called");
    dispatch(deleteBlog(blogId));
    setOpen(false);
    // hideModal();
  };

  const newBlog = useSelector((state) => state.blog);
  const { isSuccess, isError, deletedBlog } = newBlog;
  console.log("deletedBlog in BlogList is : ", deletedBlog);

  useEffect(() => {
    if (isSuccess && deletedBlog && Object.keys(deletedBlog).length > 0) {
      showToastSuccess("Blog Deleted Successfully", loadingDeleteToastId);
      dispatch(getBlogs());
    } else if (isError) {
      showToastError("Blog Deletion Failed");
    }
  }, [deletedBlog]);

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
      action: (
        <>
          <Link to={`/admin/blog/${blogState[i]._id}`}>
            <BiEdit className="fs-5 me-2 " />
          </Link>
          <button
            onClick={() => showModal(blogState[i]._id)}
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
      <h3 className="mb-4 title">Blogs List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        title="Are You Sure to Delete This Blog?"
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlogHelper(deleteBlogId);
        }}
      />
    </div>
  );
};

export default BlogList;
