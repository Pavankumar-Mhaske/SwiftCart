import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config();
const PORT = process.env.PORT || 4001;
import connectDB from "./config/index.js";

/**
 * Starting from Node.js v14 top-level 'await' is available and it is only available in ES modules.
 * This means you can not use it with common js modules or Node version < 14.
 */

const majorNodeVersion = +process.env.NODE_VERSION?.split(".")[0] || 0;

const startServer = () => {
  app.listen(PORT || 8080, () => {
    console.info(
      `📑 Visit the documentation at: http://localhost:${
        PORT || 8080
      }/api/v1/users`
    );
    console.log("⚙️ Server is running on port: " + PORT);
  });
};

if (majorNodeVersion >= 14) {
  try {
    await connectDB();
    startServer();
    // console.log("Node version: ", majorNodeVersion);
  } catch (err) {
    console.log("Mongo DB connect error: ", err);
  }
} else {
  connectDB()
    .then(() => {
      startServer();
      // console.log("Node version: ", majorNodeVersion);
    })
    .catch((err) => {
      console.log("Mongo db connect error: ", err);
    });
}
// console.log("Node version: ", majorNodeVersion);
