{
  "name": "product-0",
  "description": "<p>2</p>",
  "price": 2,
  "stock": 0,
  // "category": "travel",
  "brand": "LENOVO",
  // "colors": [
      {
          "id": 1,
          "color": "RED"
      },
      {
          "id": 2,
          "color": "GRAY"
      }
  ]
}

{
  "name": "Product 21",
  "description": "<p>fd</p>",
//   "description": "Product description",
  "price": 50,
  "stock": 120,
  // "soldItems": 20,
  "brand": "APPLE",
  "colors": ["653cedcf7d3bc7fc1be0efd5", "653cee117d3bc7fc1be0efdd","653cee827d3bc7fc1be0efe1"]
  ,"tags":["POPULAR", "FEATURED", "TOP_RATED"]
  ,"category":"652b9ce6b8fd6a63e2dcd856"
  
}

{
  "name": "2",
  "description": "<p>2</p>",
  "price": -1,
  "stock": 2,
  "category": "652b9ce6b8fd6a63e2dcd856",
  "brand": "APPLE",
  "colors": [
      "653cedcf7d3bc7fc1be0efd5",
      "653cee117d3bc7fc1be0efdd",
      "653cee827d3bc7fc1be0efe1"
  ]
}


``` during the changes in the ReactQuill i am able to set the value of the formik.values.description 
like - "<p>hello this is new product</p>" but i just want the value of it without tag (<p> </p>) that is only "hello this is new product"
for reference i have provoided the code below

              <ReactQuill
              theme="snow"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange("description")}
            />
          
            ```
