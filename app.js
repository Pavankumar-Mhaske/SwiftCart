import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
const app = express();

import userRouter from "./routes/auth/user.routes.js";
import productRouter from "./routes/ecommerce/product.routes.js";
import cors from "cors";
// api routes
import { notFound, errorHandler } from "./middlewares/error.middlewares.js";

// global middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
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
// common error handling middleware
app.use(notFound);
app.use(errorHandler);

// export default app;
export { app };
