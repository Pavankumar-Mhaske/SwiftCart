import React from "react";
import { NavLink, Link } from "react-router-dom";
const BlogCard = (props) => {
  const { id, title, description, image, date } = props;

  // function convertDate(inputDate) {
  //   // Create a new Date object from the input date string
  //   const inputDateTime = new Date(inputDate);

  //   // Get the day, month, and year from the Date object
  //   const day = inputDateTime.getUTCDate();
  //   const month = inputDateTime
  //     .toLocaleString("default", { month: "short" })
  //     .toUpperCase();
  //   const year = inputDateTime.getUTCFullYear();

  //   // Format the date in the desired output format
  //   const outputDate = `${day}-${month}-${year}`;

  //   return outputDate;
  // }

  // const formattedDate = convertDate(date);

  return (
    <div className="blog-card">
      <div className="card-image">
        <img className="img-fluid  w-100" src={image} alt="Blog" />
      </div>
      <div className="blog-content">
        <p className="date">{date}</p>
        <h5 className="title">{title}</h5>
        <p className="description mb-3">{description}</p>

        <Link to={`/blog/:${id}`} className="button">
          READ MORE
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
