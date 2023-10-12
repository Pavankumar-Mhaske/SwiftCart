import express from "express";
import { Router } from "express";
const router = Router();

router.route("/").get((req, res) => {
  res.send("Welcome to the E-commerce App!");
});

router.route("/register").post((req, res) => {
  res.send("register");
});

export default router;
