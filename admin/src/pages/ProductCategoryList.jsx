import React, { useState, useEffect } from "react";
import { Table, Tag } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProductCategories,
  deleteProductCategory,
} from "../features/product-category/ProductCategorySlice";
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
    title: "Product Category",
    dataIndex: "productCategory",
    sorter: (a, b) => a.productCategory.length - b.productCategory.length,
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

const ProductCategoryList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductCategories());
  }, []);

  // deleting functionality
  const [loadingDeleteToastId, setLoadingDeleteToastId] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteProductCategoryId, setDeleteProductCategoryId] = useState("");
  const showModal = (productCategoryId) => {
    setOpen(true);
    setDeleteProductCategoryId(productCategoryId);
  };
  console.log(
    "productCategoryId in productCategoryList is Id: ",
    deleteProductCategoryId
  );
  const hideModal = () => {
    setOpen(false);
  };
  const deleteProductCategoryHelper = (productCategoryId) => {
    const toastId = showToastLoading("Deleting ProductCategory!");
    setLoadingDeleteToastId(toastId);
    console.log("deleteProductCategory is called");
    dispatch(deleteProductCategory(productCategoryId));
    setOpen(false);
    // hideModal();
  };

  const newProductCategory = useSelector((state) => state.productCategory);
  const { isSuccess, isError, deletedProductCategory } = newProductCategory;
  console.log(
    "deletedProductCategory in ProductCategoryList is : ",
    deletedProductCategory
  );

  useEffect(() => {
    if (
      isSuccess &&
      deletedProductCategory &&
      Object.keys(deletedProductCategory).length > 0
    ) {
      showToastSuccess(
        "ProductCategory Deleted Successfully",
        loadingDeleteToastId
      );
      dispatch(getProductCategories());
    } else if (isError) {
      showToastError("ProductCategory Deletion Failed");
    }
  }, [deletedProductCategory]);

  const productCategoryState = useSelector(
    (state) => state.productCategory.productCategories
  );
  console.log(
    "productCategoryState in productCategoryList is : ",
    productCategoryState
  );

  const data1 = [];
  for (let i = 0; i < productCategoryState.length; i++) {
    data1.push({
      key: i + 1,
      productCategory: productCategoryState[i].name,
      owner: productCategoryState[i].owner,
      action: (
        <>
          <Link to={`/admin/product-category/${productCategoryState[i]._id}`}>
            <BiEdit className="fs-5 ms-3 me-5 " />
          </Link>
          <button
            onClick={() => showModal(productCategoryState[i]._id)}
            className="bg-transparent border-0"
          >
            <MdDelete className="fs-5 ms-3 me-5 text-0danger" />
          </button>
        </>
      ),
    });
  }

  return (
    <div>
      <Toast />
      <h3 className="mb-4 title">ProductCategoryList</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        title="Are You Sure to Delete This ProductCategory?"
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProductCategoryHelper(deleteProductCategoryId);
        }}
      />
    </div>
  );
};

export default ProductCategoryList;
