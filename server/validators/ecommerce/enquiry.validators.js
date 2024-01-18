import { body, param } from "express-validator";

// colorRequestBodyValidator is validator for
// - productCategory request body and
// - blogCategory request body

const enquiryRequestBodyValidator = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("name is required")
      // .isLowercase()
      .withMessage("name must be lowercase")
      .isLength({ min: 1 })
      .withMessage("name must be at lease 1 characters long"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("mobile")
      .trim()
      .notEmpty()
      .withMessage("mobile is required")
      .isLength({ min: 10 })
      .withMessage("mobile must be at lease 10 characters long"),
    body("comment")
      .trim()
      .notEmpty()
      .withMessage("comment is required")
      .isLength({ min: 1 })
      .withMessage("comment must be at lease 1 characters long"),
  ];
};

export { enquiryRequestBodyValidator };
