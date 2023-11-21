import React, { useRef, useState } from "react";
import CustomInput from "../components/CustomInput";
import RichTextEditor from "react-rte";

const AddBlog = () => {
  const [description, setDescription] = useState(
    RichTextEditor.createEmptyValue()
  );
  // Use useRef for the "leaf" ref
//   const leafRef = useRef(null);

  const handleDescription = (value) => {
    setDescription(value);
    console.log(value);
  };
  return (
    <div>
      <h3 className="mb-4">Add Blog</h3>
      <div stylename="">
        <form action="">
          <CustomInput type="text" label="Enter Blog title" />
          <select name="" id="">
            <option value="">Select Blog Category</option>
          </select>
          <RichTextEditor
            value={description}
            onChange={(event) => {
              handleDescription(event.target.value);
            }}
            // Attach the ref to the "leaf" element (if required by the component)
            // leafRef={leafRef}
          />
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
