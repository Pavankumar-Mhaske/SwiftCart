import cookieParser from "cookie-parser";
import express from "express";
const app = express();

import userRouter from "./routes/auth/user.routes.js";
import cors from "cors";
// api routes
import { notFound, errorHandler } from "./middlewares/error.middlewares.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);

// common error handling middleware
app.use(notFound);
app.use(errorHandler);

// export default app;
export { app };
