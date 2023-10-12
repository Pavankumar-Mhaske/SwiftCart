import express from "express";
const app = express();

import userRouter from "./routes/auth/user.routes.js";
import cors from "cors";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/users", userRouter);

// export default app;
export { app };
