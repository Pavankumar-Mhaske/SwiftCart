import React from "react";
import { Table, Tag } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { base_url } from "../utils/base_url";
import axios from "axios";
import { Link } from "react-router-dom";
import { getProducts } from "../features/product/ProductSlice";

// const getColorById = async (colorId) => {
//   const url = `${base_url}colors/${colorId}`;
//   const response = await axios.get(url);
//   console.log("Response in productService is : ", response.data.data.name);
//   return response.data.data.name;
// };

const columns = [
  {
    title: "S_No",
    dataIndex: "key",
  },
  // {
  //   title: "Name",
  //   dataIndex: "name",
  //   // defaultSortOrder: "descend",
  //   // sorter: (a, b) => a.name.length - b.name.length,
  // },
  {
    title: "Name",
    dataIndex: "nameNimage",
    // defaultSortOrder: "descend",
    // sorter: (a, b) => a.name.length - b.name.length,
    render: (nameNimage) => (
      console.log("nameNimage in productlist is 🍌🍌🍌 : ", nameNimage),
      (
        <div
          className="d-flex align-items-center"
          style={{ marginLeft: "-40px" }}
        >
          <img
            src={nameNimage?.image}
            className="img-fluid me-2"
            alt="Product Image"
            style={{ width: "100px" }}
            // style={{ width: "50px", height: "50px" }}
          />
          <p>{nameNimage?.name}</p>
        </div>
      )
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    // defaultSortOrder: "descend",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Color",
    dataIndex: "color",
    render: (colors) => (
      <div className="colors_column">
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
                ></li>
              );
            })}
        </ul>
      </div>
    ),
  },
  {
    title: "Ratings",
    dataIndex: "ratings",
    sorter: (a, b) => a.ratings - b.ratings,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (stock) => (
      <>
        {stock > 0 ? (
          <Tag color="green">{`InStock`}</Tag>
        ) : (
          <Tag color="red">{`OutOfStock`}</Tag>
        )}
      </>
    ),
  },
  {
    title: "Stock",
    dataIndex: "stock",
  },
  {
    title: "Sold Items",
    dataIndex: "soldItems",
    sorter: (a, b) => a.soldItems - b.soldItems,
  },
  {
    title: "Category",
    dataIndex: "category",
    render: (categories) => (
      <>
        <ul className=" categories text-center d-flex flex-column ps-0">
          {categories &&
            categories.map((category, index) => {
              return <li key={index}>{category?.name}</li>;
            })}
        </ul>
      </>
    ),
  },

  {
    title: "Action",
    dataIndex: "action",
    render: () => (
      <div style={{ width: "50px" }}>
        <Link to="#">
          <BiEdit className="fs-5 me-2 " />
        </Link>
        <Link to="#">
          <MdDelete className="fs-5 text-danger" />
        </Link>
      </div>
    ),
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state.product.products);
  console.log("productState in product is 💗💗 : ", productState);

  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      nameNimage: {
        name: productState[i].name,
        image: productState[i].mainImages[0]?.url,
      },
      price: productState[i].price,
      brand: productState[i].brand,
      color: productState[i].colors,
      ratings: productState[i].rating,
      status: productState[i].stock,
      stock: productState[i].stock,
      soldItems: productState[i].soldItems,
      category: productState[i].category,
      action: "action",
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">ProductList</h3>
      <div className="max-width-table">
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ProductList;
