import React, { useEffect } from "react";
import { Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/CustomerSlice";

const columns = [
  {
    title: "S_No",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.name.length - b.name.length,
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
  console.log("customerState in customer is : ", customerState);

  const data1 = [];
  for (let i = 0; i < customerState.length; i++) {
    if (customerState[i].role === "ADMIN") continue;
    data1.push({
      key: i + 1,
      name: customerState[i].firstname + " " + customerState[i].lastname,
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
