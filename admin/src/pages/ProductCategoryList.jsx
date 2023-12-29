import React from "react";
import { Table, Tag } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductCategories } from "../features/product-category/ProductCategorySlice";

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

const ProductCategoryList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductCategories());
  }, []);

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
      action: "action",
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">ProductCategoryList</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ProductCategoryList;
