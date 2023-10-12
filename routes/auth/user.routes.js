import express from "express";
import { Router } from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getAUser,
  deleteAUser,
  updateAUser,
} from "../../controller/auth/user.controllers.js";
import {
  verifyJWT,
  verifyPermission,
} from "../../middlewares/auth.middlewares.js";

const router = Router();

router.route("/").get((req, res) => {
  res.send("Welcome to the E-commerce App!");
});

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/all-users").get(verifyJWT, getAllUsers);
router
  .route("/:userId")
  .get(verifyJWT, getAUser)
  .delete(verifyJWT, deleteAUser)
  .patch(verifyJWT, updateAUser);
export default router;
