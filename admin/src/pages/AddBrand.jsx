import React from "react";
import CustomInput from "../components/CustomInput";

const AddBrand = () => {
  return (
    <div>
      <h3 className="mb-4">Add Product Category</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Enter Product Category" />
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Product Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
