import { Router } from "express";
import {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} from "../../controller/ecommerce/brand.controllers.js";
import { brandRequestBodyValidator } from "../../validators/ecommerce/brand.validators.js";
import { validate } from "../../validators/validate.js";
import {
  verifyPermission,
  verifyJWT,
} from "../../middlewares/auth.middlewares.js";
import { UserRolesEnum } from "../../constants.js";
import { mongoIdPathVariableValidator } from "../../validators/common/mongodb.validators.js";

const router = Router();

router
  .route("/")
  .post(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    brandRequestBodyValidator(),
    validate,
    createBrand
  )
  .get(validate, getAllBrands);

router
  .route("/:brandId")
  .get(mongoIdPathVariableValidator("brandId"), validate, getBrandById)
  .delete(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    mongoIdPathVariableValidator("brandId"),
    validate,
    deleteBrand
  )
  .patch(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    brandRequestBodyValidator(),
    mongoIdPathVariableValidator("brandId"),
    validate,
    updateBrand
  );

export default router;
