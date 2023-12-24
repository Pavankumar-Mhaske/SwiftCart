import React from "react";
import { Table, Tag } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { base_url } from "../utils/base_url";
import axios from "axios";

const getColorById = async (colorId) => {
  const url = `${base_url}colors/${colorId}`;
  const response = await axios.get(url);
  console.log("Response in productService is : ", response.data.data.name);
  return response.data.data.name;
};

const columns = [
  {
    title: "S_No",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Color",
    dataIndex: "color",
    render: (color) => (
      <>
        {color.map((color, index) => {
          return (
            <Tag key={index} color="blue">
              {color}
            </Tag>
          );
        })}
      </>
    ),
  },

  {
    title: "Ratings",
    dataIndex: "ratings",
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
  },
  {
    title: "Category",
    dataIndex: "category",
  },

  {
    title: "Action",
    dataIndex: "action",
    render: () => (
      <>
        <BiEdit className="me-3" />
        <MdDelete />
      </>
    ),
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state.product.products);
  console.log("productState in product is : ", productState);

  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      name: productState[i].name,
      price: productState[i].price,
      brand: productState[i].brand,
      color: productState[i].colors,
      ratings: productState[i].rating,
      status: productState[i].stock,
      stock: productState[i].stock,
      soldItems: productState[i].soldItems,
      // category: productState[i].category,
      category: "abc",
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">ProductList</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ProductList;
