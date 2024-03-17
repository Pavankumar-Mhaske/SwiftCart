import React, { useEffect } from "react";
import { Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/CustomerSlice";
import male from "../assets/male.jpg";
const columns = [
  {
    title: "S_No",
    dataIndex: "key",
  },
  {
    title: "Name",
    // dataIndex: "name",
    dataIndex: "nameNimage",
    // defaultSortOrder: "descend",
    sorter: (a, b) => a.nameNimage?.name?.length - b.nameNimage?.name?.length,
    render: (nameNimage) => (
      console.log("nameNimage in productlist is : ", nameNimage),
      (
        <div
          className="d-flex align-items-center"
          // style={{ marginLeft: "-40px" }}
        >
          <img
            src={nameNimage?.image}
            className="img-fluid me-2"
            alt="Product Image"
            style={{ width: "80px", height: "80px", borderRadius: "50%" }}
            // style={{ width: "50px", height: "50px" }}
          />
          <p>{nameNimage?.name}</p>
        </div>
      )
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const customerState = useSelector((state) => state.customer.customers);
  console.log("customerState in customer is : 🍌🍌🍌", customerState);

  const data1 = [];
  for (let i = 0; i < customerState.length; i++) {
    if (customerState[i].role === "ADMIN") continue;
    data1.push({
      key: i + 1,
      // name: customerState[i].firstname + " " + customerState[i].lastname,
      nameNimage: {
        name: customerState[i]?.firstname + " " + customerState[i]?.lastname,
        image: male || customerState[i]?.avatar?.url,
      },
      email: customerState[i].email,
      mobile: customerState[i].mobile,
    });
  }

  return (
    <div>
      {" "}
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Customers;
