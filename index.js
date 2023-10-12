// const express = require("express");
import express from "express";
const app = express();
// const dotenv = require("dotenv");
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
