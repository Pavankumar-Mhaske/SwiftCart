import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OurStore from "./pages/OurStore";
import Blog from "./pages/Blog";
import CompareProduct from "./pages/CompareProduct";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Whatever we pass inside this Router it will be available in the Layout component as a prop called children that is Outlet */}
            <Route index element={<Home />} />
            <Route path="store" element={<OurStore />} />
            <Route path="blogs" element={<Blog />} />
            <Route path="contact" element={<Contact />} />
            <Route path="compare-product" element={<CompareProduct />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
