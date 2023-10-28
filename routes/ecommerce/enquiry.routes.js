import { Router } from "express";
import {
  createEnquiry,
  getAllEnquirys,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} from "../../controller/ecommerce/enquiry.controllers.js";
import { enquiryRequestBodyValidator } from "../../validators/ecommerce/enquiry.validators.js";
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
    enquiryRequestBodyValidator(),
    validate,
    createEnquiry
  )
  .get(validate, getAllEnquirys);

router
  .route("/:enquiryId")
  .get(mongoIdPathVariableValidator("enquiryId"), validate, getEnquiryById)
  .delete(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    mongoIdPathVariableValidator("enquiryId"),
    validate,
    deleteEnquiry
  )
  .patch(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    enquiryRequestBodyValidator(),
    mongoIdPathVariableValidator("enquiryId"),
    validate,
    updateEnquiry
  );

export default router;
