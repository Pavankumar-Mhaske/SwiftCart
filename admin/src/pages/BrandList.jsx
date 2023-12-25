import React from "react";
import { Table, Tag } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { base_url } from "../utils/base_url";
import axios from "axios";
import { Link } from "react-router-dom";
import { getBrands } from "../features/brand/brandSlice";

const columns = [
  {
    title: "S_No",
    dataIndex: "key",
  },
  {
    title: "Brands",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
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

const BrandList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  console.log("brandState in brandList is : ", brandState);

  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      brand: brandState[i].name,
      owner: brandState[i].owner,
      action: "action",
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">BrandList</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default BrandList;
