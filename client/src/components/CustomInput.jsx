import React from "react";

const CustomInput = (props) => {
  const {
    type,
    label,
    i_id,
    i_class,
    name,
    value,
    onChange,
    onBlur,
    disabled,
  } = props;
  return (
    <div className="form-group mt-1">
      <input
        type={type}
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
    </div>
  );
};

export default CustomInput;
