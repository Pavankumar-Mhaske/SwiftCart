``` as the code given below... just before the form submit the garbageImageStates array will be filled with the public_id's 
    but just after the form submit the garbageImageStates array will be empty... I don't know why this is happening... ```
const garbageImageStates = [];

const removeImageFromContainer = (publicId) => {
  garbageImageStates.push(publicId);
  console.log(
    "garbageImageStates inside removeImagefunction : ",
    garbageImageStates
  );
  // Filter newImageState without modifying it directly
  setNewImageState((prevImageState) =>
    prevImageState.filter((image) => image.public_id !== publicId)
  );
};

const formik = useFormik({
  // some code
  onSubmit: (values) => {
    // Delete all the images which are in the garbageImageStates array from the cloudinary
    alert(JSON.stringify(values, null, 2));
    console.log("garbageImageStates before: ", garbageImageStates);
    console.log("garbageImageStates after: ", garbageImageStates);
  },
});

<form onSubmit={formik.handleSubmit}>
  {/* ... some code */}
  return (
  <div key={key} className="uploadedImage p-1 col-4 position-relative ">
    <button
      onClick={() => removeImageFromContainer(image.public_id)}
      className="removeImage btn-close position-absolute rounded-circle "
      style={{ top: "10px", right: "10px" }}
      type="button"
    ></button>
    <img src={image.url} alt="Uploaded Image" className="img-fluid border  " />
  </div>
  );
</form>;
