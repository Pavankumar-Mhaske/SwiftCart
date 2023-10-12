// const express = require("express");
import express from "express";
const app = express();
// const dotenv = require("dotenv");
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 4001;
import connectDB from "./config/index.js";

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
