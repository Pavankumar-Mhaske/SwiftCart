import React from "react";
import { Table, Tag } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getColors } from "../features/color/ColorSlice";

const columns = [
  {
    title: "O_No",
    dataIndex: "key",
  },

  {
    title: "Color",
    dataIndex: "color",
    sorter: (a, b) => a.color.length - b.color.length,
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

const ColorList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors());
  }, []);

  const colorState = useSelector((state) => state.color.colors);
  console.log("colorState in colorList is : ", colorState);

  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      color: colorState[i].name,
      owner: colorState[i].owner,
      action: "action",
    });
  }

  return (
    <div>
      {" "}
      <h3 className="mb-4 title">Colors</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ColorList;
