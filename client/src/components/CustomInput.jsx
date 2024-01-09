import React from "react";

const CustomInput = (props) => {
  const { type, label, i_id, i_class, name, value, onChange, onBlur } = props;
  return (
    <div className="form-group mt-1">
      {/* <label htmlFor="email">Email</label> */}
      <input
        type={type}
        className={` form-control ${i_class}`}
        id={i_id}
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default CustomInput;
