import { body, param } from "express-validator";

// categoryRequestBodyValidator is validator for
// - productCategory request body and
// - blogCategory request body
const categoryRequestBodyValidator = () => {
  return [
    body("name").trim().notEmpty().withMessage("Category name is required"),
  ];
};

export { categoryRequestBodyValidator };
