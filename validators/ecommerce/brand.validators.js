import { body, param } from "express-validator";

// categoryRequestBodyValidator is validator for
// - productCategory request body and
// - blogCategory request body

const brandRequestBodyValidator = () => {
  return [body("name").trim().notEmpty().withMessage("Brand name is required")];
};

export {  brandRequestBodyValidator };
