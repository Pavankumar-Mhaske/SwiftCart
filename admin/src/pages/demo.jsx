useEffect(() => {
    dispatch(getBrands());
    dispatch(getProductCategories());
    dispatch(getColors());
    dispatch(uploadImages());
    dispatch(deleteImages());
    formik.values.color = color;
  }, []);

const imageState = useSelector((state) => state.uploadProductImage.images);

  // extract all the objects from imageState in imageContainer array
  let newImageState = imageState.map((image) => {
    return image.url;
  });

  // function to delete the images on button click
  const removeImageFromContainer = (publicId) => {
    newImageState = newImageState.filter((image) => {
      return image.public_id !== publicId;
    });
    dispatch(deleteImages(publicId));
  };

return 
(
    <div className="showImages d-flex flex-wrap ">
    {newImageState?.map((image, key) => {
      console.log("Image in the imageState : ", image);
      return (
        <div
          key={key}
          className="uploadedImage p-1 col-4 position-relative "
        >
          <button
            onClick={() => removeImageFromContainer(image.public_id)}
            className="removeImage btn-close position-absolute rounded-circle "
            style={{ top: "10px", right: "10px" }}
            type="button"
          ></button>
          <img
            src={image.url}
            alt="Uploaded Image"
            className="img-fluid border  "
          />
        </div>
      );
    })}
  </div>
);