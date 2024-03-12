import { body, param } from "express-validator";
import { AvailableUserRoles } from "../../constants.js";
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

const userRegisterValidator = () => {
  return [
    body("firstname")
      .trim()
      .notEmpty()
      .withMessage("firstname is required")
      // .isLowercase()
      // .withMessage("firstname must be lowercase")
      .isLength({ min: 3 })
      .withMessage("firstname must be at lease 3 characters long"),
    body("lastname")
      .trim()
      .notEmpty()
      .withMessage("lastname is required")
      // .isLowercase()
      // .withMessage("lastname must be lowercase")
      .isLength({ min: 3 })
      .withMessage("lastname must be at lease 3 characters long"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("mobile")
      .trim()
      .notEmpty()
      .withMessage("Mobile is required")
      .isMobilePhone()
      .withMessage("Mobile is invalid"),
    body("password").trim().notEmpty().withMessage("Password is required"),
    body("role")
      .optional()
      .isIn(AvailableUserRoles)
      .withMessage("Invalid user role"),
  ];
};

const userLoginValidator = () => {
  return [
    body("email").optional().isEmail().withMessage("Email is invalid"),
    body("username").optional(),
    body("mobile")
      .trim()
      .notEmpty()
      .withMessage("Mobile is required")
      .isMobilePhone()
      .withMessage("Mobile is invalid"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

const userChangeCurrentPasswordValidator = () => {
  return [
    body("oldPassword").notEmpty().withMessage("Old password is required"),
    body("newPassword").notEmpty().withMessage("New password is required"),
  ];
};

const userForgotPasswordValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
  ];
};

const userResetForgottenPasswordValidator = () => {
  return [body("newPassword").notEmpty().withMessage("Password is required")];
};

const userAssignRoleValidator = () => {
  return [
    body("role")
      .optional()
      .isIn(AvailableUserRoles)
      .withMessage("Invalid user role"),
  ];
};

export {
  userForgotPasswordValidator,
  userResetForgottenPasswordValidator,
  userRegisterValidator,
  userLoginValidator,
  userChangeCurrentPasswordValidator,
  userAssignRoleValidator,
};
