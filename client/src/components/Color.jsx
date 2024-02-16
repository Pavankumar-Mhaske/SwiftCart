import React from "react";

const Color = (props) => {
  console.log("props in Color is : ", props);
  const { color, setColor, colors } = props;
  return (
    <>
      <ul className="colors ps-0">
        {colors &&
          colors.map((color, index) => {
            return (
              <li
                key={index}
                style={{
                  backgroundColor: color?.name,
                  cursor: "pointer",
                }}
                onClick={() => setColor(color?._id)}
              ></li>
            );
          })}
      </ul>
    </>
  );
};

export default Color;
