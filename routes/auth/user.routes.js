import express from "express";
import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getAUser,
  deleteAUser,
  updateAUser,
  blockUnblockUser,
  forgotPasswordRequest,
  resetForgottenPassword,
  loginAdmin,
  getUserWishlist,
  getUserAddress,
  getUserCart,
} from "../../controller/auth/user.controllers.js";
import {
  verifyJWT,
  verifyPermission,
} from "../../middlewares/auth.middlewares.js";
// import { getUserCart } from "../../controller/ecommerce/cart.controllers.js";
import {
  userForgotPasswordValidator,
  userResetForgottenPasswordValidator,
  userRegisterValidator,
  userLoginValidator,
  userChangeCurrentPasswordValidator,
  userAssignRoleValidator,
} from "../../validators/auth/user.validators.js";

import { UserRolesEnum } from "../../constants.js";
import { validate } from "../../validators/validate.js";
import {
  mongoIdPathVariableValidator,
  mongoIdRequestBodyValidator,
} from "../../validators/common/mongodb.validators.js";

const router = Router();

router.route("/").get((req, res) => {
  res.send("Welcome to the E-commerce App!");
});

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, loginUser);
router.route("/admin-login").post(validate, loginAdmin);
router.route("/all-users").get(verifyJWT, getAllUsers);
router.route("/wishlist").get(verifyJWT, getUserWishlist);
router.route("/address").get(verifyJWT, getUserAddress);
router.route("/cart").get(verifyJWT, getUserCart);

// 🔑🔐 Secured routes 🔐 🔑
router.route("/logout").post(verifyJWT, logoutUser);

/**
   - userForgotPasswordValidator() is a function that returns an array of validation checks
   - When you pass validate without parentheses, you are indicating to Express that it should treat validate as a middleware function and execute it in the middleware chain. 
     Express will automatically call the validate function with the appropriate req, res, and next arguments when the route is processed.
   */
router
  .route("/forgot-password")
  .post(userForgotPasswordValidator(), validate, forgotPasswordRequest);

/** Route Precedence Order:
1. Specific routes - for 👉🏻👉🏻 '/users/wishlist'

  1️⃣app.get('/users/wishlist', (req, res) => {
        res.send('Welcome to the wishlist page!');
      });
      

2. Routes with parameters - for 👉🏻👉🏻 '/users/:userId'
   
  2️⃣app.get('/users/:userId', (req, res) => {
        res.send('Welcome to the user page!');
      });
      

 3. Catch-all routes - for 👉🏻👉🏻 '/*'
    
  3️⃣app.get('/*', (req, res) => {
        res.send('Welcome to all other unmatched routes!');
      });

    📑📑📑💡💡💡
    this is the reason the routes are not working properly, so i have to change the order of the routes
    1st - router.route("/wishlist/")  - specific routes
    2nd - router.route("/:userId") - routes with parameters
    3rd - router.route("/*") - catch-all routes
*/

/**
* Middleware Execution Order:
  - It's essential to ensure that the middleware responsible for setting req.user is executed before any middleware that relies on req.user. Middleware order matters.
  verifyJWT -> responsible for setting⭐🌟⭐ req.user ⭐🌟⭐
  verifyPermission -> relies on req.user
  Bug: If you put the verifyJWT middleware after the verifyPermission middleware, the verifyPermission middleware will fail because req.user will be undefined.
  verifyJWT -> verifyPermission -> getAUser
*/
router
  .route("/:userId")
  .get(
    mongoIdPathVariableValidator("userId"),
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    getAUser
  )
  .delete(
    mongoIdPathVariableValidator("userId"),
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    deleteAUser
  )
  .patch(mongoIdPathVariableValidator("userId"), verifyJWT, updateAUser);

router
  .route("/block-unblock/:userId")
  .patch(
    mongoIdPathVariableValidator("userId"),
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    blockUnblockUser
  );

router
  .route("/reset-password/:resetToken")
  .post(
    userResetForgottenPasswordValidator(),
    validate,
    resetForgottenPassword
  );

export default router;
