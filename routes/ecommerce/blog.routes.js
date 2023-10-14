import { Router } from "express";
import {
  createBlog,
  // getAllBlogs,
  // getBlogById,
  // updateBlog,
  // deleteBlog,
} from "../../controller/ecommerce/blog.controllers.js";
import {
  verifyPermission,
  verifyJWT,
} from "../../middlewares/auth.middlewares.js";
import { validate } from "../../validators/validate.js";
import { MAXIMUM_SUB_IMAGE_COUNT, UserRolesEnum } from "../../constants.js";
import { mongoIdPathVariableValidator } from "../../validators/common/mongodb.validators.js";
const router = Router();

router
  .route("/")
  .post(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    validate,
    createBlog
  );

export default router;
