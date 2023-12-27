const colors = [];
colorState.forEach((color, key) => {
  colors.push({
    id: key + 1,
    color: color.name,
  });
});

const initialValues = {
  // some code
  color: colors.length > 0 ? [colors[0]] : [],
  // some code
};

// console.log("initialValues : ", initialValues);
const formik = useFormik({
  initialValues: initialValues,
  // some code
});
console.log("formik.values.color at begining 🌎 : ", formik.values.color);

useEffect(() => {
  formik.values.color = initialValues.color;
  console.log("formik.values.color ❗💥❗💥: ", formik.values.color);
}, []);

``` i am confused, that how can i set the initial value of formik.values.color to initialValues.color at the starting only,
  because when i trying this way .... it is not working, it is not setting the initial value of formik.values.color to initialValues.color at the starting only. moreoveer it's seting to [] empty array.```;
