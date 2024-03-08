import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
const app = express();

import userRouter from "./routes/auth/user.routes.js";
import productRouter from "./routes/ecommerce/product.routes.js";
import blogRouter from "./routes/ecommerce/blog.routes.js";
import productCategoryRouter from "./routes/ecommerce/productCategory.routes.js";
import blogCategoryRouter from "./routes/ecommerce/blogCategory.routes.js";
import brandRouter from "./routes/ecommerce/brand.routes.js";
import couponRouter from "./routes/ecommerce/coupon.routes.js";
import addressRouter from "./routes/ecommerce/address.routes.js";
import cartRouter from "./routes/ecommerce/cart.routes.js";
import orderRouter from "./routes/ecommerce/order.routes.js";
import colorRouter from "./routes/ecommerce/color.routes.js";
import enquiryRouter from "./routes/ecommerce/enquiry.routes.js";

import cors from "cors";
// api routes
import { notFound, errorHandler } from "./middlewares/error.middlewares.js";

// global middleware
app.use(
  cors({
    // origin: process.env.CORS_ORIGIN,
    origin: [process.env.CORS_ORIGIN1, process.env.CORS_ORIGIN2],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/product-categories", productCategoryRouter);
app.use("/api/v1/blog-categories", blogCategoryRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/coupons", couponRouter);
app.use("/api/v1/addresses", addressRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/colors", colorRouter);
app.use("/api/v1/enquiries", enquiryRouter);

// common error handling middleware
app.use(notFound);
app.use(errorHandler);

// export default app;
export { app };
