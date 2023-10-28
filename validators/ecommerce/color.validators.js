import { body, param } from "express-validator";

// colorRequestBodyValidator is validator for
// - productCategory request body and
// - blogCategory request body

const colorRequestBodyValidator = () => {
  return [body("name").trim().notEmpty().withMessage("Brand name is required")];
};

export { colorRequestBodyValidator };
