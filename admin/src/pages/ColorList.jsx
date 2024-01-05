import React, { useState, useEffect } from "react";
import { Table, Tag } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteColor, getColors } from "../features/color/ColorSlice";
import CustomModal from "../components/CustomModal";
import {
  showToastLoading,
  showToastSuccess,
  showToastError,
  Toast,
} from "../utils/HotToastHandler";

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
  },
];

const ColorList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors());
  }, []);

  const [loadingDeleteToastId, setLoadingDeleteToastId] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteColorId, setDeleteColorId] = useState("");
  const showModal = (colorId) => {
    setOpen(true);
    setDeleteColorId(colorId);
  };
  console.log("colorId in colorList is Id: ", deleteColorId);

  const hideModal = () => {
    setOpen(false);
  };
  const deleteColorHelper = (colorId) => {
    const toastId = showToastLoading("Deleting Color!");
    setLoadingDeleteToastId(toastId);
    console.log("deleteColor is called");
    dispatch(deleteColor(colorId));
    setOpen(false);
    // hideModal();
  };

  const newColor = useSelector((state) => state.color);
  const { isSuccess, isError, deletedColor } = newColor;
  console.log("deletedColor in ColorList is : ", deletedColor);

  useEffect(() => {
    if (isSuccess && deletedColor && Object.keys(deletedColor).length > 0) {
      showToastSuccess("Color Deleted Successfully", loadingDeleteToastId);
      dispatch(getColors());
    } else if (isError) {
      showToastError("Color Deletion Failed");
    }
  }, [deletedColor]);
  // 😁😀
  const colorState = useSelector((state) => state.color.colors);
  console.log("colorState in colorList is : ", colorState);

  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      color: colorState[i].name,
      owner: colorState[i].owner,
      action: (
        <>
          <Link to={`/admin/color/${colorState[i]._id}`}>
            <BiEdit className="fs-5 ms-3 me-5 " />
          </Link>
          <button
            onClick={() => showModal(colorState[i]._id)}
            className="bg-transparent border-0"
          >
            <MdDelete className="fs-5 ms-3 me-5 text-danger" />
          </button>
        </>
      ),
    });
  }

  return (
    <div>
      <Toast />
      <h3 className="mb-4 title">Colors</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        title="Are You Sure to Delete This Color?"
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteColorHelper(deleteColorId);
        }}
      />
    </div>
  );
};

export default ColorList;
