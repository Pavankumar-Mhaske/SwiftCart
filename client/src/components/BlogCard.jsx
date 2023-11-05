import React from "react";
import { NavLink, Link } from "react-router-dom";
function BlogCard() {
  return (
    <div className="blog-card">
      <div className="card-image">
        <img className="img-fluid  w-100" src="/images/blog-1.jpg" alt="Blog" />
      </div>
      <div className="blog-content">
        <p className="date">1 DEC 2023</p>
        <h5 className="title">A Beautiful Sunday Morning Renaissance</h5>
        <p className="description">
          You're Only As Good As Your Last Collection. Which is An Enomous
          Pressure. I Think there is Something About...
        </p>
        <Link to="/blog/:id" className="button">
          READ MORE
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
