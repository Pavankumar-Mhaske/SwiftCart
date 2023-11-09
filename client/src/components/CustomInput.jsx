import React from "react";

const CustomInput = (props) => {
  const {
    type = "text",
    name = "name",
    placeholder = "Enter your Name",
    classname = "form-control",
  } = props;
  return (
    <div className="form-group mt-1">
      {/* <label htmlFor="email">Email</label> */}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={` form-control ${classname}`}
      />
    </div>
  );
};

export default CustomInput;
