colors: yup
    .array()
    .of(
      yup
        .string()
        .matches(validMongoDBIdRegex, "Invalid MongoDB ID")
        .required("Color ID is required")
    )
    .min(1, "At least one color must be selected") // Adjust the minimum number of selected colors
    .required("Colors are required"),

``` modify this yup validation for the validation of the tags array 
where tags array simply looks like - ['BEST_SELLER', 'SALE', 'CLEARANCE', 'TOP_RATED']

where each tag is a string and the allowed string are from 
export const ProductTagsEnum = {
    HOT: "HOT",
    POPULAR: "POPULAR",
    NEW: "NEW",
    FEATURED: "FEATURED",
    TOP_RATED: "TOP_RATED",
    ... // add more tags here
};

```