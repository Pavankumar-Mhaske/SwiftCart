import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu, Button, theme } from "antd";
// icons
import { AiOutlineDashboard } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { AiOutlineBgColors } from "react-icons/ai";
import { GrCatalogOption } from "react-icons/gr";
import { BsCartCheck } from "react-icons/bs";
import { FaBlogger } from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { BiListPlus } from "react-icons/bi";
import { BiListUl } from "react-icons/bi";
import { FaRegListAlt } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
// images
import person from "../assets/person.jpg";
import male from "../assets/male.jpg";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <h2 className="text-white fs-5 text-center py-4 mb-0">
            <span className="sm-logo">DC</span>
            <span className="lg-logo">Dev Corder</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
              // navigate(`/admin/${key}`);
            }
          }}
          items={[
            {
              key: "",
              // icon: <UserOutlined />,
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              // icon: <UserOutlined />,
              icon: <AiOutlineUser className="fs-4" />,
              label: "Customers",
            },
            {
              key: "catalog",
              // icon: <UserOutlined />,
              icon: <GrCatalogOption className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Add Product",
                },

                {
                  key: "product-list",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand",
                },
                {
                  key: "brand-list",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand List",
                },
                {
                  key: "prodcut-category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Add Product Category",
                },
                {
                  key: "product-category-list",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Product Category List",
                },
                {
                  key: "color",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Color",
                },
                {
                  key: "color-list",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Color List",
                },
              ],
            },
            {
              key: "orders",
              icon: <BsCartCheck className="fs-4" />,
              label: "Orders",
            },
            {
              key: "blogsmenu",
              icon: <FaBlogger className="fs-4" />,
              label: "Blog",
              children: [
                {
                  key: "blog",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <FaRegListAlt className="fs-4" />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <BiListPlus className="fs-4" />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <BiListUl className="fs-4" />,
                  label: "Blog Category List",
                },
              ],
            },
            {
              key: "enquiries",
              // icon: <UserOutlined />,
              icon: <BsChatDots className="fs-4" />,
              label: "Enquiries",
            },
            // {
            //   key: "2",
            //   icon: <VideoCameraOutlined />,
            //   label: "nav 2",
            // },
            // {
            //   key: "3",
            //   icon: <UploadOutlined />,
            //   label: "nav 3",
            // },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{ padding: 0, background: colorBgContainer }}
        >
          {/* 🔘🔘🔘 MenuFold button 🔘🔘🔘*/}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          {/* 👉🏻👉🏻👉🏻 Section at Right Side 👉🏻👉🏻👉🏻*/}
          <div className="d-flex gap-3 align-items-center">
            {/* 🔔🔔🔔 Notificatoins 🔔🔔🔔 */}
            <div className="position-relative">
              {" "}
              <IoIosNotifications className="fs-3" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>
            {/* 👩🏻‍🏫👩🏻‍🏫 Profile Image and Profile Information👩🏻‍🏫👩🏻‍🏫 */}
            <div className="d-flex gap-3 align-items-center dropdown">
              {/* 👨🏻‍⚖️👨🏻‍⚖️👨🏻‍⚖️ Profile Image 👨🏻‍⚖️👨🏻‍⚖️👨🏻‍⚖️ */}
              <div className="profile-image">
                <img
                  width={70}
                  height={70}
                  className="img-fluid"
                  // src="https://img.freepik.com/premium-photo/asian-handsome-man-with-mustache-smiling-laughing-white-background-soft-focus-blurry_33718-815.jpg?w=996"
                  src={male}
                  alt="person"
                />
              </div>
              {/* 📄📄📄 ℹ Person Information ℹ 📄📄📄*/}
              <div
                className=""
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Pavan</h5>
                <p className="mb-0">mhaskepavankumar@gmail.com</p>
              </div>
              {/* 💧💧💧⏬⏬⏬ DropDown List 💧💧💧⏬⏬⏬ */}
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li className="">
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "30px" }}
                    href="#"
                  >
                    View Profile
                  </Link>
                </li>
                <li className="">
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "30px" }}
                    href="#"
                  >
                    Settings
                  </Link>
                </li>
                <li className="">
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "30px" }}
                    href="#"
                  >
                    SignOut
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
