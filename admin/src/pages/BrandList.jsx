import React, { useState, useEffect } from "react";
import { Table, Tag } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBrand, getBrands } from "../features/brand/BrandSlice";
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
  },
];

const BrandList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
  }, []);

  // deleting functionality
  const [loadingDeleteToastId, setLoadingDeleteToastId] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteBrandId, setDeleteBrandId] = useState("");
  const showModal = (brandId) => {
    setOpen(true);
    setDeleteBrandId(brandId);
  };
  console.log("brandId in brandList is Id: ", deleteBrandId);
  const hideModal = () => {
    setOpen(false);
  };
  const deleteBrandHelper = (brandId) => {
    const toastId = showToastLoading("Deleting Brand!");
    setLoadingDeleteToastId(toastId);
    console.log("deleteBrand is called");
    dispatch(deleteBrand(brandId));
    setOpen(false);
    // hideModal();
  };

  const newBrand = useSelector((state) => state.brand);
  const { isSuccess, isError, deletedBrand } = newBrand;
  console.log("deletedBrand in BrandList is : ", deletedBrand);

  useEffect(() => {
    if (isSuccess && deletedBrand && Object.keys(deletedBrand).length > 0) {
      showToastSuccess("Brand Deleted Successfully", loadingDeleteToastId);
      dispatch(getBrands());
    } else if (isError) {
      showToastError("Brand Deletion Failed");
    }
  }, [deletedBrand]);

  const brandState = useSelector((state) => state.brand.brands);
  console.log("brandState in brandList is : ", brandState);

  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      brand: brandState[i].name,
      owner: brandState[i].owner,
      action: (
        <>
          <Link to={`/admin/brand/${brandState[i]._id}`}>
            <BiEdit className="fs-5 ms-3 me-5 " />
          </Link>
          <button
            onClick={() => showModal(brandState[i]._id)}
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
      <h3 className="mb-4 title">BrandList</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        title="Are You Sure to Delete This Brand?"
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBrandHelper(deleteBrandId);
        }}
      />
    </div>
  );
};

export default BrandList;
