import express from "express";
import { Router } from "express";
import {
  registerUser,
  loginUser,
} from "../../controller/auth/user.controllers.js";

const router = Router();

router.route("/").get((req, res) => {
  res.send("Welcome to the E-commerce App!");
});

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
export default router;
