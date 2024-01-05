import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import BlogList from "./pages/BlogList";
import BlogCategoryList from "./pages/BlogCategoryList";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import ColorList from "./pages/ColorList";
import ProductCategoryList from "./pages/ProductCategoryList";
import BrandList from "./pages/BrandList";
import ProductList from "./pages/ProductList";
import AddBlog from "./pages/AddBlog";
import AddBlogCategory from "./pages/AddBlogCategory";
import AddColor from "./pages/AddColor";
import AddProductCategory from "./pages/AddProductCategory";
import AddBrand from "./pages/AddBrand";
import AddProduct from "./pages/AddProduct";
import AddCoupon from "./pages/AddCoupon";
import CouponList from "./pages/CouponList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="blog" element={<AddBlog />} />
          <Route path="blog-list" element={<BlogList />} />
          <Route path="coupon" element={<AddCoupon />} />
          <Route path="coupon-list" element={<CouponList />} />
          <Route path="blog-category" element={<AddBlogCategory />} />
          <Route path="blog-category/:id" element={<AddBlogCategory />} />
          <Route path="blog-category-list" element={<BlogCategoryList />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="product" element={<AddProduct />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="brand" element={<AddBrand />} />
          <Route path="brand/:id" element={<AddBrand />} />
          <Route path="brand-list" element={<BrandList />} />
          <Route path="product-category" element={<AddProductCategory />} />
          <Route path="product-category/:id" element={<AddProductCategory />} />
          <Route path="product-category-list" element={<ProductCategoryList />} />
          <Route path="color" element={<AddColor />} />
          <Route path="color/:id" element={<AddColor />} />
          <Route path="color-list" element={<ColorList />} />
        </Route>

        {/* <Route path="*" element={<h1>Not Found</h1>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
